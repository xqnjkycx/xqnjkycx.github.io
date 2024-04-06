# computed设计原理
在【响应式系统】设计中介绍了`effectRegister`函数，它可以用于注册副作用函数，同时它也允许指定一些参数options，例如指定scheduler调度器来控制副作用函数的执行时机和方式。

## 懒执行
在之前设计的响应式系统代码中，所实现的`effectRegister`会立即执行传递给它的副作用函数，例如：
```js
effectRegister(()=>console.log(obj.foo))
```
但是在一些特定的场景下，其实并不希望它能够立刻执行，而是希望它在需要的时候猜才进行执行，例如：
```js
const myEffect = effectRegister(()=>{
  console.log(obj.foo)
},{
  lazy:true
})
```
这时可以修改`effectRegister`函数的实现逻辑了，当`options.lazy`为`true`时，就跳过执行副作用函数：
```js
function effectRegister(fn,options={}){
  const effectFn = () => {
    cleanup(effectFn)
    activeEffect = effectFn
    effectStack.push(effectFn)
    // 接收真正的副作用函数的结果
    const res = fn()
    effectStack.pop()
    activeEffect = effectStack[effectStack.length - 1]
    // 将res作为 effectFn 的返回值
    return res
  }
  effectFn.options = options
  effectFn.deps = []
  // 执行后会触发一次读取操作
  // 只有非lazy的时候才执行
  if(!options.lazy){
    effectFn()
  }
  // 将副作用函数当作返回值返回出去
  return effectFn
}
```
而且通过以上的代码改造将包装好的函数 `effectFn` 返回给用户，用户手动调用 `effectFn`后返回的值其实是真正意义上的副作用函数返回的值：
```js
const effectFn = effect(()=>obj.foo + obj.bar,{
    lazy:true
})

const value =  effectFn()
```
## 实现计算属性
```js
/** 实现一个计算属性函数 **/
function computed(effect){
  const effectFn = effect(getter,{
    lazy:true
  })

  const obj = {
    get value(){
      return effectFn()
    }
  }

  return obj
}
```
可以看到`computed`函数的执行会返回一个对象，该对象的 value 属性是一个访问器属性，只有当读取 value 的值时，才会返回`effectFn`并将其结果作为返回值返回：
```js
const data = {foo:1,bar:2}
const obj = new Proxy(data,{/*.....*/})

const sumRes = computed(()=>obj.foo + obj.bar)

console.log(sumRes.value)
console.log(sumRes.value)
console.log(sumRes.value)
```

现在只是实现了 computed 的懒计算，在vue中 computed 实际上肯定是还可以做缓存的，这里访问了多次sumRes.value ，实际上数据源并没有发生变化，不应该多次进行计算，这个实现很简单，只需要在computed 函数中再做一些处理即可

```js
/** 实现一个计算属性函数 **/
function computed(effect){
  // value 用来缓存上一次计算的值
  let value
  // dirty标志，用来标识是否需要重新计算值，为true则意味着值“脏”了，需要重新计算
  const effectFn = effect(getter,{
    lazy:true,
    // 由于obj.foo改变会触发scheduler设置dirty为true，从而实现缓存
    scheduler(){
      dirty = true
    }
  })

  const obj = {
    get value(){
      if(dirty){
        value = effectFn()
        dirty = false
      }
      return value
    }
  }

  return obj
}
```