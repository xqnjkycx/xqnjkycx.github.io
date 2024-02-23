# mixins混入
除了传统的面向对象的继承方式之外，还流行一种可以通过重用组件的方式来创建类，也就是联合另一个简单类的代码。

这里通过一段代码来完全理解TS中的混入：
```ts
// Disposable Mixin
class Disposable {
    isDisposed: boolean;
    dispose() {
        this.isDisposed = true;
    }

}

// Activatable Mixin
class Activatable {
    isActive: boolean;
    activate() {
        this.isActive = true;
    }
    deactivate() {
        this.isActive = false;
    }
}

class SmartObject {
    constructor() {
        setInterval(() => console.log(this.isActive + " : " + this.isDisposed), 500);
    }

    interact() {
        this.activate();
    }
}

interface SmartObject extends Disposable, Activatable {}
applyMixins(SmartObject, [Disposable, Activatable]);

let smartObj = new SmartObject();
setTimeout(() => smartObj.interact(), 1000);

////////////////////////////////////////
// In your runtime library somewhere
////////////////////////////////////////

function applyMixins(derivedCtor: any, baseCtors: any[]) {
    baseCtors.forEach(baseCtor => {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
            Object.defineProperty(derivedCtor.prototype, name, Object.getOwnPropertyDescriptor(baseCtor.prototype, name));
        });
    });
}

```
代码里面首先定义了两个类，它们将作为**mixins**。可以看到每个类都只定义了一个特定的行为或者功能
```ts
// Disposable Mixin
class Disposable {
    isDisposed: boolean;
    dispose() {
        this.isDisposed = true;
    }

}

// Activatable Mixin
class Activatable {
    isActive: boolean;
    activate() {
        this.isActive = true;
    }
    deactivate() {
        this.isActive = false;
    }
}
```
接下来使用它们来联合创建一个新的类，同时具备下面的这两种功能：
```ts
class SmartObject {
    ...
}

interface SmartObject extends Disposable, Activatable {}
```
可以看到没有在`SmartObject`类里面继承`Disposable`和`Activatable`，而是在接口中`SmartObject`中进行继承的。并且由于**声明合并**的存在，`SmartObject`接口会被混入到`SmartObject`类里面。

它将类视为接口，并且只会混入`Disposable`和`Activatable`背后的类型到`SmartObject`中，只会混入声明的类型，而不会混入实现。

最后将混入融入到类的实现中去：
```ts
// Disposable
isDisposed: boolean = false;
dispose: () => void;
// Activatable
isActive: boolean = false;
activate: () => void;
deactivate: () => void;
```
最后创建一个函数来帮助实现做混入操作。它会遍历mixins上的所有属性，并复制到类目标上去，把之前占位属性替换成真正的实现代码：
```ts
function applyMixins(derivedCtor: any, baseCtors: any[]) {
    baseCtors.forEach(baseCtor => {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
            Object.defineProperty(derivedCtor.prototype, name, Object.getOwnPropertyDescriptor(baseCtor.prototype, name));
        })
    });
}
```