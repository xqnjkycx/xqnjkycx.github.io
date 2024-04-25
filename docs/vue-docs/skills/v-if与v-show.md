# v-if与v-show

## 共同点
vue 中 v-show 与 v-if 的作用效果是相同的，都能控制元素页面是否显示

在用法上也是相同的

```html
<Model v-show="isShow" />
<Model v-if="isShow" />
```
- 当表达式为true时，都会占据页面的位置
- 当表达式为false时，都不会占据页面的位置

## 区别点
- 控制手段不同
- 编译过程不同
- 编译条件不同
- 性能消耗不同

**控制手段**：v-show 隐藏则是为该元素添加css--display:none，dom元素依旧还在。v-if显示隐藏是将dom元素通过dom操作整个添加或删除。

**编译过程**：v-if 切换有一个局部编译/卸载的过程，切换过程中合适地销毁和重建内部的事件监听和子组件；v-show只是简单的基于css切换。

**编译条件**：v-if 是真正的条件渲染，它会确保在切换过程中条件块内的事件监听器和子组件适当地被销毁和重建。只有渲染条件为假时，并不做操作，直到为真才渲染。v-if会触发组件的周期函数，而v-show则不会

**性能消耗**：v-if具有较高的切换性能消耗，v-show具有较高的初始渲染消耗(因为不得不渲染多个条件下的元素)

## 原理分析
- v-show 不管初始条件如何，元素总是会被渲染
```js
export const vShow: ObjectDirective<VShowElement> = {
  beforeMount(el, { value }, { transition }) {
    el._vod = el.style.display === 'none' ? '' : el.style.display
    if (transition && value) {
      transition.beforeEnter(el)
    } else {
      setDisplay(el, value)
    }
  },
  mounted(el, { value }, { transition }) {
    if (transition && value) {
      transition.enter(el)
    }
  },
  updated(el, { value, oldValue }, { transition }) {
    // ...
  },
  beforeUnmount(el, { value }) {
    setDisplay(el, value)
  }
}
```
- v-if做了真正的条件渲染
```js
export const transformIf = createStructuralDirectiveTransform(
  /^(if|else|else-if)$/,
  (node, dir, context) => {
    return processIf(node, dir, context, (ifNode, branch, isRoot) => {
      // ...
      return () => {
        if (isRoot) {
          // 返回一个node节点，render函数通过表达式的值来决定是否生成DOM
          ifNode.codegenNode = createCodegenNodeForBranch(
            branch,
            key,
            context
          ) as IfConditionalExpression
        } else {
          const parentCondition = getParentCondition(ifNode.codegenNode!)
          // 返回一个node节点，render函数通过表达式的值来决定是否生成DOM
          parentCondition.alternate = createCodegenNodeForBranch(
            branch,
            key + ifNode.branches.length - 1,
            context
          )
        }
      }
    })
  }
)
```