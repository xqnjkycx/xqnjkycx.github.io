# Symbol
**Symbol**是一个行为比较奇怪的基础类型，它满足 `X != X` 这样的等式，还有一个满足的就是NaN。

**Symbol 用于生成唯一的值，确保每次调用结果都不会复用**，这个特性存在诸多的业务场景，比如通过 `Math.random` 或者 `md5` 来生成唯一的key，但是这些字符串在理论上都有存在冲突的可能性...

## Symbol创建
Symbol类型可以由 `Symbol()` 函数或者 `Symbol.for()` 函数构造出来。

`Symbol()` 每次构造出一个新的变量，就可以传入一个 key 参数，方便在显式转换为字符串时更加方便确认

```js
Symbol("foo").toString() // "Symbol(foo)"
```
由于每次调用返回的都是新值，因此一旦丢掉了它的引用，就难以找回来了
```js
const person = {}
person[Symbol("name")] = "Mike" //这下难找了
```
像 `for...in` ， `Object.keys()` ， `Object.entries()` ， `Object.getOwnPropertyNames()` 也遍历不到，只有 `Object.getOwnPropertySymbols()` 可以
```js
Object.getOwnPropertySymbols(person) // [Symbol(name)]
```
当然也可以使用 `Symbol.for(key)` 的方法来找回已经创建过的值，**因为Symbol会在全局有一个注册表，Symbol.for(key)会先去注册表中查找有无已经创建过的相同的Key的Symbol，如果有，则返回，没有就进行创建。**

```js
Symbol.for("foo") === Symbol.for("foo") // true
```
对于 `Symbol.for(key)` 创建的值，可以通过 `Symbol.keyFor(symbol)` 来获取Key，但是`Symbol(key)` 创建的却不可以

```js

Symbol.keyFor(Symbol.for("foo")) //"foo"
Symbol.keyFor(Symbol("bar")) // undefined
```
**Symbol 的另一特殊之处在于它不允许隐式转换为 String 或 Number**
```js
+Symbol() //error
''+Symbol() //error
```
如果硬要转换为字符串，有两种方法：
```js
String(Symbol("foo")) // "Symbol(foo)"
Symbol("bar").toString() // "Symbol(bar)"
```
注意，Symbol 转换成 Number 是没有办法的，因此确保 Symbol 值不会进入数学计算中。

## 常见Symbol值
Symbol 作为一个函数，同样也是一个对象，上面携带了好多静态常量，包括：

- Symbol.hasInstance
- Symbol.isConcatSpreadable
- Symbol.iterator
- Symbol.asyncIterator
- Symbol.match
- Symbol.matchAll
- Symbol.replace
- Symbol.search
- Symbol.species
- Symbol.split
- Symbol.toPrimitive
- Symbol.toStringTag
- Symbol.unscopables

下面介绍一些简单的内容

### Symbol.hasInstance
这个Symbol用于判断一个变量是否上一个构造函数的实例，目前用于`instanceof`操作符的逻辑中。

事实上，在任意一个函数的原型链上，都有默认的`Symbol.hasInstance`属性。

```js
function Animal()

Object.getOwnPropertySymbols(Object.getPrototypeOf(Animal)) //[Symbol(Symbol.hasInstance)]
```
如果想修改其行为，不可以直接在Animal上赋值，因为会写到原型链上，而原型链上的这个Symbol.hasInstance属性是只读的。可以在Animal对象本身上定义：
```js
Object.defineProperty(Animal, Symbol.hasInstance, {
    value(instance) {
        return true;
    },
});

// 修改 instanceof 行为
console.log("ABC" instanceof Animal); // true
```
更简单的可以使用 `Class` 语法：
```js
class Animal{
    static [Symbol.hasInstance](instance){
        return true
    }
}
```
无论如何，**Symbol.hasInstance 应定义在构造函数上，而不是实例对象上**

### Symbol.isConcatSpreadable
这个 Symbol 用于 Array 的 `concat` 函数中。它的行为比较特殊，过去我们在合并两个数组的时候：
```js
[1,2].concat([3,4]) // [1,2,3,4]
```
`Symbol.isConcatSpreadable` 的引入让上面的代码有了新的可能，比如不去展开参数
```js
const arr = [3,4];
arr[Symbol.isConcatSpreadable] = false;
[1,2].concat(arr) // [1,2,[3,4]]
```
`concat` 可以传入**类数组**：
```js
const obj  = {
    0: "A",
    1: "B",
    length: 2,
    [Symbol.isConcatSpreadable]: false
}

console.log([].concat(obj)); // [["A","B"]]
```
区别是：**concat 传入数组的时候，默认展开；但是传入类数组的时候，默认不展开**。因此，`Symbol.isConcatSpreadable` 更多的时候是针对传入非数组的时候的行为定义。

## Symbol的价值
Symbol常量发挥的作用，个人的理解是有点类似于面向对象语言中的interface的味道。

**即任何对象（类）只要实现了对应的 Symbol 属性，就可以被功能模块所消费，而不管这个对象（类）到底是什么以及如何创建的**。

假设要实现一个HTTP服务器，接收到一个请求（request）后，指派给任何处理器（handler）。处理器的逻辑通常有开发者来扩展实现。按照这个思路，可以定义一个Handler类，开发者继承它的实现派生类，实例化之后再传递给HTTPServer:

```js
abstract class Handler {
    abstract handle(req: Request): void;
}

class HTTPServer {
    handleRequest(handler: Handler) {
        handler.handle(new Request());
    }
}
```
现在多了一种方式，使用Symbol来实现抽象类：
```js
const handlerSymbol = Symbol("HttpHandler");

class HTTPServer {
    handleRequest(handler: { [handlerSymbol](req: Request): void; }) {
        handler[handlerSymbol](new Request());
    }
}
```
这样在实现 handler 方面会更灵活，虽然依然需要引用 HTTPServer 提供的 Symbol 值，但是消除了类的继承，可以以任意方式创建对象，也不必受到单继承的限制。

这个设计利用的就是Symbol**唯一值**的特性，也就是说，你的自定义对象的属性再怎么样，也不会和这个预设值冲突。