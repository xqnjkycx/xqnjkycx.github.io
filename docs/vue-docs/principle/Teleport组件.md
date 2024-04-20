# Teleport组件
Teleport组件替用户实现了搬运组件结构至正确的DOM结构下的方案。

通常情况下，将虚拟DOM渲染成为真实DOM时，最终渲染出来的真实DOM的层级结构与虚拟DOM的层级结构几乎一致。以下面的模板为例：

```html
 <template>
   <div id="box" style="z-index: -1;">
     <Overlay />
   </div>
 </template>
```
对于这个`<Overlay>`组件的内容会被渲染到id为box的div标签下。假设`<Overlay>`是一个“蒙层”组件，这个组件会渲染一个“蒙层”。

一般的实现会将`<Overlay>`组件的z-index的层级提高，从而实现遮挡。但问题在于，如果`<Overlay>`组件的内容无法跨越DOM层级的渲染，那么就无法实现这个目标。因为id为box的div拥有一段内联样式`z-index:-1`。

在V2中的常用手段是通过原生DOM API去搬运DOM原生实现要求，当然这种做法会在Vue框架下一种“割裂感”，并且有可能存在渲染问题。

而V3正好实现了`<Teleport>`组件，该组件可以将指定的内容渲染到特殊的容器中去，而不受到DOM层级的限制。

```html
 <template>
   <Teleport to="body">
     <div class="overlay"></div>
   </Teleport>
 </template>
 <style scoped>
   .overlay {
     z-index: 9999;
   }
 </style>
```
## 实现Teleport组件
Teleport的组件定义如下：
```js
const Teleport = {
  __isTeleport: true,
  process(n1, n2, container, anchor) {
    // 在这里处理渲染逻辑
  }
}
```
Teleport组件并非普通组件，它也拥有特性的选项`__isTeleport`和`process`，分别用于标记自己是Teleport组件和自己的特殊渲染方案

对于这样的结构：
```html
 <Teleport to="body">
     <h1>Title</h1>
     <p>content</p>
  </Teleport>
```
通常一个组件的子节点会被编译为插槽内容，不过对于Teleport组件来说，直接将其子节点编译为一个数组就可以了，如下所示：
```js
 function render() {
     return {
         type: Teleport,
         // 以普通 children 的形式代表被 Teleport 的内容
         children: [
          { type: 'h1', children: 'Title' },
         { type: 'p', children: 'content' }
       ]
     }
 }
```
现在来设计Teleport组件的挂载动作：
```js
 const Teleport = {
   __isTeleport: true,
   process(n1, n2, container, anchor, internals) {
     // 通过 internals 参数取得渲染器的内部方法
     const { patch } = internals
     // 如果旧 VNode n1 不存在，则是全新的挂载，否则执行更新
     if (!n1) {
       // 挂载
       // 获取容器，即挂载点
      const target = typeof n2.props.to === 'string'
         ? document.querySelector(n2.props.to)
         : n2.props.to
       // 将 n2.children 渲染到指定挂载点即可
       n2.children.forEach(c => patch(null, c, target, anchor))
     } else {
       // 更新
     }
   }
 }
```
可以看到其原理非常简单，无非是将挂载的容器通过`props.to`来动态选择真正的挂载点，最后遍历Teleport组件的children属性，并逐一调用`patch`函数来完成子节点的挂载即可

对于更新上来说和普通的组件和节点并无区别，唯一的区别在于，更新操作有可能是由`Teleport`组件的`to`属性值的变化所引起的，因此在更新情况需要考虑props.to这种特殊情况，当新旧Teleport组件对比发现to属性也变化时，需要做挂载容器的更新：
```js
 const Teleport = {
   __isTeleport: true,
   process(n1, n2, container, anchor, internals) {
     const { patch, patchChildren, move } = internals
     if (!n1) {
       // 省略部分代码
     } else {
       // 更新
       patchChildren(n1, n2, container)
       // 如果新旧 to 参数的值不同，则需要对内容进行移动
       if (n2.props.to !== n1.props.to) {
         // 获取新的容器
         const newTarget = typeof n2.props.to === 'string'
           ? document.querySelector(n2.props.to)
           : n2.props.to
         // 移动到新的容器
         n2.children.forEach(c => move(c, newTarget))
       }
     }
   }
 }
```