# Reflect
反射是一种在运行时检查，访问和修改类，属性，方法和接口的能力。类似于用“上帝视角”来操控万物。

ECMAScript 从 ES5 开始引入属性描述符后，事实上某些部分API已经有一点反射的“味道”了。比如`Object.getPrototypeOf` / `getOwnPropertyDescriptor` / `getOwnPropertyNames` / `defineProperty`。但还不成体系。

在ES6之后就完全引入了对标其它语言的独立反射模块，被称之为`Reflect API`。Reflect 的好多方法都在 Object 上有同名的实现，功能基本相同，但是在结果上有一些差异。

## Reflect 的功能
Reflect 类似于 Math 和 JSON，是全局上下文中的一个对象。它的`[Symbol.toStringTag]`是“Reflect”，即：
```js
`${Reflect}` === "[object Reflect]"
```
它包括了一系列的对象访问方法，虽然之前有替代的写法，但是Reflect让这些操作全部都聚合到一个命名空间之下。

对于 Reflect 的功能可以简单规划为以下几类：

### 函数调用
`Reflect.apply`方法用于主动去调用一个函数，本质上也和`Function.prototype.apply`没有什么不同：
```js
// 这两行代码是等价的
Reflect.apply(fnObj, context, args)
fnObj.apply(context, args)
```
但是后者可能是自定义函数上的自定义apply方法调用，比如：
```js
var fakeFn = {
    call() {},
    apply() {},
};

fakefn.apply(...)
```
Reflect.apply更加安全。保证了`apply`方法不会是对象上的一个自定义方法。

### 对象创建
`Reflect.construct`方法可以使用一个构造函数来创建对象，它的非范型版本的定义是:
```js
function construct(target: Function, argumentsList: ArrayLike<any>, newTarget?: Function): any;
```
:::tip
在写 **Reflect.construct( Foo, [1,2,3] )** 的时候，就相当于在写 **new Foo(1,2,3)**。
:::
关于第三个参数`newTarget`，它和父类的构造函数的继承关键字`super`相关。

先看一个简单的类继承：
```js
class Bar {
    constructor(name) {
        this.name = name;
    }
}

class Foo extends Bar {
    constructor(name, age) {
        super(name);
        this.age = age;
    }
}
```
上面的代码的执行原理，可以用函数的方式大致理解如下：
```js
// Foo extends Bar
Foo.prototype = Object.create(Bar.prototype, {
    constructor: {
        value: Foo,
        // ...
    },
    // ...
});

// new Foo()
function newFoo(name, age) {
    // 注意下面两行代码！！！
    const foo = Object.create(Foo.prototype);
    Bar.apply(foo, [name]);
    // 注意上面两行代码！！！

    foo.age = age;

    reutrn foo;
}
```
功能是以Foo为原型创建对象，并以此为上下文执行Bar。可以抽象为这么一个函数：
```js
function Construct(F, args, newTarget) {
    const obj = Object.create(newTarget.prototype);
    F.apply(obj, [name]);
    return obj;
}
```
`Reflect.construct`几乎就等价于`Construct`。在没有第三个参数`newTarget`的情况下，就和`new`操作符的功能就完全一致了。其实日常使用最多的也只是前两个参数。

### 属性读写
属性的读写分为**描述符的读写**与**值的读写**，与包括**删除属性**。

`Reflect.defineProperty`和`Object.defineProperty`的签名完全一致。功能也相同，都是调用的对象内部的`[[DefineOwnProperty]]`方法，只不过在异常情况的反馈上所有差异。前者返回执行的布尔结果，如果失败的话返回false，后者而是抛出异常。

可以这么理解`Object.defineProperty`：
```js
Object.defineProperty = function(...args) {
    if (!Reflect.defineProperty(...args)) {
        throw TypeError();
    }

    return args[0]
}
```
:::tip
Reflect 没有提供 `defineProperties` 方法，因为布尔值没有反应所有的属性的操作结果，很有可能有的属性操作成功，有的属性是失败。
:::

