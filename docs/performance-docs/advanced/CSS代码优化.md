# CSS代码优化
## CSS开发痛点
css最显著的痛点就是**可维护性差**，具体表现在：
### 语法简陋
CSS并非编程语言，其语法缺乏逻辑控制，变量，循环等特性，不便于编写复杂的动态样式，对如今业务逻辑复杂的前端应用来说，语法堪称简陋

### 全局作用污染
CSS默认运行在全局作用域，同时模块化能力又有限，类名样式对所有元素生效，导致类名难以避免，样式容易被覆盖

### 选择器规则复杂
CSS的类名选择符特性依赖优先级生效，但优先级计算规则又相当复杂，对开发者不友好

### 代码关联性差
CSS和JS，HTML配合紧密，代码又相互隔离，缺乏关联，导致开发者需要在3者之间频繁切换注意力，对开发效率和体验都有负面影响

避免开发者频繁切换注意力，从而提高开发效率，也是Vue.js提出单文件SFC

### 样式生效依赖隐式规则
CSS的样式最终是否生效，**隐式**的依赖许多难以控制的因素，例如：

- CSS规则声明的先后顺序：或者说`style`和`link`标签在HTML中的先后顺序
- 元素继承关系：部分CSS样式规则可以在应用在父元素后，通过继承关系，应用到子元素上

这些因素在开发实践中通常**难以控制**，尤其是现代的前端工程大都依赖打包构建工具，将模块化的代码，合并成产物文件。对于有成百上千组件模块的前端项目，CSS代码合并后的顺序往往不能控制，甚至难以预测

## 常见CSS开发体验优化方案
总结4类常见的解决方案，各有优劣哈

### 类命名原则
这类方案约定俗成了一套编写CSS的原则，约定在开发时将CSS的类名class分成3部分：
- 块`Block`：是一个抽象概念，表示使用这个字符串作为类名的元素，都属于一个部分，有相对独立的功能。例如`.block`, `.navbar`类名
-元素`Element`：块的组成部分，总是和块相连使用，以2个下划线作为分隔。例如`.block__element`, `.navbar__dropdown`类名
-修饰符`Modifier`：用于标识块和元素的细节外观，以2个中横线作为分隔。例如`.block-element--modifier`, `.navbar__dropdown--disabled`类名


这3类概念组成的类名，对应的就是BEM的全称：Block Element Modifier

BEM规则通过提供统一的CSS class命名规范，让开发者使用统一的大小写规则和下划线等符号，实现为不同的组件和元素，命名不同的CSS类名class

同时致力于尽量让CSS类名选择符保存**最低的优先级**，只有一个类选择器，避免CSS缺乏作用域特性导致难以维护优先级的痛点

#### 缺点
- **BEM类名冗长**：大量BEM类名会导致整个页面的HTML标签代码视觉上省略冗长，甚至混乱难以辨认。例如：`navigation__menu-item--active-with-submenu`，`.product__image-container--with-overlay-and-zoom`，这样的类名阅读起来太复杂了
- **依赖开发者主观上遵守规范，可靠性不强：**但人又往往是不可靠因素，导致在实践中，对同一元素的类名容易因人而异，对块元素，修饰符定义出现分歧，必须要依赖于评审保持规则约束

### CSS 处理器
第二类解决方案是最常见的CSS预处理，代表工具`Sass`和`Less`

这类方案基于配套的代码编译工具，拓展了CSS的语法，通过为CSS增加变量，函数，嵌套等特性，来解决CSS可维护性较差的痛点
```css
// src/style/demo.less
// 1. 函数 mixin
.bordered {
  border-top: dotted 1px black;
  border-bottom: solid 2px black;
}

// 2. 变量 variable
@fontSize: 16px;

// 3. 嵌套 nested
#header {
  font-size: @fontSize;
}
```
经过编译之后，后面的代码就是：
```css
.bordered {
  border-top: dotted 1px black;
  border-bottom: solid 2px black;
}

#header {
  font-size: 16px;
}
```
#### 缺点
- **有额外学习成本**：需要专门学习`Sass`和`Less`的语法，有一定时间成本
- **不便于调试**：使用`Sass`和`Less`编写的源码和最终浏览器中运行的产物CSS代码不一定能精确匹配，会增加开发调试的难度，一般需要额外配合`CSS sourcemap`使用
- **拖慢构建耗时**：用预处理器编写的`Sass`和`Less`代码，需要使用专用的编译器，例如`sass-loader`,`less-laoder`，编译后才能在生产环境中使用，会导致前端项目构建的耗时明显增加

### CSS后处理器

第三类解决方案是后处理器。

和预处理器直接提供新语法、新特性不同，后处理器PostCSS通过提供一套类似Babel的CSS语法编译工具和插件系统，来对已有的CSS进行后置处理，更注重通过生态中的各类插件，实现特定功能，例如：

- 嵌套语法插件：https://github.com/postcss/postcss-nested
- 自动增加浏览器兼容前缀插件：https://github.com/postcss/autoprefixer
- CSS代码压缩：https://github.com/cssnano/cssnano

#### 缺点
有额外学习成本和工具链配置成本：使用PostCSS的配置相对更加复杂，需要专门`postcss.config.js`配置文件，来设置使用的插件及其选项
```js
// postcss.config.js
/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: [
    require('autoprefixer'),
    require('postcss-nested')
  ]
}

module.exports = config
```
PostCSS为了实现对CSS语法树的编译解析并应用插件转化代码，有额外的编译开销，会导致构建耗时边长

### 原子化CSS
第四类解决方案，是近两年在前端领域非常流行的原子化CSS方案

比如 Tailwind CSS

这类方案通过**预定义**和**细粒度**CSS样式和类名，来提高CSS的开发效率，减少自定义的样式和类名，从根本上尽可能避免CSS类名和样式容易冲突覆盖，难以维护的痛点。

以Tailwind为例，其特点有：

Tailwind提供的预定义CSS样式和类名，基于**工具优化utility-first**的思想，有独特的规律，例如：

```css
{
  text-xs: font-size: 0.75rem; /* 12px / line-height: 1rem; / 16px */
  text-sm: font-size: 0.875rem; /* 14px / line-height: 1.25rem; / 20px */
  text-lg: font-size: 1.125rem; /* 18px / line-height: 1.75rem; / 28px */
}
{
  w-4:width:1rem;/* 16px */
  w-8:width:2rem;/* 32px */
}
```
### 缺点
- **有一定学习成本：**其预定义的CSS类名规则比较特性，想要灵活运用，需要一定的时间来熟悉
- **可读性略差：**有很多开发者认为预定义的原子化CSS类名不够直观，难以理解，写出来的代码可读性不好