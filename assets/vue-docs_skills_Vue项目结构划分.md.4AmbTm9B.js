import{_ as s,c as a,o as i,U as n}from"./chunks/framework.qUHj8-gn.js";const o=JSON.parse('{"title":"Vue项目结构划分","description":"","frontmatter":{},"headers":[],"relativePath":"vue-docs/skills/Vue项目结构划分.md","filePath":"vue-docs/skills/Vue项目结构划分.md","lastUpdated":1714066297000}'),p={name:"vue-docs/skills/Vue项目结构划分.md"},l=n(`<h1 id="vue项目结构划分" tabindex="-1">Vue项目结构划分 <a class="header-anchor" href="#vue项目结构划分" aria-label="Permalink to &quot;Vue项目结构划分&quot;">​</a></h1><h2 id="规划原则" tabindex="-1">规划原则 <a class="header-anchor" href="#规划原则" aria-label="Permalink to &quot;规划原则&quot;">​</a></h2><p>规划项目结构的时候，需要遵循一些基本的原则：</p><ul><li>文件夹和文件夹内部文件的语义保持一致性</li><li>单一入口 / 出口</li><li>就近原则，紧耦合的文件靠齐，且用相对路径引用</li><li>公共文件应该以绝对路径的方式从根目录引用</li><li><code>/src</code> 以外的文件不应该被引入</li></ul><h3 id="文件夹和文件夹内部文件的语义保持一致性" tabindex="-1">文件夹和文件夹内部文件的语义保持一致性 <a class="header-anchor" href="#文件夹和文件夹内部文件的语义保持一致性" aria-label="Permalink to &quot;文件夹和文件夹内部文件的语义保持一致性&quot;">​</a></h3><p>目录结构都会有一个文件夹是按照路由模块来划分的，如<code>pages</code>文件夹，这个文件夹里面应该包含我们项目所有的路由模块，并且仅应该包含路由模块，而不应该有别的其他的非路由模块的文件夹</p><p>这样做的好处在于一眼就从<code>pages</code>文件夹看出这个项目的路由有哪些</p><h3 id="单一-入口-出口" tabindex="-1">单一 入口/出口 <a class="header-anchor" href="#单一-入口-出口" aria-label="Permalink to &quot;单一 入口/出口&quot;">​</a></h3><p>举个例子，在<code>pages</code>文件夹里面存在一个<code>seller</code>文件夹，这时候<code>seller</code>文件夹应该作为一个独立的模块由外部引入，并且 <code>seller/index.js</code> 应该作为外部引入 <code>seller</code> 模块的唯一入口</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 错误用法</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> sellerReducer </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;src/pages/seller/reducer&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 正确用法</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { reducer </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">as</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> sellerReducer } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;src/pages/seller&#39;</span></span></code></pre></div><p>这个原则的好处在于，无论模块文件内部有多乱，外部引用时，都是从一个入口文件进行引入，很好的实现了隔离，如果后续有重构需求，这种方式的优点就会体现出来</p><p><strong>就近原则，紧耦合的文件靠齐，且用相对路径引用</strong></p><p>使用相对路径来保证模块内部的独立性</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 正确用法</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> styles </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;./index.module.scss&#39;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 错误用法</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> styles </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;src/pages/seller/index.module.scss&#39;</span></span></code></pre></div><p>假设现在的sheller目录是在<code>src/pages/seller</code> , 如果后续发生了路由变化，需要加上一个层级，就变成了 <code>src/pages/user/seller</code></p><p>采用第一种相对路径的方式，那就可以直接将整个文件夹拖过去就好，<code>seller</code>文件夹内部不需要做任何变更。</p><p>采用第二种第二种绝对路径的方式，移动文件夹的同时，还需要对每个 <code>import</code> 的路径做修改</p><h3 id="公共文件应该以绝对路径的方式从根目录引用" tabindex="-1">公共文件应该以绝对路径的方式从根目录引用 <a class="header-anchor" href="#公共文件应该以绝对路径的方式从根目录引用" aria-label="Permalink to &quot;公共文件应该以绝对路径的方式从根目录引用&quot;">​</a></h3><p>公共指的是多个路由模块共用，如一些公共的组件，我们可以放在<code>src/components</code>下</p><p>在使用到的页面中，采用绝对路径的形式引用</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 错误用法</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Input </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;../../components/input&#39;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 正确用法</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Input </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;src/components/input&#39;</span></span></code></pre></div><p>同样的，如果我们需要对文件夹结构进行调整。将 <code>/src/components/input</code> 变成 <code>/src/components/new/input</code>，如果使用绝对路径，只需要全局搜索替换再加上绝对路径有全局的语义，相对路径有独立模块的语义</p><h3 id="src以外的文件不应该被引用" tabindex="-1">/src以外的文件不应该被引用 <a class="header-anchor" href="#src以外的文件不应该被引用" aria-label="Permalink to &quot;/src以外的文件不应该被引用&quot;">​</a></h3><p>使用相对路径来保证模块内部的独立性</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 正确用法</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> styles </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;./index.module.scss&#39;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 错误用法</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> styles </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;src/pages/seller/index.module.scss&#39;</span></span></code></pre></div><p>假设现在的sheller目录是在<code>src/pages/seller</code> , 如果后续发生了路由变化，需要加上一个层级，就变成了 <code>src/pages/user/seller</code></p><p>采用第一种相对路径的方式，那就可以直接将整个文件夹拖过去就好，<code>seller</code>文件夹内部不需要做任何变更。</p><p>采用第二种第二种绝对路径的方式，移动文件夹的同时，还需要对每个 <code>import</code> 的路径做修改</p><h2 id="目录结构" tabindex="-1">目录结构 <a class="header-anchor" href="#目录结构" aria-label="Permalink to &quot;目录结构&quot;">​</a></h2><p>总结的一些目录结构</p><ul><li>单页面结构</li></ul><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>project</span></span>
<span class="line"><span>│  .browserslistrc</span></span>
<span class="line"><span>│  .env.production</span></span>
<span class="line"><span>│  .eslintrc.js</span></span>
<span class="line"><span>│  .gitignore</span></span>
<span class="line"><span>│  babel.config.js</span></span>
<span class="line"><span>│  package-lock.json</span></span>
<span class="line"><span>│  package.json</span></span>
<span class="line"><span>│  README.md</span></span>
<span class="line"><span>│  vue.config.js</span></span>
<span class="line"><span>│  yarn-error.log</span></span>
<span class="line"><span>│  yarn.lock</span></span>
<span class="line"><span>│</span></span>
<span class="line"><span>├─public</span></span>
<span class="line"><span>│      favicon.ico</span></span>
<span class="line"><span>│      index.html</span></span>
<span class="line"><span>│</span></span>
<span class="line"><span>|-- src</span></span>
<span class="line"><span>    |-- components</span></span>
<span class="line"><span>        |-- input</span></span>
<span class="line"><span>            |-- index.js</span></span>
<span class="line"><span>            |-- index.module.scss</span></span>
<span class="line"><span>    |-- pages</span></span>
<span class="line"><span>        |-- seller</span></span>
<span class="line"><span>            |-- components</span></span>
<span class="line"><span>                |-- input</span></span>
<span class="line"><span>                    |-- index.js</span></span>
<span class="line"><span>                    |-- index.module.scss</span></span>
<span class="line"><span>            |-- reducer.js</span></span>
<span class="line"><span>            |-- saga.js</span></span>
<span class="line"><span>            |-- index.js</span></span>
<span class="line"><span>            |-- index.module.scss</span></span>
<span class="line"><span>        |-- buyer</span></span>
<span class="line"><span>            |-- index.js</span></span>
<span class="line"><span>        |-- index.js</span></span></code></pre></div><ul><li>text</li></ul><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">my</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">vue</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">test</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:.</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">│  .browserslistrc</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">│  .env.production</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">│  .eslintrc.js</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">│  .gitignore</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">│  babel.config.js</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">│  </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">package-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">lock.json</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">│  package.json</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">│  </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">README</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.md</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">│  vue.config.js</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">│  yarn</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">error.log</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">│  yarn.lock</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">│</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">├─public</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">│      favicon.ico</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">│      index.html</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">│</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">└─src</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">├─apis </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">//接口文件根据页面或实例模块化</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">│      index.js</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">│      login.js</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">│</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">├─components </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">//全局公共组件</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">│  └─header</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">│          index.less</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">│          index.vue</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">│</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">├─config </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">//配置（环境变量配置不同passid等）</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">│      env.js</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">│      index.js</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">│</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">├─contant </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">//常量</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">│      index.js</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">│</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">├─images </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">//图片</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">│      logo.png</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">│</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">├─pages </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">//多页面vue项目，不同的实例</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">│  ├─index </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">//主实例</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">│  │  │  index.js</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">│  │  │  index.vue</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">│  │  │  main.js</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">│  │  │  router.js</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">│  │  │  store.js</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">│  │  │</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">│  │  ├─components </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">//业务组件</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">│  │  └─pages </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">//此实例中的各个路由</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">│  │      ├─amenu</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">│  │      │      index.vue</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">│  │      │</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">│  │      └─bmenu</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">│  │              index.vue</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">│  │</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">│  └─login </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">//另一个实例</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">│          index.js</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">│          index.vue</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">│          main.js</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">│</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">├─scripts </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">//包含各种常用配置，工具函数</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">│  │  map.js</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">│  │</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">│  └─utils</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">│          helper.js</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">│</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">├─store </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">//vuex仓库</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">│  │  index.js</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">│  │</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">│  ├─index</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">│  │      actions.js</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">│  │      getters.js</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">│  │      index.js</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">│  │      mutation</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">types.js</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">│  │      mutations.js</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">│  │      state.js</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">│  │</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">│  └─user</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">│          actions.js</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">│          getters.js</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">│          index.js</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">│          mutation</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">types.js</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">│          mutations.js</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">│          state.js</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">│</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">└─styles </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">//样式统一配置</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">│  components.less</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">│</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">├─animation</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">│      index.less</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">│      slide.less</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">│</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">├─base</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">│      index.less</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">│      style.less</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">│      var.less</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">│      widget.less</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">│</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">└─common</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">index.less</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">reset.less</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">style.less</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                transition.less</span></span></code></pre></div>`,34),e=[l];function h(t,k,E,d,r,c){return i(),a("div",null,e)}const y=s(p,[["render",h]]);export{o as __pageData,y as default};
