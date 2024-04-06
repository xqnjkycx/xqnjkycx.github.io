# watch的实现原理
:::tip
watch的本质就是对`effectRegister`的二次封装
:::

所谓 `watch` ， 其本质就是观测到了一个响应式数据，当数据发生变化时通知并执行相应的回调函数，例如:

```js
watch(obj , ()=>{
  console.log(" obj的数据 变化了 ")
})

// 修改响应数据的值，会导致回调函数的执行
obj.foo++
```
## watch实现
`watch`的实现本质利用了 `effectRegister` 以及调度器 `options.scheduler` 选项：

```js
effectRegister(() => {
  console.log(obj.foo)
},{
  scheduler(){
    // 当obj.foo的值发生变化时，会执行 scheduler 调度函数
  }
})
```

通过之前的内容可以知道，副作用函数与响应式数据之间会建立联系，当响应式数据变化时，就会触发副作用函数重新执行。但例外就是，如果副作用函数存在`scheduler`选项，当响应式数据发生变化时，会触发`scheduler`调度函数执行，而不是直接触发副作用函数执行，其实`scheduler`调度函数就相当于一个回调函数，而`watch`的实现就利用了这个特点，例如一个最简单的watch实现:
```js
function watch(source ,cb){
  effectResgiter(
    // 触发读取操作，建立响应式联系
    ()=>source.foo,
    {
    scheduler(){
      // 执行回调
      cb()
    }
  })
}
```
这里的`source.foo`编码非常硬，可以封装一个更好的`watch`：
```js
function watch(source, cb) {
  makeEffect(() => traverse(source), {
    scheduler() {
      cb();
    },
  });
  
  function traverse(value,seen=new Set()){
    // 暂时不考虑复杂数据类型
    if(typeof value !== 'object' || value === null || seen.has(value)) return
    seen.add(value)
    // 递归调用，处理每一项值
    for(const k in value){
      traverse(value[k],seen)
    }
    return value
  }
}

watch(obj,()=>{
  console.log('发生变化了')
})
```
当然watch函数除了可以观测响应式数据，还可以去接收一个`getter`函数：
```js
watch(
    // getter函数
    ()=>obj.foo,
    // 回调函数
    ()=>{
        console.log('obj.foo 的值变了')
    }
)
```
在一段代码中，传递给`watch`函数的第一个参数不再是一个响应式数据，而是一个`getter`函数。在`getter`函数内部，用户可以指定该watch依赖哪些响应数据，只有当这些数据变化时，才会触发回调函数执行，那么可以设计出下面的代码
```js
function watch(source,cb){
    // 定义getter
    let getter
    // 如果source是函数，说明用户传递的是getter，所以直接把 source 赋值给 getter
    if(typeof source === 'function'){
        getter = source
    }else{
        getter = () => traverse(source)
    }

    effect(
        // 执行getter
        ()=>getter(),
        {
            scheduler(){
                cb()
            }
        }
    )
}
```
现在的`watch`近乎完美，但还差一个非常重要的功能，那就是要在回调函数中，拿到正确的**新值**和**旧值**，这就要充分利用`effect`的`lazy`选项了，如下所示：
```js
function _watch(source, cb) {
  let oldValue
  let newValue
  const effectFn = makeEffect(() => traverse(source), {
    lazy:true,
    scheduler() {
      // trigger调用，那么拿到副作用函数返回的新值
      newValue = effectFn()
      // 将新值和旧值反传给回调函数
      cb(newValue,oldValue)
      // 立马更新上一次新值，避免下一次拿到依然是一个错误的旧值
      oldValue = newValue
    },
  });
  // 手动调用第一次，拿到的值就是旧值
  oldValue = effectFn()
  // ...
}
```
在这段代码中，最核心的改动是使用`lazy`选项创建了一个懒执行的`effect`。注意上面代码中最下面的部分，手动调用`effectFn`函数得到的返回值就是旧值即第一次执行得到的值。当变化发生并触发`scheduler`调度函数执行时，会重新调用`effectFn`函数并且得到新值，这样就可以拿到旧值和新值，接着将它们作为参数传递给回调函数cb就可以了。最后最重要的一件事就是，不要忘了使用新值更新旧值：`oldValue = new Value`，否则在下一次变更时会得到错误的旧值。