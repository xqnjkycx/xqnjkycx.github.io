# Strict
JavaScript本身是一款比较宽松的语言，它允许编写的代码存在一些不规范的东西。这些不规范的东西可能造成一些问题，为了解决这些问题，`ES5`引入了strict模式。

strict 是一种执行模式，通过限制一些不规范的行为来提供更加严格的错误检查。在这种模式下一些不规范的语法和行为会被直接抛出异常，从而迫使代码更加的规范和可靠。

strict 模式可以直接添加到整个文件中，也可以只限定用于某些特定的函数。

```js
"use strict" // 开启strict模式
```
## strict模式的影响
其影响的功能非常多，这里有几个典型案例：
### 禁止对未声明的变量赋值
在严格模式下，所有的变量都必须先声明之后使用。如果使用没有声明的变量，将会抛出一个`ReferenceError`，这有助于避免拼写错误或者意外的全局变量污染而导致的错误。
```js
nonDeclaredVar = 1
```
如果这要是在非严格模式下，那么整个变量会被赋值到全局对象上，即：
```js
globalThis.nonDeclaredVar === 1 // true
```
这是一种不该发生的副作用

### 禁止对不可写的属性赋值
不可写属性指的是一个对象的`writable=false`，或者为存取器类型，其中`set=undefined`
```js
const p = Object.create(null,{
    name:{
        writable:false
    },
    age:{
        get(){}
    }
})

p.name = 'Jake'
p.age = 16

```
在非严格模式下，整个操作是静默失败的，而且在控制台种不会有任何报错信息
如果在严格模式下，这种操作直接发生报错：
```text
Uncaught TypeError: Cannot assign to read only property 'name' of object '[object Object]'
at
```
### 禁止删除变量，函数和函数参数
在严格模式下，使用delete操作符去删除变量，函数和函数参数会抛出一个`SyntaxError`。这样可以避免意外地删除重要的代码片段。
```js
var foo

function bar(){}

function baz(){
  delete arguments
}

delete foo
delete bar
baz()
```
### 禁止重复的函数参数名
在严格模式下，函数的参数名必须是唯一的，如果出现重复参数名，将会抛出`SyntaxError`。有助于避免参数名重复而导致的混淆错误。
```js
function Person(name,name,age){}
```
在非严格模式下，第二个name会覆盖第一个

### 禁止使用八进制字面量
也是抛出`SynataxError`。因为八进制字面量在JS种容易混淆，不利于代码的阅读。
八进制有两种表示方法，旧的方式就是前面加一个0.但是前面有0的不一定就是八进制，也可能是10进制
```js
console.log( 071 , 078)
```
所以现在新的八进制就是以`0o`为前缀，与二进制的`ob`和十六进制的`0x`形式上的统一。

### 禁止使用 this 关键字指向全局对象
如果在函数内部使用this关键字，并且没有通过对象或者构造函数调用整个函数,this就会指向全局对象，在浏览器中是window，在node中就是global
```js
function foo(){
  console.log(`this in foo`,this) //window
}
foo()
```
使用严格模式之后，this关键字变为undefined。有助于避免在函数内部意外地访问和修改全局变量。

### 禁止在当前上下文创建新变量
在非严格模式下，可以通过`eval("var newVariable")`的方式在当前上下文中创建变量，并且被后续代码使用
```js
eval("var foo = 1")
console.log(foo)
```
严格模式直接把这个`eval`禁用了

:::tip 强烈建议
在一般情况下，都应该开启严格模式
:::

## 不同场合下的strict
不一定需要声明`use strict`，才能开启strict模式。可以看到这些情况：

- **ESM下一定是strict模式** ：包括内链和外链，只要是Module环境，就被强制开启了 strict 模式。这种文件中写出上述违反 strict 的代码是不太可能的。
- **class 代码一定是strict模式**：class 是特殊的函数，显然它还相当于在函数体内强制声明了"use strict"语句。