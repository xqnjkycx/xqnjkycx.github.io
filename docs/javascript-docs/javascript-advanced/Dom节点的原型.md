# Dom节点的原型
对于Dom的原型链，也是可以一步一步向上打印的：
```js
const ele = document.createElement('form');
console.log(ele.__proto__, Reflect.ownKeys(ele.__proto__));
console.log(ele.__proto__.__proto__, Reflect.ownKeys(ele.__proto__.__proto__));
console.log(ele.__proto__.__proto__.__proto__, Reflect.ownKeys(ele.__proto__.__proto__.__proto__));
console.log(ele.__proto__.__proto__.__proto__.__proto__, Reflect.ownKeys(ele.__proto__.__proto__.__proto__.__proto__));
console.log(ele.__proto__.__proto__.__proto__.__proto__.__proto__, Reflect.ownKeys(ele.__proto__.__proto__.__proto__.__proto__.__proto__));
```
以`<form>`为例，可以先的到的是`HTMLFormElement.prototype`，这上面的属性有以下的这些属性：
```js
"acceptCharset"
"action"
"autocomplete"
"enctype"
"encoding"
"method"
"name"
"noValidate"
"target"
"elements"
"length"
"checkValidity"
"reportValidity"
"requestSubmit"
"reset"
"submit"
"rel"
"relList"
"constructor"
Symbol(Symbol.toStringTag)
Symbol(Symbol.iterator)
```
以上的属性都是可以配置的，意味着可以“篡改”它们的作用。其中*action, enctype, method, target*是非常熟悉的属性。但是也有一些不常见的属性，比如`[Symbol(Symbol.iterator)]`，这个代表dom元素可遍历。

所以，`<form/>`是可以遍历的，以下为例：
```html
<form>
  <input type="text" name="foo" value="foo">
  <textarea name="bar" id="" cols="30" rows="10">bar</textarea>
  <input type="radio" name="baz">
  <input type="radio" name="baz" checked>
</form>

<script>
  const ele = document.getElementsByTagName('form')[0];
  for (const child of ele){console.log(child)};
</script>
```
因此，**在<form/>上遍历得到的其内部的表单元素**。

在HTMLFormElement之上，是`HTMLElement`，它的属性比较多：
```js
"constructor"
"title"
"lang"
"translate"
"dir"
"hidden"
"accessKey"
"accessKeyLabel"
"draggable"
"spellcheck"
"innerText"
"inert"
"outerText"
"autocorrect"
"webkitdropzone"
"style"
"attributeStyleMap"
"onbeforecopy"
"onbeforecut"
"onbeforeinput"
"onbeforepaste"
"contentEditable"
"enterKeyHint"
"isContentEditable"
"inputMode"
"onabort"
"onblur"
"oncancel"
"oncanplay"
"oncanplaythrough"
"onchange"
"onclick"
"onclose"
"oncontextmenu"
"oncopy"
// 此处省略...
"onpointerover"
"onpointerout"
"onpointerenter"
"onpointerleave"
"onselectstart"
"onselectionchange"
"offsetParent"
"offsetTop"
"offsetLeft"
"offsetWidth"
"offsetHeight"
"dataset"
"nonce"
"autofocus"
"tabIndex"
"click"
"attachInternals"
"focus"
"blur"
Symbol(Symbol.toStringTag)
```
由于所有HTML元素都派生自`HTMLElement`，因此它囊括了所有公共属性，比如 title，lang，dir，style，tabIndex，以及大量的事件函数，不过显然，对于特定的元素而言，只有非常有限的时间是有意义的。

HTMLElement 之上是`Element`。它是DOM规范的一部分，这里的DOM是非常广义的，包含XML，SVG等标签格式文档，所以HTMLElement派生自Element。它的属性是：
```js
"getAttributeNames"
"getAttribute"
"getAttributeNS"
"toggleAttribute"
"setAttribute"
"setAttributeNS"
"removeAttribute"
"removeAttributeNS"
"hasAttribute"
"hasAttributeNS"
"hasAttributes"
"closest"
"matches"
"webkitMatchesSelector"
"getElementsByTagName"
"getElementsByTagNameNS"
"getElementsByClassName"
"insertAdjacentElement"
"insertAdjacentText"
"mozMatchesSelector"
"setPointerCapture"
"releasePointerCapture"
"hasPointerCapture"
"setCapture"
"releaseCapture"
"getAttributeNode"
"setAttributeNode"
"removeAttributeNode"
"getAttributeNodeNS"
"setAttributeNodeNS"
"getClientRects"
"getBoundingClientRect"
"checkVisibility"
"scrollIntoView"
"scroll"
"scrollTo"
"scrollBy"
"insertAdjacentHTML"
"querySelector"
"querySelectorAll"
"attachShadow"
"requestFullscreen"
"mozRequestFullScreen"
"requestPointerLock"
"animate"
"getAnimations"
"before"
"after"
"replaceWith"
"remove"
"prepend"
"append"
"replaceChildren"
"namespaceURI"
"prefix"
"localName"
"tagName"
"id"
"className"
"classList"
"part"
"attributes"
"scrollTop"
"scrollLeft"
"scrollWidth"
"scrollHeight"
"clientTop"
"clientLeft"
"clientWidth"
"clientHeight"
"scrollTopMax"
"scrollLeftMax"
"innerHTML"
"outerHTML"
"shadowRoot"
"assignedSlot"
"slot"
"onfullscreenchange"
"onfullscreenerror"
"previousElementSibling"
"nextElementSibling"
"children"
"firstElementChild"
"lastElementChild"
"childElementCount"
"constructor"
Symbol("Symbol.unscopables")
Symbol("Symbol.toStringTag")
```
这里面有非常多的API，比如`getAttribute/setAttribute`，`getElementsByTagName`，`getElementsByClassName`，`getBoundingClientRect`，`innerHTML/outerHTML`，`querySelector/querySelectorAll`，`children`，`scrollTop`，`scrollLeft`，`className`等。

