# v-if 与 v-for 拒绝同时使用
## 基本作用
`v-if` 指令用于条件性地渲染一块内容。这块内容只会在指令的表达式返回 `true` 值的时候被渲染

`v-for`指令基于一个数组来渲染一个列表。在 `v-for` 的时候，建议设置 `key` 值，并且保证每个 `key` 值是独一无二的，这便于`diff`算法进行优化

```html
<Modal v-if="isShow" />

<li v-for="item in items" :key="item.id">
    {{ item.label }}
</li>
```

## 优先级
`v-if`与`v-for`都是`vue`模板系统中的指令

在`vue`模板编译的时候，会将指令系统转化成可执行的`render`函数

### 例子
编写一个`p`标签，同时使用`v-if`和`v-for`
```html
<div id="app">
    <p v-if="isShow" v-for="item in items">
        {{ item.title }}
    </p>
</div>
```
模板指令的代码都会生成在`render`函数中
```js
ƒ anonymous() {
  with (this) { return 
    // _c 创建节点
    _c('div', { attrs: { "id": "app" } }, 
    // _l 是 vue 的列表函数 函数内部都会进行一次if判断 
    _l((items), function (item) 
    { return (isShow) ? _c('p', [_v("\n" + _s(item.title) + "\n")]) : _e() }), 0) }
}
```
初步得到结论：`v-for`的优先级 比 `v-if` 高

现在改变一下`v-if`和`v-for`的层级结构，让它们位于不同的标签
```html
<div id="app">
    <template v-if="isShow">
        <p v-for="item in items">{{item.title}}</p>
    </template>
</div>
```
再来看一下`render`函数
```js
ƒ anonymous() {
  with(this){return 
    _c('div',{attrs:{"id":"app"}},
    [(isShow)?[_v("\n"), // 先判断v-show 再_l方法渲染列表
    _l((items),function(item){return _c('p',[_v(_s(item.title))])})]:_e()],2)}
}
```
这时候我们可以看到，`v-for`与`v-if`作用在不同标签时候，是先进行判断，再进行列表的渲染

再查看一下Vue源码
```js
export function genElement (el: ASTElement, state: CodegenState): string {
  if (el.parent) {
    el.pre = el.pre || el.parent.pre
  }
  if (el.staticRoot && !el.staticProcessed) {
    return genStatic(el, state)
  } else if (el.once && !el.onceProcessed) {
    return genOnce(el, state)
  } else if (el.for && !el.forProcessed) { // 先判断for
    return genFor(el, state)
  } else if (el.if && !el.ifProcessed) { // 再判断if
    return genIf(el, state)
  } else if (el.tag === 'template' && !el.slotTarget && !state.pre) {
    return genChildren(el, state) || 'void 0'
  } else if (el.tag === 'slot') {
    return genSlot(el, state)
  } else {
    // component or element
    ...
}
```
最终结论 `v-for` 比 `v-if` 的 优先级高

## 拒绝同时使用
- 永远不要把 `v-if` 和 `v-for` 同时用在同一个元素上，带来性能方面的浪费（每次渲染都会先循环再进行条件判断）
- 如果避免出现这种情况，则在外层嵌套`template`（页面渲染不生成`dom`节点），在这一层进行`v-if`判断，然后在内部进行`v-for`循环

```html
<template v-if="isShow">
  <p v-for="item in items">
</template>
```

- 如果条件出现在循环内部，可通过计算属性 `computed` 提前过滤那些不需要显示的项

```js
const items = computed(() => {
  return list.filter((item) => {
    return item.isShow;
  });
});
```

## Vue3的改变
vue3对于这个情况作出了一个改变：当 `v-if` 和 `v-for` 一起使用时,`v-if` 具有比 `v-for` 更高的优先级

当然官方不会推荐这个做法，从实例分析

```html
<template>
  <div class="hello">
    <div  v-for="(item,index) in list" v-if="index === 9" :key="item" ></div>
  </div>
</template>

<script setup>
  const list = ref([1,2,3,4,5,6,7,8])
</script>
```
由于 `v-if` 优先级更高，导致整个列表都渲染不出来，同时控制台会报错

```text
[Vue warn]: 
Property "index" was accessed during render but is not defined on instance.
```

总之记住一句话：**强烈不推荐v-if与v-show一起使用！会造成性能消耗！**