# 利用好Teleport组件
Teleport组件是Vue3新增的一个内置组件

它可以将一个组件内部的一部分模板“传送”到该组件的 DOM 结构外层的位置去。

## 基本用法
为什么需要Teleport组件？有时会遇到这样的场景：一个组件模板的内部结构和逻辑在逻辑应该就属于当前组件，但从整个应用视图的角度来看，它在 DOM 中应该被渲染在整个 Vue 应用的其他地方。

举个例子，假如现在在一个组件中有一个功能为：**点击按钮出现一个全局的对话框**。

从设计角度来讲这个按钮和对话框应该放入的一个组件的内部，因为按钮控制了对话框的开关逻辑，但是站在全局Vue的角度来说，对话框其实应该脱离组件内部直接插入到body节点下，而不是随着当前组件渲染到很深的内部。但是这样会导致对话框的样式非常难写

这个HTML结构：
```html
<div class="outer">
  <h3>Tooltips with Vue 3 Teleport</h3>
  <div>
    <MyModal />
  </div>
</div>
```
再来看一下Modal的具体实现
```html
<template>
  <button @click="open = true">Open Modal</button>

  <div v-if="open" class="modal">
    <p>Hello from the modal!</p>
    <button @click="open = false">Close</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      open: false
    }
  }
}
</script>

<style scoped>
.modal {
  position: fixed;
  z-index: 999;
  top: 20%;
  left: 50%;
  width: 300px;
  margin-left: -150px;
}
</style>
```
在上面这个结构中可以发现，Modal组件被渲染到了Dom元素的很深层的位置，这样会存在一些问题:
- `position:fixed`能够相对于浏览器窗口放置有一个条件，那就是不能有任何祖先元素设置了`transform`,`perspective`或者`filter`样式属性。也就是说如果我们想要用`CSS transform`为组先节点`<div class="outer">`设置动画，就会不小心破坏模态框的布局！
- 这个模态框的`z-index`受限于它的容器元素。如果有其他元素与 `<div class="outer">` 重叠并有更高的 `z-index`，则它会覆盖住我们的模态框

`<Teleport>` 提供了一个更简单的方式来解决此类问题，让我们不需要再顾虑 DOM 结构的问题。让我们用 
`<Teleport>` 改写一下 `<MyModal>`：
:::html
<button @click="open = true">Open Modal</button>

<Teleport to="body">
  <div v-if="open" class="modal">
    <p>Hello from the modal!</p>
    <button @click="open = false">Close</button>
  </div>
</Teleport>
:::

`<Teleport>`接收一个 `to prop` 来指定传送的目标。to 的值可以是一个 `CSS` 选择器字符串，也可以是一个 DOM 元素对象。这段代码的作用就是告诉 `Vue` “把以下模板片段传送到 body 标签下”。

`<Teleport>` 只改变了渲染的 `DOM` 结构，它不会影响组件间的逻辑关系。也就是说，如果 `<Teleport>` 包含了一个组件，那么该组件始终和这个使用了 `<teleport>` 的组件保持逻辑上的父子关系。传入的 `props` 和触发的事件也会照常工作。

这也意味着来自父组件的注入也会按预期工作，子组件将在 Vue Devtools 中嵌套在父级组件下面，而不是放在实际内容移动到的地方。