我个人认为其实HTMLElement和Element并没有解耦得非常彻底，理由如下：
- innerHTML，outerHTML，insertAdjacentHtml 定义在了 Element 而不是 HTMLElement 上。
- getElementsByTahName，getElementsByClassName 返回的是 HTMLElement 而不是 Element 的集合
- onfullscreenchange，onfullscreenerror 定义在了 Element 而不是 HTMLElement 上。

有些API，比如`firstElementChild`，`lastElementChild`，`previousElementSibling`，`previousElementSibling`返回的都是**Element**，这样导致在TypeScript上会存在一些麻烦：
```js
const next = element.nextElementSibling;
// next 是 Element，但 style 定义在 HTMLElement上，这里需要强转
(next as HTMLElement)?.style // ❌
```
`querySelectorAll`与`getElementByTagName`，`getElementsByClassName` 都是查询后代元素集合的API，但是本质上有区别：`querySelectorAll`获取的结果是静态的，而后者是动态的。

即`querySelectorAll`的结果在查询结束的时候就已经固定了，但是`getElementByTagName`和`getElementsByClassName`的结果并不固定，如果有匹配条件的DOM增减，也会反应到结果中。因此，最好最好不要去异步地遍历它们的结果，否则会出现undefined的异常。

`querySelectorAll`返回的其实是`Node`的集合，Node就是Element的上游：
```js
"getRootNode"
"hasChildNodes"
"insertBefore"
"appendChild"
"replaceChild"
"removeChild"
"normalize"
"cloneNode"
"isSameNode"
"isEqualNode"
"compareDocumentPosition"
"contains"
"lookupPrefix"
"lookupNamespaceURI"
"isDefaultNamespace"
"nodeType"
"nodeName"
"baseURI"
"isConnected"
"ownerDocument"
"parentNode"
"parentElement"
"childNodes"
"firstChild"
"lastChild"
"previousSibling"
"nextSibling"
"nodeValue"
"textContent"
"ELEMENT_NODE"
"ATTRIBUTE_NODE"
"TEXT_NODE"
"CDATA_SECTION_NODE"
"ENTITY_REFERENCE_NODE"
"ENTITY_NODE"
"PROCESSING_INSTRUCTION_NODE"
"COMMENT_NODE"
"DOCUMENT_NODE"
"DOCUMENT_TYPE_NODE"
"DOCUMENT_FRAGMENT_NODE"
"NOTATION_NODE"
"DOCUMENT_POSITION_DISCONNECTED"
"DOCUMENT_POSITION_PRECEDING"
"DOCUMENT_POSITION_FOLLOWING"
"DOCUMENT_POSITION_CONTAINS"
"DOCUMENT_POSITION_CONTAINED_BY"
"DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC"
"constructor"
Symbol("Symbol.toStringTag")
```
Node的概念更加抽象，除了包括Element之外，像注释Comment，属性Attribute，片段Fragment，文本Text都属于Node的一种，它和Element的一些API其实是容易发生混淆的：

| Node的属性 | Element或其它属性 | 对比 |
|-------|-------|-------|
| firstChild | firstElementChild | 前者返回Node，后者返回Element，二者可能相同也可能不同 |
| lastChild | lastElementChild | 同上 |
| previousSibling | previousElementSibling | 同上 |
| nextSibling | nextElementSibling | 同上 |
| parentNode | parentElement | 同上 |
| textContent| innerText | 前者将保留HTML中的空白和换行，后者会合并空白，遇到块元素才会换行 |
| childNodes | children | 前者是静态的`NodeList`，后者是动态的`HTMLCollection` |
| insertBefore | insert | 前者的主语是父节点，后者的主语是插入进去的元素 |
| appendChild | append | 后者支持一次性插入多个元素，并且支持字符串参数 |
| replaceChildren | replaceWith| 同上 |

Node再往上就是EventTarget了。
![image](./assets/dom%E5%85%83%E7%B4%A0%E7%9A%84%E5%8E%9F%E5%9E%8B%E9%93%BE.png)