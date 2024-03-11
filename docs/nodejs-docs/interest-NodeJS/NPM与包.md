# NPM 与 包
## CommonJS 包规范
按照CommonJS包规范的定义，一个包需要包含包描述文件，即`package.json`，里面需要包含多种手段。npm下的`package.json`也有很多字段，有些遵循CommonJS规范定义的，而有些则是npm自行定义的。一般来说，npm遵循着Node.js的需求，在一定程度上契合了CommonJS规范。

除了描述文件外，还定义一些目录得使用规范：
- 可执行文件需要在`bin`目录下
- JavaScript代码需要在`lib`目录下
- 文档需要在`doc`目录下
- 单元测试文件需要在`test`目录下

早期的很多npm包都遵循了这种君子规则，但是近期又开始漫散起来了。

对于现在的NodeJS来说，`package.json`里的字段用得都不对，比npm用得少。NodeJS只会用到`package.json`中寻址相关的字段，比如`main`，各种映射字段，用于判断模块类型的`type`字段，甚至都不会判断`name`是否匹配。在CommonJS模式下，就算是没有`package.json`文件也不会影响，**只要目录符合寻址算法即可**。

也就是说，不通过npm，而是通过手写代码去创建下面的代码就是完全可以执行的：
```js
// ./node_modules/foo/index.js
module.exports = {
  foo: 'hello world',
};

// ./index.js
const { foo } = require('foo');
console.log(foo);
```
如果想使用ECMAScript modules的形式，也可以这样：
```js
// ./node_modules/foo/index.mjs
export const foo = 'hello world';

// ./index.mjs 需要明确指明导入的esm文件
import { foo } from 'foo/index.mjs';
console.log(foo);
```
简单来说，NodeJS包参考了CommonJS的包，`package.json`这些内容只用于研发时的管理用（我一般都把它当成说明书来看），并不会被强行依赖，只要目录符合规则。而npm则帮NodeJS管理了这些依赖，生成符合规则的目录，并做一些额外的事情。

## Node.js包的模块寻址规则
其实所谓的包，对于NodeJS来讲就是一个有很多模块的一个特殊目录，它可以通过不断往上级目录回溯去寻址，也可以通过目录下的元信息描述文件`package.json`做映射，但无所谓。

在NodeJS中，如果在`require`或`import`模块时，其标识不以相对路径的（`.`，`..`）为开始，又不是一个内置模块，则认为其是从某个“包”内进行导入。它会根据标识作为“包名”去当前模块所在路径的`node_modules`目录下寻找，若找不到就去上级目录的`node_modules`里面寻找

:::tip
在NodeJS眼里，“包名”就是目录名，而非 package.json 中的 name，它以目录作为事实标准
:::

![image](../assets/npm%E5%8C%85%E7%9A%84%E5%AF%BB%E5%9D%80%E8%A7%84%E5%88%99.png)

假如在这个图中，假设当前所在文件是`C@2`中的`index.js`，它对于根的目录规则为`./node_modules/A/node_modules/C/index.js`，这个时候，它需要去`require('D)`，那么它就会折返进行寻址：
- 在当前目录下的`node_modules`找，但是不存在
- 返回上级去`./nodemodules/A/node_modules`里找
- 再返回上级，成功找到`./node_modules/D`存在！
在寻找到文件之后，需要通过两种方式来判断命中文件：
- 从当前目录的`package.json`中的`main`字段获取映射，判断文件是否存在。
- 如果没有`package.json`中的`main`字段，则默认以`index`加各种后缀尝试。

## 幽灵依赖
在上面得规则下，其实很容易触发一个叫做 **幽灵依赖** 的漏洞。

比如当下`packge`的代码安装以下的一些依赖：
```json
"dependencies": {
  "axios": "^1.6.5",
  "browser-md5-file": "^1.1.1",
  "element-plus": "^2.5.1",
  "less": "^4.2.0",
  "vue": "^3.3.11"
},
"devDependencies": {
  "@vitejs/plugin-vue": "^4.5.2",
  "vite": "^5.0.10"
}
```
但是又因为这些依赖库可能又依赖了其他库，所以`npm i`的时候会安装一些没有声明过的第三方库：
![image](../assets/%E5%B9%BD%E7%81%B5%E4%BE%9D%E8%B5%96.png)

由于NodeJS的寻址规则，那么在代码中就可以去导入一些完全没有声明过的库：
```js
import _ from 'lodash'
_.chunk([1,2,3,4,5,6],2)
```
这样的做法可能存在一些问题（下面的说法A库是明确声明的库，B库是幽灵库）：
- **版本问题**：在代码中使用B库的代码，但是A库突然升级了，升级版A库引入了升级版的B库，导致之前使用的B库代码出问题
- **依赖丢失问题**：在开发环境中使用了开发依赖B库，结果一上线A库的代码根本不打包，导致B库丢失了

下图描述了依赖的产生原因：
![image](../assets/npm%E5%8C%85%E5%AF%BB%E5%9D%80%E5%9B%BE.png)

当然可以使用**pnpm**库来解决这个问题：
![image](../assets/pnpm%E5%85%B3%E7%B3%BB%E5%9B%BE.png)

## NPM
一个npm实际上有多种语义在里面：
- **Node.js下的包管理器：** 帮助JavaScript开发者去轻易的分享包
- **npm源站：** 互联网公共包代码的合集服务
- **npm CLI ：** 用于安装，发布包的客户端