`Reflect.getOwnPropertyDescriptor` 和 `Object.getOwnPropertyDescriptor`也是近似的。区别在于如果第一个参数不是对象的情况下，前者会抛出TypeError，而后者会转换为对象。
```js
Object.getOwnPropertyDescriptor('abc', 'length'); 
// ✅ { value: 3, writable: false, enumerable: false, configurable: false }
Reflect.getOwnPropertyDescriptor('abc', 'length'); 
// ❌ TypeError
```
可以感受到Reflect是非常严格安全的

Reflect 认为原型也是广义上的属性。Reflect 也提供了 `getPrototypeOf` 和 `setPrototypeOf` 方法。
`Reflect.getPrototypeOf` 和 `Object.getPrototypeOf` 的区别，与 `getOwnPropertyDescriptor` 是一致的，也是遇到非对象时，前者报错，后者用 ToObject 主动转换为对象。

`Reflect.setPrototypeOf` 和 `Object.setPrototypeOf` 的区别除了上面这种之外，还有就是前者返回布尔值，而后者返回第一个参数本身，在失败的时候，也会抛出 

:::tip
总结一下，Reflect喜欢使用返回布尔值来替代抛出异常，同时对对象类型上有严格的把关
:::

Reflect还提供了两个非常独特的方法：`Reflect.get`和`Reflect.set`

`Reflect.get(O,p)`等价于`O[p]`，并且也会顺着原型链进行属性查找。但是`Reflect.get`还支持第三个参数，它的TypeScript签名如下：
```js
function get<T extends object, P extends PropertyKey>(
  target: T,
  propertyKey: P,
  receiver?: unknown,
): P extends keyof T ? T[P] : any;
```
这个可选的**reciver**决定了描述符中的get函数上下文的指向，可以看这个代码示例:
```js
const O = Object.create(null, {
    name: {
        get: function() {
            return this.name; // this 即 receiver，默认为 O
        }
    }
});

Reflect.get(O, 'name', { name: 'Mike' }); // "Mike"
```
只不过默认情况下，reciver指向函数本身，即O。

同理，`Reflect.set(target,propertyKey,V,[,receiver])`最后一个参数也是如此之用。

对于删除属性，也可以选择更安全的`Reflect.deleteProperty`。因为它也不会报错，而是返回布尔值。
```js
"use strict";
var a = 1;

delete a // ❌ SyntaxError

Reflect.deleteProperty(globalThis, 'a'); // false
```

### 对象访问
判断一个属性有没有存在于一个对象上，一个重要的条件在于**是否需要考虑原型链**。

如果不需要考虑，那么应该使用`Object.prototype.hasOwnProperty`或者`Object.hasOwn`。注意，如果这两种方法的主角不是对象，那么会用`ToObject`转换为对象。

如果考虑原型链，那么应该使用`in`操作符，不过现在可以选择`Reflect.has`
```js
Reflect.has(obj, 'name')
```
如果要遍历对象的key，可以使用`Object.getOwnPropertyNames` / `Object.getOwnPropertySymbols` / `Object.getOwnPropertyDescriptors`，但都存在各种各样的限制。其实最能反应内部的[[OwnPropertyKeys]]数据的，只能是Reflect.ownKeys

Reflect.ownKeys不会像 Object 的那些方法一样会自动转换参数为对象类型，它会抛出 TypeError:
```js
Reflect.ownKeys("abc") // ❌ TypeError: Reflect.ownKeys called on non-object
```
最后就是`Reflect.preventExtensions`与`Reflect.isExtensible`了，它们在Object上的同名方法之间的差异依旧是对待非对象类型上面，Reflect变得更加严格而已。

并且，Reflect没有提供 seal/isSealed 和 freeze/isFrozen 方法。它们更偏向于对属性的操作，只存在于Object对象上。

