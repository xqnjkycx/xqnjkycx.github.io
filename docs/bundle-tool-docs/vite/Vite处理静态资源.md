# Vite处理静态资源
静态资源处理是前端工程经常遇到的问题，在真实的工程中不仅仅包含了动态执行的代码，也不可避免第要引用像图片 **JSON** **Worker** **Web** **Assembly** 这样的静态资源文件

静态资源本身并不是标准意义上的模块，因此对于它们的处理和普通代码是完全不同的，一个方面是需要解决**资源加载**的问题，这一块Vite已经完成了去实现将静态资源解析并加载为一个ES模块的问题；另一个方面在**生产环境**下还需要考虑将静态资源的部署问题，体积问题，网络性能问题，并用相应的方案去进行优化

## 常见图片加载
Vite对很多图片类型都做了处理，对于`png` `jpeg`这样形式得图片可以直接使用，也就不需要进行额外下载loader之类的东西了，稍微需要做处理得就是对配置文件进行一个别名配置
```js
import path from 'path'
{
  resolve:{
  	alias:{
      '@assets':path.join(__dirname,'src/assets')
    }
  }
}
```
## SVG组件加载
其实可以直接引用svg格式的图片，不过一般来讲更希望将svg当作一个组件来引用，这样才能更方便地修改svg各种属性，而且语义上更加明显

不同的前端框架中对于这类格式的图片处理稍微不同，社区中也有对应的插件支持:

- Vue3项目中推荐使用(vite-svg-loader)[https://github.com/jpkleemans/vite-svg-loader]

这里以`vite-svg-loader`为例，使用起来非常简单：
```js
// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
// npm install vite-svg-loader --save-dev
import svgLoader from 'vite-svg-loader'

export default defineConfig({
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src')
		}
	},
  // 引入使用
	plugins: [vue(), svgLoader()]
})
```
直接导入到Vue组件中使用：
```html
<script setup>
	import VueSvg from '@/assets/vue.svg'
</script>

<template>
	<VueSvg class="vue-svg" />
</template>

<style scoped>
	.vue-svg {
		background-color: aquamarine;
	}
</style>
```

## JSON加载
vite中其实已经内置了对JSON文件的解析，底层使用`@rollup/pluginutils`的`dataToEsm`方法将JSON对象转换为一个包含各种具名导出的ES模块
```js
// 具名导出
import { version } from '../../../package.json';
```
当然这种具名导出的方式也可以被禁用掉
```js
// vite.config.js

{
  json: {
    stringify: true
  }
}
```
这样会将JSON内容解析为`export default JSON.parse("xxx")`，这样也会失去**按名导出**的功能，如果JSON数量比较大，也可以优化解析性能
