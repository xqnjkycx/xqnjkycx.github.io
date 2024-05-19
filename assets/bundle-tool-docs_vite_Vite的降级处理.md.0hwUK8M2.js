import{_ as s,c as i,o as a,U as n}from"./chunks/framework.qUHj8-gn.js";const l="/assets/babel-demo1.0_ABuTa-.png",e="/assets/babel-demo2.KtcIlAvE.png",p="/assets/babel-demo3.lyJ3HSnP.png",t="/assets/babel-demo4._kIrq4TL.png",h="/assets/babel-demo5.akaMVPNN.png",k="/assets/babel-demo6.yJGYEgsu.png",d="/assets/babel-demo7.V7XKgy0J.png",A=JSON.parse('{"title":"语法降级与Polyfill","description":"","frontmatter":{},"headers":[],"relativePath":"bundle-tool-docs/vite/Vite的降级处理.md","filePath":"bundle-tool-docs/vite/Vite的降级处理.md","lastUpdated":1716128103000}'),r={name:"bundle-tool-docs/vite/Vite的降级处理.md"},o=n(`<h1 id="语法降级与polyfill" tabindex="-1">语法降级与Polyfill <a class="header-anchor" href="#语法降级与polyfill" aria-label="Permalink to &quot;语法降级与Polyfill&quot;">​</a></h1><p>通过Vite构建完全可以兼容各种低版本的浏览器，打包出既支持现代浏览器又支持旧版浏览器的产物</p><h2 id="场景复现" tabindex="-1">场景复现 <a class="header-anchor" href="#场景复现" aria-label="Permalink to &quot;场景复现&quot;">​</a></h2><p>当在线上遇到JS语法不兼容时，会导致代码直接报错，从而导致线上白屏事故的发生。</p><p>旧版浏览器语法兼容性错误主要包含两类：</p><ul><li><strong>语法降级问题</strong>：有的浏览器不支持箭头函数，所以需要将其转换成<code>function(){}</code>语法，也就是可以通过旧的语法去实现新的API特性</li><li><strong>Pollyfill缺失问题</strong>：像<code>generate</code>和<code>Object.entries</code>方法的实现，可以保证产物正常使用API</li></ul><p>这两类问题本质上是通过前端的编译工具链<code>Babel</code>以及JS的基础Polyfill库<code>core.js</code>和<code>regenerator-runrtime</code>来进行解决，不会和具体的构建工具所绑定，构建工具只需要考虑如何将这些底层基础设施接入到构建过程中去。</p><h2 id="底层工具链" tabindex="-1">底层工具链 <a class="header-anchor" href="#底层工具链" aria-label="Permalink to &quot;底层工具链&quot;">​</a></h2><p>解决上面的两类语法兼容问题，主要用到两个方面的工具，分别包括：</p><ul><li><strong>编译时工具</strong>：代表工具有<code>@babel/preset-env</code>和<code>@babel/plugin-transform-runtime</code></li><li><strong>运行时基础</strong>：代表库包括<code>core-js</code>和<code>regeneretor-runtime</code></li></ul><p><strong>编译时工具</strong>的作用是在代码编译阶段进行<strong>语法降级</strong>以及添加<code>polyfill</code><strong>代码的引用语句</strong>。如:</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;core-js/modules/es6.set.js&quot;</span></span></code></pre></div><p>由于这些工具只是编译阶段用到，运行时并不需要，所以需要将其放入<code>package.json</code>中的<code>devDependencies</code>中</p><p><strong>运行时基础库</strong>是根据<code>ESMAScript</code>官方语言规范提供各种<code>Polyfill</code>实现代码，主要包括<code>core-js</code>和<code>regenerator-runtime</code>两个基础库，不过在babel中也会有一些上层的封装，包括：</p><ul><li><a href="https://link.juejin.cn/?target=https%3A%2F%2Fbabeljs.io%2Fdocs%2Fen%2Fbabel-polyfill" target="_blank" rel="noreferrer">@babel/polyfill</a></li><li><a href="https://link.juejin.cn/?target=https%3A%2F%2Fbabeljs.io%2Fdocs%2Fen%2Fbabel-runtime" target="_blank" rel="noreferrer">@babel/runtime</a></li><li><a href="https://link.juejin.cn/?target=https%3A%2F%2Fbabeljs.io%2Fdocs%2Fen%2Fbabel-runtime-corejs2" target="_blank" rel="noreferrer">@babel/runtime-corejs2</a></li><li><a href="https://link.juejin.cn/?target=https%3A%2F%2Fbabeljs.io%2Fdocs%2Fen%2Fbabel-runtime-corejs3" target="_blank" rel="noreferrer">@babel/runtime-corejs3</a></li></ul><p>这些库都是<code>core-js</code>和<code>regenerator-runtime</code>的不同版本的封装（<code>@babel/runtime</code>是一个特例，不包含<code>core-js</code>的<code>Polyfill</code>）。这些类库是项目运行时必须要使用到的，因此一定要放在<code>package.json</code>中的<code>dependencies</code></p><h2 id="实际使用" tabindex="-1">实际使用 <a class="header-anchor" href="#实际使用" aria-label="Permalink to &quot;实际使用&quot;">​</a></h2><p>这里以一个例子来说明，创建一个文件夹并初始化项目</p><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>mkdir babel-test</span></span>
<span class="line"><span>npm init -y</span></span></code></pre></div><p>接下来可以安装一些必要的工具库：</p><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>npm i @babel/cli @babel/core @babel/preset-env</span></span></code></pre></div><p>这是各个依赖的作用： -<code>@babel/cli</code>:为babel官方的脚手架工具 -<code>@babel/core</code>:babel的核心编译库 -<code>@babel/preset-env</code>:babel的预设工具集合，基本上是babel必须安装的库</p><p>接着在项目中创建<code>src</code>目录，并且在目录之下增加<code>index.js</code>文件</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// index.js</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> func</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> async</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> () </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">123</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">Promise</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">resolve</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">().</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">finally</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span></span></code></pre></div><p>接下来创建<code>.babelrc.json</code>的babel配置文件，内容如下：</p><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;presets&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        [</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">            &quot;@babel/preset-env&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            {   </span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">                // 指定兼容的版本</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">                &quot;targets&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:{</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">                    &quot;ie&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;11&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                },</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">                // 基础库core-js的版本，一般定为最新的大版本</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">                &quot;corejs&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">3</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">                // Polyfill注入策略,一般选择 usage 来进行按需导入</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">                &quot;useBuiltIns&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;usage&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">                // 不将ES模块语法转换为其他模块语法</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">                &quot;modules&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">false</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        ]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    ]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p>关于<code>targets</code>比较关键，它可以指定要兼容的浏览器版本，对于实际项目中一般会创建一个<code>.browserslistrc</code>文件来进行这样的声明：</p><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// 现代浏览器</span></span>
<span class="line"><span>last 2 versions and since 2018 and &gt; 0.5%</span></span>
<span class="line"><span>// 兼容低版本 PC 浏览器</span></span>
<span class="line"><span>IE &gt;= 11, &gt; 0.5%, not dead</span></span>
<span class="line"><span>// 兼容低版本移动端浏览器</span></span>
<span class="line"><span>iOS &gt;= 9, Android &gt;= 4.4, last 2 versions, &gt; 0.2%, not dead</span></span></code></pre></div><p>执行编译命令</p><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>npx babel src --out-dir dist</span></span></code></pre></div><p>可以看到如下的产物： <img src="`+l+`" alt="image"></p><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>Polyfill 代码主要来自 corejs 和 regenerator-runtime，如果要运行起来，必须安装这个两个库</p></div><p>最后总结一下，利用<code>@babel/preset-env</code>进行目标浏览器的降级和<code>Polyfill</code>注入，同时也要用到core-js和regenerator-runtime两个核心运行时库。</p><p>但是<code>@babel/preset-env</code>的方案存在一定的局限性：如果使用新特性，往往通过<code>core-js</code>往全局环境中添加Polyfill，如果是开发自己的应用没有问题，但是如果是第三方库，可能会出现<strong>全局空间造成污染</strong>这样的扶风县</p><h3 id="更优的polyfill注入方案-transform-runtime" tabindex="-1">更优的Polyfill注入方案：transform-runtime <a class="header-anchor" href="#更优的polyfill注入方案-transform-runtime" aria-label="Permalink to &quot;更优的Polyfill注入方案：transform-runtime&quot;">​</a></h3><p><code>transform-runtime</code>就是为了解决<code>@babel/preset-env</code>这种局限</p><div class="tip custom-block"><p class="custom-block-title">TIP</p><p><code>transfrom-runtime</code>方案可以作为<code>@babel/preset-env</code>中<code>useBuiltIns</code>配置的代替品，也就是说，一旦使用了<code>transfrom-runtime</code>方案，就应该把<code>useBuiltIns</code>属性设为<code>false</code></p></div><p>必须安装的依赖如下：</p><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>pnpm i @babel/plugin-transform-runtime -D</span></span>
<span class="line"><span>pnpm i @babel/runtime-corejs3 -S</span></span></code></pre></div><p>前者是编译时工具，用来转换语法和添加Polyfill，后者是运行时的基础库，封装了<code>core-js</code>和<code>regenerator-runtime</code>和各种语法转换用到的工具函数</p><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>core-js 有三种产物，分别是<code>core-js</code>，<code>core-js-pure</code>和<code>core-js-bundle</code>。 <code>core-js</code>是一种全局Polyfill的做法，<code>@babel/preset-env</code>就是用的这种产物 <code>core-js-pure</code>是不会讲Polyfill注入到全局，可以按需引入，<code>@babel/runtime-corejs3</code>就是这种产物</p></div><p>接下来需要修改一下<code>.babelrc.json</code>的配置</p><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{   </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">&quot;plugins&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:[</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  [</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    &quot;@babel/plugin-transform-runtime&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;corejs&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">3</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  ]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">],</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;presets&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    [</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      &quot;@babel/preset-env&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      {   </span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        &quot;targets&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:{</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">          &quot;ie&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;11&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        },</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        &quot;corejs&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">3</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">        // 一定要关闭，这样可以避免 polyfill 的全局注入</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        &quot;useBuiltIns&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">false</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        &quot;modules&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">false</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    ]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  ]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p>最后输入编译命令 <img src="`+e+`" alt="image"> 可以很清楚的看到<code>transform-runtime</code>一方面能够在代码中使用<strong>非全局版本</strong>的Polyfill，这样就避免全局空间的污染</p><h2 id="vite语法降级与polyfill注入" tabindex="-1">Vite语法降级与Polyfill注入 <a class="header-anchor" href="#vite语法降级与polyfill注入" aria-label="Permalink to &quot;Vite语法降级与Polyfill注入&quot;">​</a></h2><p>Vite官方已经封装好了一个开箱即用的方案：<code>@vitejs/plugin-legacy</code>，可以基于它来解决项目语法的浏览器兼容问题。这个插件内部同样使用<code>@babel/preset-env</code>以及<code>core-js</code>等一系列基础库来进行语法降级和Polyfill注入</p><h3 id="插件使用" tabindex="-1">插件使用 <a class="header-anchor" href="#插件使用" aria-label="Permalink to &quot;插件使用&quot;">​</a></h3><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">pnpm i @vitejs</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">/</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">plugin</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">legacy </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">D</span></span></code></pre></div><p>直接在<code>vite.config.js</code>中使用</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// vite.config.ts</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> legacy </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;@vitejs/plugin-legacy&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { defineConfig } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;vite&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">export</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> default</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> defineConfig</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  plugins: [</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // 省略其它插件</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    legacy</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">      // 设置目标浏览器，browserslist 配置语法</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      targets: [</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;ie &gt;= 11&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">],</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    })</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  ]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">})</span></span></code></pre></div><p>通过<code>target</code>指定目标浏览器，这个参数在插件内部会传递给<code>@babel/preset-env</code><img src="`+p+'" alt="image"> 相比一般的打包过程，多出来了几个和<code>legacy</code>相关的文件，查看<code>index.html</code>中的文件中有以下内容 <img src="'+t+'" alt="image"></p><p>通过官方的<code>legacy</code>插件，Vite会分别打包出<code>Modern</code>模式和<code>Legacy</code>模式的产物，然后将两种产物插入同一个HTML中，<code>Modern</code> 产物被放到 <code>type=&quot;module&quot;</code> 的 script 标签中，而<code>Legacy</code>产物则被放到带有<code>nomodule</code>中的script标签中</p><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>Script标签上的nomodule属性来表明这个脚本不应该在支持ES模块的浏览器中执行</p></div><p><img src="'+h+'" alt="image"> 这样产物便能够同时放到现代浏览器和不支持<code>type=&quot;module&quot;</code></p><h3 id="插件执行原理" tabindex="-1">插件执行原理 <a class="header-anchor" href="#插件执行原理" aria-label="Permalink to &quot;插件执行原理&quot;">​</a></h3><p><code>legacy</code>插件是一个相对复杂度比较高的插件，下面是一张简化的流程图： <img src="'+k+`" alt="image"></p><p>第一步，首先是<code>configResolved</code>钩子中调整了<code>output</code>属性，这样做的目的是让Vite底层使用打包引擎Rollup能另外打包一份<code>Legacy 模式</code>的产物，实现代码如下：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> createLegacyOutput</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">options</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {}) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    ...</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">options,</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // system 格式产物</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    format: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;system&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // 转换效果: index.[hash].js -&gt; index-legacy.[hash].js</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    entryFileNames: </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">getLegacyOutputFileName</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(options.entryFileNames),</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    chunkFileNames: </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">getLegacyOutputFileName</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(options.chunkFileNames)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">rollupOptions</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> config.build</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">output</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> rollupOptions</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (Array.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">isArray</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(output)) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  rollupOptions.output </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">...</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">output.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">map</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(createLegacyOutput), </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">...</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">output]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">} </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">else</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  rollupOptions.output </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">createLegacyOutput</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(output), output </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">||</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {}]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p>在<code>renderChunk</code>阶段，插件会对Legacy模式产物进行语法转译和Polyfill收集，这里不会真正注入Polyfill，而不是仅仅只是收集<code>Polyfill</code></p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  renderChunk</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(raw, chunk, opts) {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // 1. 使用 babel + @babel/preset-env 进行语法转换与 Polyfill 注入</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // 2. 由于此时已经打包后的 Chunk 已经生成</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    //   这里需要去掉 babel 注入的 import 语句，并记录所需的 Polyfill</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // 3. 最后的 Polyfill 代码将会在 generateBundle 阶段生成</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p>接下来进入<code>generateChunk</code>钩子阶段，现在Vite会对之前收集到的<code>Polyfill</code>进行统一的打包，主要逻辑集中在于<code>buildPolyfillChunk</code>函数中</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 打包 Polyfill 代码</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">async</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> buildPolyfillChunk</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">  name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">  imports</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">  bundle</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">  facadeToChunkMap</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">  buildOptions</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">  externalSystemJS</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  let</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { minify, assetsDir } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> buildOptions</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  minify </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> minify </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">?</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;terser&#39;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> :</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> false</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  // 调用 Vite 的 build API 进行打包</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> res</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> await</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> build</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // 根路径设置为插件所在目录</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // 由于插件的依赖包含\`core-js\`、\`regenerator-runtime\`这些运行时基础库</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // 因此这里 Vite 可以正常解析到基础 Polyfill 库的路径</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    root: __dirname,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    write: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">false</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // 这里的插件实现了一个虚拟模块</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // Vite 对于 polyfillId 会返回所有 Polyfill 的引入语句</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    plugins: [</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">polyfillsPlugin</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(imports, externalSystemJS)],</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    build: {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      rollupOptions: {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">        // 访问 polyfillId</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        input: {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">          // name 暂可视作\`polyfills-legacy\`</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">          // pofyfillId 为一个虚拟模块，经过插件处理后会拿到所有 Polyfill 的引入语句</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">          [name]: polyfillId</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  });</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  // 拿到 polyfill 产物 chunk</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> _polyfillChunk</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Array.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">isArray</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(res) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">?</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> res[</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">] </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> res</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;output&#39;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> in</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> _polyfillChunk)) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">return</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> polyfillChunk</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> _polyfillChunk.output[</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  // 后续做两件事情:</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  // 1. 记录 polyfill chunk 的文件名，方便后续插入到 Modern 模式产物的 HTML 中；</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  // 2. 在 bundle 对象上手动添加 polyfill 的 chunk，保证产物写到磁盘中</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p>这个函数可以简单的理解为通过<code>vite build</code>对<code>renderChunk</code>中收集到polyfill代码进行打包，生成一个单独的chunk <img src="`+d+'" alt="image"></p>',63),c=[o];function E(g,y,u,F,b,m){return a(),i("div",null,c)}const f=s(r,[["render",E]]);export{A as __pageData,f as default};