## Reflect 元编程
元编程（Meta Programming），指的是在运行时操作和分析代码自身的行为。反射是元编程的关键组成部分，但并不是全部。广义来说，类似`typeof`，`instanceof`，`Object.keys`，`Object.getOwnPropertyNames`，都是元编程的概念一部分。

元编程并不是在底层才能涉及到，实际上在业务中也能遇到，比如对象克隆。

:::tip
对象的克隆在很多场景下都有重要的应用，比如作为状态来驱动 DOM 视图，比如 immutable.js 核心原则就是数据变更不会触发数据复制出来的新的副本。
:::

### 对象复制
如果用JSON去实现一个深克隆对象：
```js
var cloned = JSON.parse(JSON.stringify(origin));
```
首先这种克隆的对象属性的类型会受到JSON的格式限制，而且也会丢失掉对象及其属性的特征，也就是产生**失真**。

从这一点来看，克隆不是不能实现而是需要舍弃相当的信息量，也就是需要明确定义克隆的具体规则：
- **cloneNonEnum**：是否克隆不可枚举的属性
- **cloneSymol**：是否克隆 Symbol 属性
- **keepPropDesc**：是否保留属性描述符类型
- **keepPrototype**：是否保留原型链
- **keepExtensible**：是否保留可扩展信息

假设入参就是一个对象（非 Primitive），那么第一件事就是遍历其属性，然后根据选项来选择遍历方法：
```js
function clone(origin, options = {}) {
    const { cloneNonEnum, cloneSymbol } = options;
    let keys;
    if (cloneNonEnum && cloneSymbol) {
        keys = Reflect.ownKeys(origin);
    } else if (cloneNonEnum && !cloneSymbol) {
        keys = Object.getOwnPropertyNames(origin);
    } else if (!cloneNonEnum && !cloneSymbol) {
        keys = Object.keys(origin);
    } else /* !cloneNonEnum && cloneSymbol */ {
        keys = Reflect.ownKeys(origin).filter(key => Object.propertyIsEnumerable(origin, key));
    }
}
```
根据是否可以枚举，以及是否需要Symbol属性，那么可以枚举出4种采集属性Key的方法。严格来说，可以把`Object.getOwnPropertyNames`和`Object.keys`都当作Reflect.ownKeys的子集，那么上面的代码就变为：
```js
function clone(origin, options = {}) {
    const { cloneNonEnum, cloneSymbol } = options;
    let keys;
    if (cloneNonEnum && cloneSymbol) {
        keys = Reflect.ownKeys(origin);
    } else if (cloneNonEnum && !cloneSymbol) {
        keys = Reflect.ownKeys(origin).filter(key => 'string' === typeof key);
    } else if (!cloneNonEnum && !cloneSymbol) {
        keys = Reflect.ownKeys(origin).filter(key => 'string' === typeof key && Object.propertyIsEnumerable(origin, key));
    } else /* !cloneNonEnum && cloneSymbol */ {
        keys = Reflect.ownKeys(origin).filter(key => Object.propertyIsEnumerable(origin, key));
    }
}
```
接下来，可以拷贝属性，根据是否保留属性描述符，可以有下面两种操作：
```js
const cloned = {};

if (options.keepPropDesc) {
    for (const key of keys) {
        const desc = Reflect.getOwnPropertyDescriptor(origin, key);
        Reflect.defineProperty(cloned, key, desc);
    }
} else {
    for (const key of keys) {
        Reflect.set(cloned, key, Reflect.get(origin, key));
    }
}
```
然后可以查看原型链和可扩展性：
```js
if (options.keepPrototype) {
    Reflect.setPrototypeOf(cloned, Reflect.getPrototypeOf(origin));
}

if (options.keepExtensible && !Reflect.isExtensible(origin)) {
    Reflect.preventExtensions(cloned);
}
```
这就实现了一个完全用`Reflect`就实现了一个比较完备，功能可调的克隆函数，虽然它还是只能实现浅克隆。