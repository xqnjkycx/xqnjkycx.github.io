# 深入浅出NodeJS
这篇笔记主要是来源于我读的《深入浅出Node.js》一书中的记录的知识点📝

我非常推荐你去读一下原书，会对自己的成长特别大。

我在这本书里面基本理清了Node背后的运行机制和工作原理，其中关于异步方面的代码设计非常优秀，我借鉴了其中的 **中间件** 思想，去设计了工作中的图片列表组件（虽然说组件是Web端的，但是其中的设计思想是共同的😛）

[我推荐给你的深入浅出Node.js原版pdf](https://blog.songqingbo.cn/pdf/nodejs/%E6%B7%B1%E5%85%A5%E6%B5%85%E5%87%BANode.js.pdf)

::: tip 温馨提示
呃呃，这本书内容有点多，这个pdf加载会比较慢，我会选择打开网站后去倒杯咖啡🥄
:::

👌我们走起

## 简述一下Node特点
了解Node之前，需要好好清楚Node相较于其它语言的一些特别的点。
### 异步IO
在Node中绝大多数的操作都是以异步的方式去进行调用，Node的底层构建了很多的异步I/O的API，从文件读取到网络请求等。这样的意义在于，在Node中，可以非常自然的进行并行I/O操作。每个调用之间不需要等待前面的I/O调用结束。可以在编程模型上极大地提升效率，比如
```js
fs.readFile('/path1',function(){
    // 文件1读取完成
})

fs.readFile('/path2',function(){
    // 文件2读取完成
})
```
对于同步I/O来说，它们的耗时任务是两个任务的耗时之和。但是对于异步来说，就是取决于耗时最慢的那一个。
### 事件机制与回调函数
通过事件和回调函数，配合异步I/O，将事件发生点暴露给业务逻辑。就比如给读取文件绑定一个读取后的事件，在文件读取完毕之后，只需要关心文件读完后你需要执行的业务逻辑就可以了。

事件的编程方式具有轻量级，松耦合，关注业务点这些优点。但是事件与事件之间是独立的，如果在多个异步任务下，想要两个不同的事件进行协作就需要一些额外的操作了。

同时可以看到Node中到处都是回调函数，这主要是还是因为JavaScript语言可以将函数作为参数传递给方法进行调用，自然而然就成为了一种接受异步调用返回结果的最好的方式，但是问题在于，代码编写顺序和执行顺序没有关系，如果习惯了同步编程，由于穿插了异步方法和回调函数，那么在流程控制方面就需要多思考如何编写了。

### 单线程
Node的单线程最大好处在于**不用考虑像多线程编程那样去处处在意状态同步的问题，没有锁这种概念，也没有线程上下文交换所带来的性能上的开销。**

但是单线程也有一定的缺点：
- 无法利用多核CPU
- 错误会引起整个应用退出
- 大量计算占用CPU导致无法继续调用异步IO

像在浏览器的渲染主线程一样，大量的JS计算会阻塞UI的渲染，但是可以通过Web Workers来创建其它工作线程完成计算任务。

在Node中，如果占满了CPU计算，也会导致完成异步I/O的回调函数没得到及时的执行。Node也有*child_process*。通过将计算分发到各个子进程中，将大量的计算给分解掉，然后再通过进程之间的事件消息来传递结果，可以很好地保持应用模型的简单和依赖。

## CommonJS的模块规范
CommonJS对模块的定义十分简单，主要还是分为模块引用，模块定义和模块标识这3个地方。

### 模块引用
```js
var math = require('math')
```
在CJS中，使用`require`方法来接受模块标识，以此引入一个模块的API到当前的上下文中。

### 模块定义
上下文中提供了`exports`对象用于导出当前模块的方法或者变量，并且它是唯一的出口。

在模块中，还存在一个module对象，它代表模块自身，而exports是module的属性。在Node里，一个文件就是一个模块，将方法挂载到exports对象上作为属性即可定义出导出的方式：

```js
exports.add = function(){
  //...
}
```

### 模块标识
标识就是传递给`require()`方法的参数，它必须是符合小驼峰命名的字符串，或者以.，..开头的相对路径，或者绝对路径。它可以没有文件名后缀.js。

![image](./assets/commonjs.png)

## 为什么ESM可以import引入CJS模块，而CJS反过来不行？
这里的本质问题是因为**模块加载的同异步机制问题**。CommonJS的`require`机制是机制是完全同步的，而ESM的`import`机制规则是完全异步的。

`import`是异步的，那么在内部去通过同步的方式模拟一个`require`流程是可以实现的，但是反过来却不好弄，一个同步的东西是很难加载异步内容的，至少无法通过比较正统的方式解决。

虽然CommonJS无法通过`require`去加载一个ESM，但不意味着它就完全不能加载ESM，实际上CommonJS支持`import()`函数。所以仍然是可以通过`import()`函数来加载一个ESM

虽然`import * as mod from 'xxx'`的语法中看起来像是同步的，其实在引擎内部帮助处理了异步的部分。然而在`import()`函数中，异步依然需要自己处理，它的返回值是一个`Promise`

```js
import('xxx').then(mode => {
  // ...
})
```

## NodeJS引入模块时，发生了什么？

在Node中引入模块，实际上是需要经历如下3个步骤：
- 路径分析
- 文件定位
- 编译执行

在完全理解Node的模块引入机制之前，你必须了解**两件关键的事情：**

**第一件事：** 在Node中，模块被分为两类，一类是Node提供的模块，称为核心模块。另一类是用户编写的模块，称为文件模块。

核心模块，在Node源代码的编译过程中，就编译进了二进制执行文件。在Node启动时，部分核心模块就被直接加载进了内存中去，所以这类核心模块在被引入时，文件定位和编译执行这两步其实直接被跳过了，并且在路径分析中被优先判断。所以它的加载速度是最快的。

文件模块，是运行时动态加载的，需要经过完整的 路径分析👉文件定义👉编译执行 过程。所以速度较核心模块慢。

![image](./assets/Node%E5%BC%95%E5%85%A5%E6%A8%A1%E5%9D%97%E6%B5%81%E7%A8%8B.png)

**第二件事**：和前端浏览器一样，Node也会有缓存机制来提升性能，Node对于引入过的模块都会进行缓存，从而减少二次引入带来的开销，与前端浏览器不同的是，**浏览器缓存的是静态脚本文件**，而**Node缓存的是编译和执行之后的对象**。不论是核心模块还是文件模块，`require`方法对于相同的模块的二次加载一律采用缓存优先的方式，并且这是最高级优先级的。
:::tip
当然核心模块的缓存检查 优先于 文件模块的缓存检查。
:::
### 路径分析
`require`接受标识符来定义要引入的模块，但标识符号的形式不同，模块的查找和定位都有不同程度上的差异。

模块标识符在Node中主要分为以下几类：
- 核心模块，如 http，fs，path 模块
- . 或 .. 开头的相对路径文件模块
- 以 / 开始的绝对路径文件模块
- 非路径形式的文件模块，如自定义的 connect 模块

**核心模块**
核心模块的加载仅次于缓存加载，如果试图加载一个与核心模块标识符相同的自定义模块，那么会失败。假如自己编写了一个http用户模块，想要加载成功，必须选择一个不同的标识符或换用路径的方式加载。由于二机制执行代码已经被Node编译了，所以加载速度最快

**路径形式存在的文件模块**
require方法会将路径转换为真实的路径，并以真实路径作为索引，将编译执行后的结果放入到缓存中，以便于二次加载时更快，由于路径指明了具体的文件位置，所以加载速度慢于核心模块

**自定义模块**
自定义模块指的是非核心模块，也不是路径形式的标识符，比如`const express = require('express')`。
它是一种特殊的文件模块，可能是一个文件或者包的形式。这类模块的查找是最费时的，也是所有方式中最慢的一种。

因为它要Node去通过标识符去生成模块路径，而模块路径的生成规则如下：
- 当前文件目录下的node_modules目录
- 父目录下的node_modules目录
- 父目录的父目录下的node_modules目录
- 路径沿上递归，直到根目录下的node_modules目录

它的生成方式与JS中的原型链或作用链的查找方式十分类似。Node会在加载过程中，逐个尝试模块路径中的路径，直到找到目标文件位置。

### 文件定位
在文件定位过程中，Node还进行了包括文件扩展名的分析，目录和包的处理

**文件扩展名解析**
`require`在分析标识符的过程中，会出现标识符中不包含文件扩展名的情况。这种情况下，Node会按照 .js .json .node 的顺序去补充扩展名，进行以此尝试。

在尝试过程中，需要调用fs模块同步阻塞式地判断文件是否存在。

:::tip 提升性能的小技巧
因为Node是单线程的，如果是 .node 和 .json 文件，在传递require的标识符中带上扩展名，会加快一点速度。
:::

**目录分析和包**
在分析标识符的过程中，`require()`通过分析文件扩展名之后，可能没有查找到对应的文件，但是却得到了一个目录，此时Node会将目录当作一个包处理。

这个过程中，Node在当前目录下查找`package.json`，通过`JSON.parse()`解析出包的描述对象，从中取出main属性来制定文件名进行定位。如果main指定的文件名错误，或者根本就没有`package.json`文件，Node将 index 当作默认文件名，然后依次查找`index.js`，`index.json`，`index.node`。如果还没找到直接报错。

![image](./assets/node%E6%96%87%E4%BB%B6%E5%AE%9A%E4%BD%8D%E6%B5%81%E7%A8%8B.png)

### 解析编译
在Node中，每个文件模块都是一个对象，它的定义如下
```js
function Module(id,parent){
  this.id = id;
  this.exports = {};
  this.parent = parent;
  if(parent && parent.children){
    parent.children.push(this)
  }
  this.filename = null;
  this.loaded = false;
  this.children = [];
}
```
编译和执行是引入文件模块的最后一个阶段，对于不同的文件扩展名，其载入方法也不同，这里具体拿js文件做解释😘。

对于js文件，通过fs模块同步读取文件后进行编译执行。每一个编译成功的模块都会将其文件路径作为索引缓存在`Module._cache`对象上，用来提高二次引入的性能。

在编译过程中，Node对获取的js文件内容进行**头尾函数**包装，一个正常的JS文件内容会被包装为如下的样子：

```js
let exports = module.exports // 这个很重要哦
(function(exports, require, module, __filename, __dirname){
  var math = require('math')
  exports.area = function (radius){
    return Math.PI * radius * radius;
  }
})
```
这样每个模块文件之间都进行了作用域隔离，当前模块对象的`exports` `require` `module`以及在文件定位中得到的完整路径文件路径和文件目录`__filename`和`__dirname`作为参数传入这个函数中。

这就是为什么这些变量并没有定义在每个模块文件中，却能直接使用的原因。在执行之后，模块的exports属性返回给了调用方。exports属性上的任何一个方法和属性都可以被外部调用到。

也是为什么存在exports的情况下，还存在module.exports，理想情况下，只要赋值给exports上的属性即可。

:::warning 不要直接复制给exprots
这样赋值会切断exports对module.exports的引用关系，最后导致失败
:::
```js
exports = function () {
  // 错误的做法
}
```

## 核心模块为什么快？
因为大部分核心模块要么全部被C/C++编写，要么通过C/C++模块完成主要核心，由JavaScript实现封装。这样的话综合了脚本语言开发速度快，而静态语言编译性能快。在进行文件编译时候，这些核心模块可以很快编译为二进制文件加载到内存中，不需要经过上面的**路径解析**，**文件定位**，**编译**的过程了

## NPM与包的关系
Node组织了自身的核心模块，也使得第三方文件模块可以有序地编写和使用。但是在第三方模块中，模块和模块之间依然是散落的，相互之间不能之间引用。而在模块之外，包和NPM则是将模块联系起来的一种机制。

Node对模块规范的实现，一定程度上解决了变量依赖，依赖关系等代码组织性问题。包的出现，则是在模块的基础上进一步组织了JS代码。

![module的引用关系](./assets/module引用关系.png)

CommonJS的包规范和定义其实非常简单，它由包结构和包描述文件两部分组成，前者用于组织包中的各种文件，后者描述包的相关信息。

### 包结构
一个完全符合CommonJS规范的包目录应该包含如下这些文件
- package.json : 包描述文件
- bin : 用于存放可执行二进制文件的目录
- lib：用于存放JavaScript代码的目录
- doc : 用于存放文档的目录
- test : 用于存放单元测试用例的代码

### 包描述文件
包描述文件就是`package.json`文件，这里介绍一下必需常见的字段：
- name 包名。包名必须是唯一的，以免对外公布时产生重名冲突的误解
- description 包简介
- version 版本号
- keywords 关键词数组 NPM中主要用用户可以快速找到你编写的包
- dependencies 使用当前包所需要依赖的包列表，NPM会通过这个熟悉帮助自动加载依赖的包
- scripts 脚本说明对象，它主要被包管理器用来安装，编译，测试和卸载包，就像如下
```js
"script":{
  "install":"install.js",
  "uninstall":"uninstall.js",
  "build":"build.js",
  "doc":"make-doc.js",
  "test":"test.js"
}
```
- author 包作作者
- bin 一些包作者希望包可以作为命令行工具使用。**配置好bin字段后，通过npm install package_name -g命令可以将脚本添加到执行路径，之后可以在命令行中直接执行。通过-g命令安装的模块包称为全局模式，比如npm install express -g安装express后，就可以在命令行中使用express命令了**
- main 模块引用方法`require`在引入包时，会优先检查这个字段，并将其作为包中其余模块的入口。如果不存在，就像前面说过，它会·查找包目录下的`index.js` `index.node` `index.json`这些文件
- devDependencies 一些模块只在开发时需要依赖。

### NPM
CommonJS包规范是理论，而NPM是其中一种实践。对于Node而言，NPM帮助完成了第三方模块的发布，安装和依赖。借助NPM，Node与第三方模块之间形成了很好的一个生态系统。

## 企业内部NPM仓库
在企业内部应用中使用NPM与开源社区中的使用由一定差别。企业的限制在于，一方面需要享受到模块开发带来的低耦合和项目组织上的好处，另一方面也要考虑到模块保密性的问题。

为了同时能够享受到NPM上的包，同时对自己的包进行保密和限制，就需要搭建本地npm仓库了。

企业的npm仓库的好处在于，局部npm仓库可以选择不同步官方源仓库中的包。对于企业内部而言，私有的可重用模块可以打包到局域NPM仓库中，这样可以保持更新的中心化，不至于让各个小项目各自维护相同功能的模块，杜绝通过复制粘贴实现代码共享的行为。

## Node为什么选择异步I/O
Node使用异步I/O主要从**用户体验**和**资源分配**这两个方面来考虑的

### 用户体验
因为Node是单线程的。在Node服务中，假如一个资源来自于两个不同位置的数据的返回，第一个资源需要M毫秒的耗时，第二个资源需要N毫秒的耗时。如果采用同步的方式，代码大致如下：
```
// 消费时间M
getData('from_db', result=>{})
// 消费时间N
getData('from_remote_api', result=>{})
```
那么消耗的时间为`M+N`

如果采用异步的方式，第一个资源的获取并不影响第二个资源，第二个资源的请求开始并不依赖第一个资源的结束。如此，就可以享受到并发的优势:
```
getData('from_db', result=>{
  // 消费时间M
})
getData('from_remote_api', result=>{
  // 消费时间N
})
```
那么消耗的时间为`max(M,N)`，那么随着应用复杂性的增加，同步的方式将会爆炸，只有让后端能够快速响应资源，才能让前端更有体验。

### 资源分配
在资源的层面异步I/O也有很强的必要性。

如果在业务场景中存在一组互不相关的任务需要完成，主流的方法是：
- 单线程串行依次完成
- 多线程并行完成

如果创建线程的开销远小于并行执行，那么多线程依然是首选的。多线程的代价在于创建线程和执行期线程上下文切换的开销较大，如果在很复杂的业务中，多线程编程需要面临锁，状态同步等问题，但多线程在多核CPU上能够有效提升CPU同步的问题。

而串行执行的缺点在于性能，任意一个耗时任务都会导致后续执行代码被阻塞，导致服务资源不能被很好的利用。

所以Node在两者之间给出了一个好的方案：利用单线程原理避免多线程的锁，状态同步问题。利用异步原理任务阻塞，更好的利用资源。

这样可以力求在单线程上将资源分配的更高效。同时Node，为了弥补单线程无法利用多核CPU的缺点，Node也提供了类似前端浏览器中的Web Workers的子进程，该子进程可以通过工作进程高效地利用CPU和I/O。

![image](./assets/应用程序和操作系统的异步关系.png)

## Node如何实现异步I/O
完成整个完整的异步I/O环节主要依靠以下四个方面:
- 事件循环
- 观察者
- 请求对象
- 执行回调

### 事件循环
在Node进程启动时，实际上会创建一个类似于`while(true)`的循环，每次执行循环体都可以被看成一次**Tick**，每个**Tick**的过程就是查看是否有事件待处理，如果有，就需要取出事件和相关的回调函数。如果存在相关联的回调函数，就执行它们，然后进入下一个循环。

### 观察者
在每个Tick中，需要观察者来判断事件是否需要处理。

每个事件循环中有一个或多个观察者，而判断是否有事件要处理的过程就是向这些观察者查询是否要处理的事件。**前端的浏览器也有类似的机制，事件可能来自用户的点击或者加载某些文件时产生，这些产生都有对应的观察者，比如`addEventListener`**，在Node里面，事件主要来自于网络请求，文件I/O等等，这些事件就对应了观察者有文件I/O观察者，网络I/O观察者等。

事件循环本身是一个典型的 *生产者/消费者* 模型。异步I/O，网络请求等则是事件的生产者，源源不断的为Node提供不同类型的事件，这些事件被传递到对应的观察者里去，事件循环就从观察者那里取出事件来进行处理。

### 请求对象
对于Node的异步I/O的调用而言,回调函数不由开发者来调用。而是由系统等待到时机之后在执行调用，中间有个过程，也就是JavaScript发起调用到内核执行完I/O操作的过渡过程中，存在一种名为**请求对象**的产物。

比如调用`fs.open(path,flags,mode,callback)`时，当调用到底层的Node的内建模块时，会创建一个请求对象，**其中JavaScript层传入的参数和当前callback都被封装到这个请求对象上**。

这个对象包装完毕时，就被推入到底层的线程池去等待，由于当前I/O操作在线程池中等待执行，不管是否阻塞I/O，反正不会影响到后续的JavaScript线程的执行了，从而达到了异步的目的。

### 执行回调
在每次Tick中，事件循环的I/O观察者，都会去检查底层的线程池是否有执行完的请求，如果存在会将请求对象加入到观察者的队列中，然后将其当作事件处理，然后把请求对象上的回调函数取出来执行就行了。
![image](./assets/%E5%BC%82%E6%AD%A5IO%E6%B5%81%E7%A8%8B.png)

## process.nextTick
在不完全了解`process.nextTick`之前，不少人会为了立即执行一个异步任务，通过`setTimeout`来达到这种效果：
```js
setTimeout(function(){
  // ...todo
},0)
```
:::tip
其实调用`setTimeout`这样的定时器，会被插入到定时器观察者内部的一个红黑树中。每次Tick执行时，会从该红黑树中迭代取出定时器对象，检查是否超过定时时间，如果超过就形成了一个事件，它的回调函数就会立即执行
:::
所以可以看到，**定时器的问题在于它不是真正意义上精确**。采用定时器需要动用红黑树，创建定时器对象和迭代等操作比较浪费性能。

所以更加推荐使用`process.nextTick`方法的操作相对比较轻量。

每次调用`process.nextTick`就只会将回调函数放入到队列中，在下一轮的Tick取出执行。定时器中采用红黑树的操作事件复杂度为O(N)，而nextTick的时间复杂度为O(1)。所以process.nextTick更加高效是毋庸置疑的。

## Node的异步编程的优势和缺点有哪些？
### 优势
Node带来的最大的特性莫过于基于事件驱动的非阻塞I/O模式，非阻塞I/O可以使CPU和I/O并不互相依赖对等。 让资源得到更好的利用。对于网络应用而言，并行带来的 想象空间更大，延展而开的是分布式和云。并行使得各个单点之间能够更有效地组织起来。

![image](./assets/%E4%BA%8B%E4%BB%B6%E9%A9%B1%E5%8A%A8%E7%9A%84%E4%BC%98%E5%8A%BF.png)

如果采用传统的同步I/O模型，分布式计算中性能的折扣将会是非常明显的。

利用事件循环的方式，JavaScript线程就像一个分配任务和处理结果的监控者，而I/O池中各个线程都是执行者，两者是互不依赖的，所以可以保持整体的高效率。

### 缺点

#### 异常处理
`try/catch`处理异常时对于异步编程而言并不是那么适用。 异步I/O的实现主要包含两个阶段： 提交请求和处理结果。这两个阶段中间有事件循环的调度，两者彼此不关联。异步方法则通常在 第一个阶段提交请求后立即返回，因为异常并不一定发生在这个阶段  ，这导致`try/catch`并不能捕获回调函数中报出的异常。

```js
var async = callback => process.nextTick(callback)

try{
  async(callback)
}catch(e){
  // todo...
}
```
调用async()方法后，callback被存放起来，直到下一个事件循环（Tick）才会取出来执行。 尝试对异步方法进行try/catch操作只能捕获当次事件循环内的异常 。

因此Node在处理异常时，形成了一种约定，将异常作为回调函数的第一个参数返回。

```js
fs.writeFile(str,err=>{
  //...
})
```
同时在编写自己的异步方法时，也要尽量去遵循这一些原则
- 原则一：必须执行调用者传入的回调函数
- 原则二：正确传递回异常拱调用者判断

#### 函数嵌套过深
在前端开发中，DOM事件相对而言不会存在互相依赖 或需要多个事件一起协作的场景，较少存在异步多级依赖的情况。下面的代码为彼此独立的DOM 事件绑定
```js
$(selector).click(function (event) { 
 // TODO
}); 
$(selector).change(function (event) { 
 // TODO
}); 
```
对于Node来说，事务中多个异步调用的场景可以说是比比皆是
```js
fs.readdir(path.join(__dirname, '..'), function (err, files) { 
 	files.forEach(function (filename, index) { 
 	fs.readFile(filename, 'utf8', function (err, file) { 
 	// TODO
 	}); 
 }); 
}); 
```
这种做法在结果上来看是没有什么问题的，问题在于没有利用好异步I/O带来的并行优势。
:::info
甚至有人说过 **因为嵌套的深度，未来里最难看的代码一定要从Node中诞生**
:::

#### 代码阻塞
Node中没有`sleep()`这样的功能去实现真正的代码阻塞。而`setTimeout`和`setInterval`虽然能够实现延时，但是并不能组织后续代码的持续执行。

如果要实现代码阻塞应该这么来写
```js
var start = new Date()
while(new Date() - start < 1000){
  // ...
}
```
这段代码写的真是烂透了，完全破坏了事件循环的调度，而且Node单线程的原因，CPU资源会完全用户服务这段代码，导致其他请求暂时不会得到响应。

## 异步编程常见解决方案
现在异步编程的主要解决方案有如下几种：
- 事件发布/订阅模式
- Promsie/Deffered 模式
- 流程控制库

### 事件发布/订阅模式
 Node自身提供的events模块（http://nodejs.org/docs/latest/api/events.html）是发布/订阅模式的 一个简单实现 ，它具有 addListener/on() 、 once() 、 removeListener() 、 removeAllListeners()和emit()等基本的事件监听模式的方法实现。事件发布/订阅模式的操作极 其简单，示例代码如下：  
 ```js
 // 订阅
emitter.on("event1", function (message) { 
 console.log(message); 
}); 
// 发布
emitter.emit('event1', "I am message!"); 
 ```
 事件发布/订阅模式可以实现一个事件与多 个回调函数的关联，这些回调函数又称为事件侦听器。通过emit()发布事件后，消息会立即传递 给当前事件的所有侦听器执行。侦听器可以很灵活地添加和删除，使得事件和具体处理逻辑之间 可以很轻松地关联和解耦。

 事件侦听器模式也是一种钩子（hook）机制，利用钩子导出内部数据或 状态给外部的调用者。Node中的很多对象大多具有黑盒的特点，功能点较少，如果不通过事件钩 子的形式，我们就无法获取对象在运行期间的中间值或内部状态。这种通过事件钩子的方式，可 以使编程者不用关注组件是如何启动和执行的，只需关注在需要的事件点上即可 。

 比如经典的http场景:
 ```js
 var options = { 
 host: 'www.google.com', 
 port: 80, 
 path: '/upload', 
 method: 'POST' 
}; 
var req = http.request(options, function (res) { 
 console.log('STATUS: ' + res.statusCode); 
 console.log('HEADERS: ' + JSON.stringify(res.headers)); 
 res.setEncoding('utf8'); 
 res.on('data', function (chunk) { 
 console.log('BODY: ' + chunk); 
 }); 
 res.on('end', function () { 
 // TODO 
 }); 
}); 
req.on('error', function (e) { 
 console.log('problem with request: ' + e.message); 
}); 
// write data to request body 
req.write('data\n'); 
req.write('data\n')
 ```
 在这段代码中，程序员只需要将视线放到`error``data``end`这些业务事件点上即可。

除此之外，**事件发布/订阅模式**还可以解决一些额外的问题：

#### 利用事件队列解决雪崩问题
在事件订阅/发布模式中，通常也有一个once()方法，通过它添加的侦听器只能执行一次，在 执行之后就会将它与事件的关联移除。这个特性常常可以帮助我们过滤一些重复性的事件响应。

 在计算机中，缓存由于存放在内存中，访问速度十分快，常常用于加速数据访问，让绝大多 数的请求不必重复去做一些低效的数据读取。所谓雪崩问题，就是在高访问量、大并发量的情况 下缓存失效的情景，此时大量的请求同时涌入数据库中，数据库无法同时承受如此大的查询请求， 进而往前影响到网站整体的响应速度  

 假如有一条查询数据库的查询语句:

 ```js
 var select = function (callback) { 
 db.select("SQL", function (results) { 
 callback(results); 
 }); 
}; 
 ```
 如果站点刚好启动，这时缓存中是不存在数据的，而且如果访问量巨大，同一句sql会被发送到数据库反复查询，导致服务整体性能，改进方案就是添加一个状态锁
 ```js
 var status = "ready"; 
var select = function (callback) { 
   if (status === "ready") { 
     status = "pending"; 
     db.select("SQL", function (results) { 
       status = "ready"; 
       callback(results); 
     }); 
   } 
}; 
 ```
 在这种情况下，连续地多次调用`select`时，只有第一次调用是生效的，后续的`select`都是没有数据服务的
 ```js
 var proxy = new events.EventEmitter(); 
  var status = "ready"; 
  var select = function (callback) { 
     proxy.once("selected", callback); 
     if (status === "ready") { 
     status = "pending"; 
     db.select("SQL", function (results) { 
       proxy.emit("selected", results); 
       status = "ready"; 
     }); 
   } 
}; 
 ```
 利用了once()方法，将所有请求的回调都压入事件队列中，利用其执行一次就会将 监视器移除的特点，保证每一个回调只会被执行一次。对于相同的SQL语句，保证在同一个查询 开始到结束的过程中永远只有一次。**SQL在进行查询时，新到来的相同调用只需在队列中等待数 据就绪即可，一旦查询结束，得到的结果可以被这些调用共同使用**。这种方式能节省重复的数据 库调用产生的开销。由于Node单线程执行的原因，此处无须担心状态同步问题。  

 #### 多异步之间的协作方案
 一般而言，事件与侦听器的关系是一对多，但在异步编程中，也会出现事件 与侦听器的关系是多对一的情况，也就是说一个业务逻辑可能依赖两个通过回调或事件传递的结果。

  假设现在有这么一个业务，假设渲染页面需要**模板读取**，**数据读取**，**本地化资源**读取三个条件为前提，如果用串行的方式来执行，那么就享受不了异步I/O带来的性能提升。

  那么就需要借助一个第三方函数和第三方变量来处理异步协作的结果，把这个用于检测 次数的变量叫做哨兵变量，偏函数可以处理哨兵变量和第三方函数的关系了。

  相关代码如下：
  ```js
  var after = function (times, callback) { 
   // 哨兵变量
   var count = 0, results = {}; 
   return function (key, value) { 
     results[key] = value; 
     count++; 
     if (count === times) { 
       callback(results); 
     } 
   }; 
}; 

var emitter = new events.Emitter(); 
var done = after(times, render); 
emitter.on("done", done); 
// 也可以绑其他函数
emitter.on("done", other); 
fs.readFile(template_path, "utf8", function (err, template) { 
 emitter.emit("done", "template", template); 
}); 
db.query(sql, function (err, data) { 
 emitter.emit("done", "data", data); 
}); 
l10n.get(function (err, resources) { 
 emitter.emit("done", "resources", resources); 
});
  ```
  ### Promise/Deferred 模式
  Promise/A 提议对单个异步操作做出了一些抽象的定义：
  - Promise操作只会处在3种状态的一种：未完成态、完成态和失败态。 
  - Promise的状态只会出现从未完成态向完成态或失败态转化，不能逆反。完成态和失败态 不能互相转化。  
  - Promise的状态一旦转化，将不能被更改。  
![image](./assets/promise%E7%8A%B6%E6%80%81%E5%8F%98%E5%8C%96.png)

其中 Deferred主要是用于内部， 用于维护异步模型的状态；Promise则作用于外部，通过then()方法暴露给外部以添加自定义逻辑。 Promise和Deferred的整体关系  
![image](./assets/Defferrd.png)
其实就是浏览器端的promise规范了，这里不过多解释了~

### 流程控制
流程控制是一种非模式化的应用，不规范，但是非常灵活。

#### 尾触发和Next
这类方法需要手工调用，才能持续后续的调用，这类方法叫做尾触发，常见的关键词是next，相关代码如下：
```js
var app = connect(); 
// Middleware
app.use(connect.staticCache()); 
app.use(connect.static(__dirname + '/public')); 
app.use(connect.cookieParser()); 
app.use(connect.session()); 
app.use(connect.query()); 
app.use(connect.bodyParser()); 
app.use(connect.csrf()); 
app.listen(3001); 
```
这是express中常见的一种调用方式，每个中间价传递请求对象，响应对象和尾触发函数，通过队列形成一个处理流：
![image](./assets/%E5%B0%BE%E8%A7%A6%E5%8F%91.png)
可以看到，用户可以通过调用`next`方法去进入到下一个函数中，而`app.use`就可以把中间件放入到队列中。
```js
app.use = function(route,fn){
  // some code
  this.stack.push({ route, handle : fn })
  return this
}
```
可以看到`stack`属性是其服务器内部的属性，用于维护中间件队列，通过`use`方法将中间件放入到队列中，其中`next`方法较为复杂，但核心原理就是取出队列中的中间件并执行，同时传入当前方法来实现递归调用，达到持续触发的目的：
```js
function next(err){
 layer = stack[index++]
 layer.handle(req,res,next) 
}
```
尽管中间件这种尾触发模式并不是要求每个中间件方法都是异步的，但是如果每个步骤都采用异步来完成，实际上只是串行化的处理，没办法通过执行并行的异步调用来提升业务的处理效率，流式处理可以将一些串行的逻辑扁平化，但是并行逻辑处理还是需要搭配事件或者**Promise**完成，这样业务在纵向和横向都能各自清楚。

## Node如何做异步并发控制
异步编程方法里，解决问题都要保持异步的性能优势，提升编程体验。

在Node中，可以十分方便的利用异步发起并发调用，可以轻松的发起100次异步调用，如果并发量过大，会将下层服务器给吃光，如果对文件系统进行大量并发调用，操作系统的文件描述符数量将会被瞬间用光，然后抛出错误Error : `EMFILE, too many open files`

所以，同步I/O 因为每个I/O都是彼此阻塞的，在循环体中，总是一个接着一个调用，不会出现消耗文件描述符太多的问题，但同时性能有瓶颈，但是异步I/O也需要给底层资源给予一定的过载保护。

其基本的解决思路如下：
- 通过一个队列来控制并发量
- 如果当前活跃(指调用发起但未执行的回调)的异步调用量小于限定值，从队列中取出
- 如果当前活跃调用达到限定值，调用暂时存放在队列中
- 每个异步调用结束的时候，从队列中取出新的异步调用执行

### 基本实现
实现一个`bagpipe`类，暴露一个`push`方法和full事件，示例代码如下：
```js
var Bagpipe = require('bagpipe');
// 设定最大并发数为10
var bagpipe = new Bagpipe(10);
for (var i = 0; i < 100; i++) {
   bagpipe.push(async, function () {
   	// 异步回调执行
   });
}
bagpipe.on('full', function (length) {
 console.warn('底层系统处理不能及时完成，队列拥堵，目前队列长度为:' + length);
}); 
```
其中`push`方法依然是通过函数变换的方式得到的，其核心实现如下：
```js
      class asyncLimiter {
        constructor(requests, size) {
          this.requests = requests;
          this.size = size;
          this.limits = [];
          this.nextReqIndex = size - 1;
        }
        play() {
          this.limits = this.requests.slice(0, this.size);
          this.limits.forEach((req) => this.promiserReq(req));
        }
        promiserReq(request) {
          return new Promise((resolve, reject) => {
            if (request) {
              request().finally(() => {
                this.limits.splice(this.limits.indexOf(request), 1);
                if (this.limits.length <= this.size) {
                  this.nextReqIndex++;
                  if (this.requests[this.nextReqIndex]) {
                    this.limits.push(
                      this.promiserReq(this.requests[this.nextReqIndex])
                    );
                  }
                }
              });
            }
          });
        }
      }
```
甚至也可以继续往下进行扩展：
### 拒绝模式
事实上需要考虑一些深度使用的方式。

对于大量的异步调用，也需要分场景进行区分， 因为涉及并发控制，必然会造成部分调用需要进行等待。如果调用有实时方面的需求，那么需要 快速返回，因为等到方法被真正执行时，可能已经超过了等待时间，即使返回了数据，也没有意 义了。这种场景下需要快速失败，让调用方尽早返回，而不用浪费不必要的等待时间

在拒绝模式下，如果等待的调用队列也满了之后，新来的调用就直接返给它一个队列太忙的 拒绝异常。
### 超时控制
造成队列拥塞的主要原因是异步调用耗时太久，调用产生的速度远远高于执行的速度。为了防 止某些异步调用使用了太多的时间，我们需要设置一个时间基线，将那些执行时间太久的异步调用 清理出活跃队列，让排队中的异步调用尽快执行。否则在拒绝模式下，会有太多的调用因为某个执 行得慢，导致得到拒绝异常。相对而言，这种场景下得到拒绝异常显得比较无辜。为了公平地对待 在实时需求场景下的每个调用，必须要控制每个调用的执行时间，将那些害群之马踢出队伍。 为此，bagpipe也提供了超时控制。超时控制是为异步调用设置一个时间阈值，如果异步调用 没有在规定时间内完成，我们先执行用户传入的回调函数，让用户得到一个超时异常，以尽早返 回。然后让下一个等待队列中的调用执行。