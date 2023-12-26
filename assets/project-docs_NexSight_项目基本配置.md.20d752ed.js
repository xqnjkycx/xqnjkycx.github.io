import{_ as s,o as n,c as a,Q as l}from"./chunks/framework.6d94f49f.js";const p="/assets/前端请求逻辑.f72af4b7.png",u=JSON.parse('{"title":"项目基本配置","description":"","frontmatter":{},"headers":[],"relativePath":"project-docs/NexSight/项目基本配置.md","filePath":"project-docs/NexSight/项目基本配置.md","lastUpdated":1701076962000}'),o={name:"project-docs/NexSight/项目基本配置.md"},e=l(`<h1 id="项目基本配置" tabindex="-1">项目基本配置 <a class="header-anchor" href="#项目基本配置" aria-label="Permalink to &quot;项目基本配置&quot;">​</a></h1><h2 id="vite-config-js-配置" tabindex="-1">vite.config.js 配置 <a class="header-anchor" href="#vite-config-js-配置" aria-label="Permalink to &quot;vite.config.js 配置&quot;">​</a></h2><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { defineConfig } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;vite&#39;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> vue </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;@vitejs/plugin-vue&#39;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> path </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;path&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// const baseTarget = &#39;http://192.168.0.161:9000/webapi/&#39; // 测试环境 Env</span></span>
<span class="line"><span style="color:#6A737D;">// const baseTarget = &#39;https://nexsight.aqrose.com/webapi/&#39; // 生产环境 Env</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">baseTarget</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;http://192.168.0.165:80/webapi/&#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">// 开发环境 Env</span></span>
<span class="line"><span style="color:#6A737D;">// const baseTarget = &#39;http://localhost:8000/&#39; // 本地开发 Env</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">authTarget</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;http://192.168.0.165&#39;</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">authProxys</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> [</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">&#39;/user/auth&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">&#39;/user/static&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">&#39;/usercenter&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">&#39;/user/userinfo&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">&#39;/user/sendVerifyCode&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">proxys</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> [</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">&#39;/galleries&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">&#39;/solutions&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">&#39;/tasks&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">&#39;/task&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">&#39;/infering_tasks&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">&#39;/messages&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">&#39;/reslimits&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">&#39;/extra_info&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">&#39;/last_task&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">&#39;/oauth&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">mapProxys</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {}</span></span>
<span class="line"><span style="color:#E1E4E8;">proxys.</span><span style="color:#B392F0;">map</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">opt</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  mapProxys[opt] </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    target: baseTarget,</span></span>
<span class="line"><span style="color:#E1E4E8;">    changeOrigin: </span><span style="color:#79B8FF;">true</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span>
<span class="line"><span style="color:#E1E4E8;">authProxys.</span><span style="color:#B392F0;">map</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">opt</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  mapProxys[opt] </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    target: authTarget,</span></span>
<span class="line"><span style="color:#E1E4E8;">    changeOrigin: </span><span style="color:#79B8FF;">true</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">default</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">defineConfig</span><span style="color:#E1E4E8;">(({ </span><span style="color:#FFAB70;">mode</span><span style="color:#E1E4E8;"> }) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    base: </span><span style="color:#9ECBFF;">&#39;./&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    resolve: {</span></span>
<span class="line"><span style="color:#E1E4E8;">      alias: {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#9ECBFF;">&#39;@&#39;</span><span style="color:#E1E4E8;">: path.</span><span style="color:#B392F0;">resolve</span><span style="color:#E1E4E8;">(__dirname, </span><span style="color:#9ECBFF;">&#39;./src&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">    },</span></span>
<span class="line"><span style="color:#E1E4E8;">    build: {</span></span>
<span class="line"><span style="color:#E1E4E8;">      manifest: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      rollupOptions: {</span></span>
<span class="line"><span style="color:#E1E4E8;">        output: {</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#6A737D;">// 代码分割</span></span>
<span class="line"><span style="color:#E1E4E8;">          manualChunks: {</span></span>
<span class="line"><span style="color:#E1E4E8;">            lodash: [</span><span style="color:#9ECBFF;">&#39;lodash-es&#39;</span><span style="color:#E1E4E8;">],</span></span>
<span class="line"><span style="color:#E1E4E8;">            echarts: [</span><span style="color:#9ECBFF;">&#39;echarts&#39;</span><span style="color:#E1E4E8;">],</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#9ECBFF;">&#39;aq-ui&#39;</span><span style="color:#E1E4E8;">: [</span><span style="color:#9ECBFF;">&#39;aq-ui&#39;</span><span style="color:#E1E4E8;">],</span></span>
<span class="line"><span style="color:#E1E4E8;">            aqlabelview: [</span><span style="color:#9ECBFF;">&#39;aqlabelview&#39;</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">          }</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">    },</span></span>
<span class="line"><span style="color:#E1E4E8;">    server: {</span></span>
<span class="line"><span style="color:#E1E4E8;">      host: </span><span style="color:#9ECBFF;">&#39;localhost&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      port: </span><span style="color:#79B8FF;">8889</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      hotOnly: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      proxy: mapProxys</span></span>
<span class="line"><span style="color:#E1E4E8;">    },</span></span>
<span class="line"><span style="color:#E1E4E8;">    css: {</span></span>
<span class="line"><span style="color:#E1E4E8;">      preprocessorOptions: {</span></span>
<span class="line"><span style="color:#E1E4E8;">        less: {</span></span>
<span class="line"><span style="color:#E1E4E8;">          modifyVars: {</span></span>
<span class="line"><span style="color:#E1E4E8;">            hack: </span><span style="color:#9ECBFF;">\`true; @import (reference) &quot;\${</span><span style="color:#E1E4E8;">path</span><span style="color:#9ECBFF;">.</span><span style="color:#B392F0;">resolve</span><span style="color:#9ECBFF;">(</span></span>
<span class="line"><span style="color:#9ECBFF;">              </span><span style="color:#9ECBFF;">&#39;src/assets/css/component.less&#39;</span></span>
<span class="line"><span style="color:#9ECBFF;">            )</span><span style="color:#9ECBFF;">}&quot;;\`</span></span>
<span class="line"><span style="color:#E1E4E8;">          },</span></span>
<span class="line"><span style="color:#E1E4E8;">          javascriptEnabled: </span><span style="color:#79B8FF;">true</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">    },</span></span>
<span class="line"><span style="color:#E1E4E8;">    plugins: [</span><span style="color:#B392F0;">vue</span><span style="color:#E1E4E8;">()],</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { defineConfig } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;vite&#39;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> vue </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;@vitejs/plugin-vue&#39;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> path </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;path&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// const baseTarget = &#39;http://192.168.0.161:9000/webapi/&#39; // 测试环境 Env</span></span>
<span class="line"><span style="color:#6A737D;">// const baseTarget = &#39;https://nexsight.aqrose.com/webapi/&#39; // 生产环境 Env</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">baseTarget</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;http://192.168.0.165:80/webapi/&#39;</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">// 开发环境 Env</span></span>
<span class="line"><span style="color:#6A737D;">// const baseTarget = &#39;http://localhost:8000/&#39; // 本地开发 Env</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">authTarget</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;http://192.168.0.165&#39;</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">authProxys</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> [</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">&#39;/user/auth&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">&#39;/user/static&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">&#39;/usercenter&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">&#39;/user/userinfo&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">&#39;/user/sendVerifyCode&#39;</span></span>
<span class="line"><span style="color:#24292E;">]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">proxys</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> [</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">&#39;/galleries&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">&#39;/solutions&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">&#39;/tasks&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">&#39;/task&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">&#39;/infering_tasks&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">&#39;/messages&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">&#39;/reslimits&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">&#39;/extra_info&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">&#39;/last_task&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">&#39;/oauth&#39;</span></span>
<span class="line"><span style="color:#24292E;">]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">mapProxys</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {}</span></span>
<span class="line"><span style="color:#24292E;">proxys.</span><span style="color:#6F42C1;">map</span><span style="color:#24292E;">(</span><span style="color:#E36209;">opt</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  mapProxys[opt] </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    target: baseTarget,</span></span>
<span class="line"><span style="color:#24292E;">    changeOrigin: </span><span style="color:#005CC5;">true</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">})</span></span>
<span class="line"><span style="color:#24292E;">authProxys.</span><span style="color:#6F42C1;">map</span><span style="color:#24292E;">(</span><span style="color:#E36209;">opt</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  mapProxys[opt] </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    target: authTarget,</span></span>
<span class="line"><span style="color:#24292E;">    changeOrigin: </span><span style="color:#005CC5;">true</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">})</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">default</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">defineConfig</span><span style="color:#24292E;">(({ </span><span style="color:#E36209;">mode</span><span style="color:#24292E;"> }) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    base: </span><span style="color:#032F62;">&#39;./&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    resolve: {</span></span>
<span class="line"><span style="color:#24292E;">      alias: {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#032F62;">&#39;@&#39;</span><span style="color:#24292E;">: path.</span><span style="color:#6F42C1;">resolve</span><span style="color:#24292E;">(__dirname, </span><span style="color:#032F62;">&#39;./src&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#24292E;">    build: {</span></span>
<span class="line"><span style="color:#24292E;">      manifest: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      rollupOptions: {</span></span>
<span class="line"><span style="color:#24292E;">        output: {</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#6A737D;">// 代码分割</span></span>
<span class="line"><span style="color:#24292E;">          manualChunks: {</span></span>
<span class="line"><span style="color:#24292E;">            lodash: [</span><span style="color:#032F62;">&#39;lodash-es&#39;</span><span style="color:#24292E;">],</span></span>
<span class="line"><span style="color:#24292E;">            echarts: [</span><span style="color:#032F62;">&#39;echarts&#39;</span><span style="color:#24292E;">],</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#032F62;">&#39;aq-ui&#39;</span><span style="color:#24292E;">: [</span><span style="color:#032F62;">&#39;aq-ui&#39;</span><span style="color:#24292E;">],</span></span>
<span class="line"><span style="color:#24292E;">            aqlabelview: [</span><span style="color:#032F62;">&#39;aqlabelview&#39;</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">          }</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#24292E;">    server: {</span></span>
<span class="line"><span style="color:#24292E;">      host: </span><span style="color:#032F62;">&#39;localhost&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      port: </span><span style="color:#005CC5;">8889</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      hotOnly: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      proxy: mapProxys</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#24292E;">    css: {</span></span>
<span class="line"><span style="color:#24292E;">      preprocessorOptions: {</span></span>
<span class="line"><span style="color:#24292E;">        less: {</span></span>
<span class="line"><span style="color:#24292E;">          modifyVars: {</span></span>
<span class="line"><span style="color:#24292E;">            hack: </span><span style="color:#032F62;">\`true; @import (reference) &quot;\${</span><span style="color:#24292E;">path</span><span style="color:#032F62;">.</span><span style="color:#6F42C1;">resolve</span><span style="color:#032F62;">(</span></span>
<span class="line"><span style="color:#032F62;">              </span><span style="color:#032F62;">&#39;src/assets/css/component.less&#39;</span></span>
<span class="line"><span style="color:#032F62;">            )</span><span style="color:#032F62;">}&quot;;\`</span></span>
<span class="line"><span style="color:#24292E;">          },</span></span>
<span class="line"><span style="color:#24292E;">          javascriptEnabled: </span><span style="color:#005CC5;">true</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#24292E;">    plugins: [</span><span style="color:#6F42C1;">vue</span><span style="color:#24292E;">()],</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">})</span></span></code></pre></div><h2 id="环境变量配置" tabindex="-1">环境变量配置 <a class="header-anchor" href="#环境变量配置" aria-label="Permalink to &quot;环境变量配置&quot;">​</a></h2><p>vite的环境配置需要注意一些点，加载的环境变量会通过 <code>i<wbr>mport.meta.env</code> 以字符串形式暴露给客户端源码。为了防止将一些环境变量泄漏到客户端，只有以 <code>VITE_</code> 为前缀的变量才会暴露出去。</p><p>开发环境<code>.env.development</code></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">NODE_ENV = development</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">VITE_APP_BASEURL = &#39;&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">VITE_APP_PATH = &#39;./&#39;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">NODE_ENV = development</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">VITE_APP_BASEURL = &#39;&#39;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">VITE_APP_PATH = &#39;./&#39;</span></span></code></pre></div><p>生产环境 <code>.env.production</code></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">NODE_ENV = prodution</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">VITE_APP_BASEURL = &#39;/webapi&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">VITE_APP_PATH = &#39;/&#39;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">NODE_ENV = prodution</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">VITE_APP_BASEURL = &#39;/webapi&#39;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">VITE_APP_PATH = &#39;/&#39;</span></span></code></pre></div><h2 id="axios配置" tabindex="-1">axios配置 <a class="header-anchor" href="#axios配置" aria-label="Permalink to &quot;axios配置&quot;">​</a></h2><p>axios里中的配置主要做了这么几件事</p><ul><li>封装了一个刷新 <code>token</code> 请求<code>refreshToken</code>函数，它主要负责当出现状态码 <code>401</code> 时，说明 <code>token</code> 过期，这时需要请求一个专用于刷新 <code>token</code> 的接口，并在将请求到的新的 <code>token</code> 和 <code>refresh</code> 记录在会话存储中。</li><li>axios请求拦截器，主要是为在请求发送前给请求头中的 <code>Authorization</code> 加上 <code>token</code></li><li>axios响应拦截器，负责捕获到 <code>401</code> 过期时，去调用一次 <code>refreshToken</code> ，然后从请求拦截器中的失败拦截器中获取到原请求，等待 <code>refreshToken</code> 函数存储了新的 <code>token</code> 和 <code>refresh</code> 后，通过axios再次发送新的原请求</li></ul><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> axios </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;axios&#39;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { AqMessage } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;aq-ui&#39;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { ToLogin } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;./util.js&#39;</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">refreshToken</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">async</span><span style="color:#E1E4E8;"> () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    	</span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">Promise</span><span style="color:#E1E4E8;">((</span><span style="color:#FFAB70;">resolve</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">reject</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> refreshUrl </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;/oauth/refresh-token&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">      axios</span></span>
<span class="line"><span style="color:#E1E4E8;">        .</span><span style="color:#B392F0;">post</span><span style="color:#E1E4E8;">(refreshUrl, {</span></span>
<span class="line"><span style="color:#E1E4E8;">          refresh_token: localStorage.</span><span style="color:#B392F0;">getItem</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;refresh&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">        })</span></span>
<span class="line"><span style="color:#E1E4E8;">        .</span><span style="color:#B392F0;">then</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">res</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (res?.data?.code </span><span style="color:#F97583;">===</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            localStorage.</span><span style="color:#B392F0;">setItem</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;token&#39;</span><span style="color:#E1E4E8;">, res.data?.data?.access_token)</span></span>
<span class="line"><span style="color:#E1E4E8;">            localStorage.</span><span style="color:#B392F0;">setItem</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;refresh&#39;</span><span style="color:#E1E4E8;">, res.data?.data?.refresh_token)</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#B392F0;">resolve</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">          } </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">msg</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> res.message </span><span style="color:#F97583;">||</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">\`刷新 Token 失败: \${</span><span style="color:#E1E4E8;">res</span><span style="color:#9ECBFF;">}\`</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#B392F0;">reject</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Error</span><span style="color:#E1E4E8;">(msg))</span></span>
<span class="line"><span style="color:#E1E4E8;">          }</span></span>
<span class="line"><span style="color:#E1E4E8;">        })</span></span>
<span class="line"><span style="color:#E1E4E8;">        .</span><span style="color:#B392F0;">catch</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">err</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#B392F0;">reject</span><span style="color:#E1E4E8;">(err)</span></span>
<span class="line"><span style="color:#E1E4E8;">        })</span></span>
<span class="line"><span style="color:#E1E4E8;">    })</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">axios.interceptors.request.</span><span style="color:#B392F0;">use</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> (</span><span style="color:#FFAB70;">config</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// navigator.onLine判断是否是正常网络通信状态</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">!</span><span style="color:#E1E4E8;">navigator.onLine) </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">// message.error(&#39;未连接网络，请先连接网络再试&#39;)</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 根据环境变量加上前缀</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span></span>
<span class="line"><span style="color:#E1E4E8;">      config.url.</span><span style="color:#B392F0;">includes</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;user/userinfo&#39;</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">||</span></span>
<span class="line"><span style="color:#E1E4E8;">      config.url.</span><span style="color:#B392F0;">includes</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;user/users&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">    ) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      config.baseURL </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">    } </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">      config.baseURL </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">import</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">meta</span><span style="color:#E1E4E8;">.env.</span><span style="color:#79B8FF;">VITE_APP_BASEURL</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">!</span><span style="color:#E1E4E8;">config.url.</span><span style="color:#B392F0;">includes</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;ufileos.com&#39;</span><span style="color:#E1E4E8;">)) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">token</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> localStorage.</span><span style="color:#B392F0;">getItem</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;token&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">      config.headers </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">        Authorization: token </span><span style="color:#F97583;">?</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">\`Bearer \${</span><span style="color:#E1E4E8;">token</span><span style="color:#9ECBFF;">}\`</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> config</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> (</span><span style="color:#FFAB70;">error</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">Promise</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">reject</span><span style="color:#E1E4E8;">(error)</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">axios.interceptors.response.</span><span style="color:#B392F0;">use</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> (</span><span style="color:#FFAB70;">response</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> response</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">async</span><span style="color:#E1E4E8;"> </span><span style="color:#FFAB70;">error</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (error.response </span><span style="color:#F97583;">&amp;&amp;</span><span style="color:#E1E4E8;"> error.response.status) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">originReq</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> error.config</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 401说明token过期，需要拿到refresh-token去刷新</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (error.response.status </span><span style="color:#F97583;">===</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">401</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">token</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> localStorage.</span><span style="color:#B392F0;">getItem</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;token&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">refresh</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> localStorage.</span><span style="color:#B392F0;">getItem</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;refresh&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (refresh) {</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#F97583;">try</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">await</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">refreshToken</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">// 添加请求头 并重发</span></span>
<span class="line"><span style="color:#E1E4E8;">            originReq.headers[</span><span style="color:#9ECBFF;">&#39;Authorization&#39;</span><span style="color:#E1E4E8;">] </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> token </span><span style="color:#F97583;">?</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">\`Bearer \${</span><span style="color:#E1E4E8;">token</span><span style="color:#9ECBFF;">}\`</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">Promise</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">resolve</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">              </span><span style="color:#B392F0;">setTimeout</span><span style="color:#E1E4E8;">(() </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">resolve</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">axios</span><span style="color:#E1E4E8;">(originReq)), </span><span style="color:#79B8FF;">200</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">            )</span></span>
<span class="line"><span style="color:#E1E4E8;">          } </span><span style="color:#F97583;">catch</span><span style="color:#E1E4E8;"> (err) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            AqMessage.</span><span style="color:#B392F0;">closeAll</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#B392F0;">ToLogin</span><span style="color:#E1E4E8;">(location.origin)</span></span>
<span class="line"><span style="color:#E1E4E8;">          }</span></span>
<span class="line"><span style="color:#E1E4E8;">        } </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">            AqMessage.</span><span style="color:#B392F0;">closeAll</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#B392F0;">ToLogin</span><span style="color:#E1E4E8;">(location.origin)</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">Promise</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">reject</span><span style="color:#E1E4E8;">(error)</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">Promise</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">reject</span><span style="color:#E1E4E8;">(error)</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">default</span><span style="color:#E1E4E8;"> axios</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> axios </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;axios&#39;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { AqMessage } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;aq-ui&#39;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { ToLogin } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;./util.js&#39;</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">refreshToken</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">async</span><span style="color:#24292E;"> () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    	</span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">Promise</span><span style="color:#24292E;">((</span><span style="color:#E36209;">resolve</span><span style="color:#24292E;">, </span><span style="color:#E36209;">reject</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> refreshUrl </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;/oauth/refresh-token&#39;</span></span>
<span class="line"><span style="color:#24292E;">      axios</span></span>
<span class="line"><span style="color:#24292E;">        .</span><span style="color:#6F42C1;">post</span><span style="color:#24292E;">(refreshUrl, {</span></span>
<span class="line"><span style="color:#24292E;">          refresh_token: localStorage.</span><span style="color:#6F42C1;">getItem</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;refresh&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">        })</span></span>
<span class="line"><span style="color:#24292E;">        .</span><span style="color:#6F42C1;">then</span><span style="color:#24292E;">(</span><span style="color:#E36209;">res</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (res?.data?.code </span><span style="color:#D73A49;">===</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">            localStorage.</span><span style="color:#6F42C1;">setItem</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;token&#39;</span><span style="color:#24292E;">, res.data?.data?.access_token)</span></span>
<span class="line"><span style="color:#24292E;">            localStorage.</span><span style="color:#6F42C1;">setItem</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;refresh&#39;</span><span style="color:#24292E;">, res.data?.data?.refresh_token)</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6F42C1;">resolve</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">          } </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">msg</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> res.message </span><span style="color:#D73A49;">||</span><span style="color:#24292E;"> </span><span style="color:#032F62;">\`刷新 Token 失败: \${</span><span style="color:#24292E;">res</span><span style="color:#032F62;">}\`</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6F42C1;">reject</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Error</span><span style="color:#24292E;">(msg))</span></span>
<span class="line"><span style="color:#24292E;">          }</span></span>
<span class="line"><span style="color:#24292E;">        })</span></span>
<span class="line"><span style="color:#24292E;">        .</span><span style="color:#6F42C1;">catch</span><span style="color:#24292E;">(</span><span style="color:#E36209;">err</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#6F42C1;">reject</span><span style="color:#24292E;">(err)</span></span>
<span class="line"><span style="color:#24292E;">        })</span></span>
<span class="line"><span style="color:#24292E;">    })</span></span>
<span class="line"><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">axios.interceptors.request.</span><span style="color:#6F42C1;">use</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> (</span><span style="color:#E36209;">config</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// navigator.onLine判断是否是正常网络通信状态</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">!</span><span style="color:#24292E;">navigator.onLine) </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">// message.error(&#39;未连接网络，请先连接网络再试&#39;)</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 根据环境变量加上前缀</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span></span>
<span class="line"><span style="color:#24292E;">      config.url.</span><span style="color:#6F42C1;">includes</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;user/userinfo&#39;</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">||</span></span>
<span class="line"><span style="color:#24292E;">      config.url.</span><span style="color:#6F42C1;">includes</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;user/users&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">    ) {</span></span>
<span class="line"><span style="color:#24292E;">      config.baseURL </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;&#39;</span></span>
<span class="line"><span style="color:#24292E;">    } </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">      config.baseURL </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">import</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">meta</span><span style="color:#24292E;">.env.</span><span style="color:#005CC5;">VITE_APP_BASEURL</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">	</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">!</span><span style="color:#24292E;">config.url.</span><span style="color:#6F42C1;">includes</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;ufileos.com&#39;</span><span style="color:#24292E;">)) {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">token</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> localStorage.</span><span style="color:#6F42C1;">getItem</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;token&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">      config.headers </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">        Authorization: token </span><span style="color:#D73A49;">?</span><span style="color:#24292E;"> </span><span style="color:#032F62;">\`Bearer \${</span><span style="color:#24292E;">token</span><span style="color:#032F62;">}\`</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;&#39;</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> config</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> (</span><span style="color:#E36209;">error</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">Promise</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">reject</span><span style="color:#24292E;">(error)</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">axios.interceptors.response.</span><span style="color:#6F42C1;">use</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> (</span><span style="color:#E36209;">response</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> response</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">async</span><span style="color:#24292E;"> </span><span style="color:#E36209;">error</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (error.response </span><span style="color:#D73A49;">&amp;&amp;</span><span style="color:#24292E;"> error.response.status) {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">originReq</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> error.config</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 401说明token过期，需要拿到refresh-token去刷新</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (error.response.status </span><span style="color:#D73A49;">===</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">401</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">token</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> localStorage.</span><span style="color:#6F42C1;">getItem</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;token&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">refresh</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> localStorage.</span><span style="color:#6F42C1;">getItem</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;refresh&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (refresh) {</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#D73A49;">try</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">await</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">refreshToken</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">// 添加请求头 并重发</span></span>
<span class="line"><span style="color:#24292E;">            originReq.headers[</span><span style="color:#032F62;">&#39;Authorization&#39;</span><span style="color:#24292E;">] </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> token </span><span style="color:#D73A49;">?</span><span style="color:#24292E;"> </span><span style="color:#032F62;">\`Bearer \${</span><span style="color:#24292E;">token</span><span style="color:#032F62;">}\`</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;&#39;</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">Promise</span><span style="color:#24292E;">(</span><span style="color:#E36209;">resolve</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=&gt;</span></span>
<span class="line"><span style="color:#24292E;">              </span><span style="color:#6F42C1;">setTimeout</span><span style="color:#24292E;">(() </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">resolve</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">axios</span><span style="color:#24292E;">(originReq)), </span><span style="color:#005CC5;">200</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">            )</span></span>
<span class="line"><span style="color:#24292E;">          } </span><span style="color:#D73A49;">catch</span><span style="color:#24292E;"> (err) {</span></span>
<span class="line"><span style="color:#24292E;">            AqMessage.</span><span style="color:#6F42C1;">closeAll</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6F42C1;">ToLogin</span><span style="color:#24292E;">(location.origin)</span></span>
<span class="line"><span style="color:#24292E;">          }</span></span>
<span class="line"><span style="color:#24292E;">        } </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">            AqMessage.</span><span style="color:#6F42C1;">closeAll</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6F42C1;">ToLogin</span><span style="color:#24292E;">(location.origin)</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">Promise</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">reject</span><span style="color:#24292E;">(error)</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">Promise</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">reject</span><span style="color:#24292E;">(error)</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">default</span><span style="color:#24292E;"> axios</span></span></code></pre></div><p>基本逻辑如下： <img src="`+p+`" alt="前端请求基本逻辑"></p><h2 id="路由router配置" tabindex="-1">路由Router配置 <a class="header-anchor" href="#路由router配置" aria-label="Permalink to &quot;路由Router配置&quot;">​</a></h2><p>路由都采用了异步组件加载的方式。</p><p>同时路由元信息中的<code>bread_value</code>和<code>bread_routes</code>是设计动态面包屑相关的必要值。</p><p>路由守卫中主要做了两个拦截行为：</p><ul><li>防止用户直接在url输入工程下面的子路由跳进来***（为了避免一些错误发生，因为必须打开工程后获取很多工程的具体信息，但用户跳过了“打开工程”这一行为。）**</li><li>统一管理多页面操作的一些违规行为。</li></ul><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { createRouter, createWebHistory } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;vue-router&#39;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> NProgress </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;nprogress&#39;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { useSystemStore } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;@/store/system&#39;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { useProjectStore } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;@/store/project&#39;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { AqMessage, AqMessageBox, AqLoading } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;aq-ui&#39;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { useModelStore } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;@/store/model&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">NProgress.</span><span style="color:#B392F0;">configure</span><span style="color:#E1E4E8;">({ showSpinner: </span><span style="color:#79B8FF;">false</span><span style="color:#E1E4E8;"> })</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/* 未存在当前工程的 [router name] 白名单集合 */</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">findPaths</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> [</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">&#39;Overview&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">&#39;DataManageImages&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">&#39;DataManageImagesId&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">&#39;Project&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">&#39;ProjectCreate&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">&#39;ProjectRecycle&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">&#39;LoginRedirect&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">&#39;UserCenter&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">&#39;&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">&#39;OperationDocument&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">&#39;CompleteInfo&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">routes</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> [</span></span>
<span class="line"><span style="color:#E1E4E8;">  {</span></span>
<span class="line"><span style="color:#E1E4E8;">    path: </span><span style="color:#9ECBFF;">&#39;/overview&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    name: </span><span style="color:#9ECBFF;">&#39;Overview&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">component</span><span style="color:#E1E4E8;">: () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">import</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;../views/Overview/index.vue&#39;</span><span style="color:#E1E4E8;">),</span></span>
<span class="line"><span style="color:#E1E4E8;">    meta: {</span></span>
<span class="line"><span style="color:#E1E4E8;">      title: </span><span style="color:#9ECBFF;">&#39;总览&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      bread_value: </span><span style="color:#9ECBFF;">&#39;开发进度&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      path_routes: [</span><span style="color:#9ECBFF;">&#39;/overview&#39;</span><span style="color:#E1E4E8;">],</span></span>
<span class="line"><span style="color:#E1E4E8;">      bread_routes: [</span><span style="color:#9ECBFF;">&#39;/overview&#39;</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  {</span></span>
<span class="line"><span style="color:#E1E4E8;">    path: </span><span style="color:#9ECBFF;">&#39;/data_manage/images&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    name: </span><span style="color:#9ECBFF;">&#39;DataManageImages&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">component</span><span style="color:#E1E4E8;">: () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">import</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;../views/DataManage/index.vue&#39;</span><span style="color:#E1E4E8;">),</span></span>
<span class="line"><span style="color:#E1E4E8;">    meta: {</span></span>
<span class="line"><span style="color:#E1E4E8;">      title: </span><span style="color:#9ECBFF;">&#39;图库&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      bread_value: </span><span style="color:#9ECBFF;">&#39;图库&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      path_routes: [</span><span style="color:#9ECBFF;">&#39;/data_manage/images&#39;</span><span style="color:#E1E4E8;">],</span></span>
<span class="line"><span style="color:#E1E4E8;">      bread_routes: [</span><span style="color:#9ECBFF;">&#39;/data_manage/images&#39;</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  {</span></span>
<span class="line"><span style="color:#E1E4E8;">    path: </span><span style="color:#9ECBFF;">&#39;/data_manage/images/:id&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    name: </span><span style="color:#9ECBFF;">&#39;DataManageImagesId&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">component</span><span style="color:#E1E4E8;">: () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">import</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;../views/DataManage/images.vue&#39;</span><span style="color:#E1E4E8;">),</span></span>
<span class="line"><span style="color:#E1E4E8;">    meta: {</span></span>
<span class="line"><span style="color:#E1E4E8;">      title: </span><span style="color:#9ECBFF;">&#39;&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      bread_value: </span><span style="color:#9ECBFF;">&#39;&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      path_routes: [</span><span style="color:#9ECBFF;">&#39;/data_manage/images&#39;</span><span style="color:#E1E4E8;">],</span></span>
<span class="line"><span style="color:#E1E4E8;">      bread_routes: [</span><span style="color:#9ECBFF;">&#39;/data_manage/images&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&#39;/data_manage/images/:id&#39;</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  {</span></span>
<span class="line"><span style="color:#E1E4E8;">    path: </span><span style="color:#9ECBFF;">&#39;/project&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    name: </span><span style="color:#9ECBFF;">&#39;Project&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">component</span><span style="color:#E1E4E8;">: () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">import</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;../views/Project/index.vue&#39;</span><span style="color:#E1E4E8;">),</span></span>
<span class="line"><span style="color:#E1E4E8;">    meta: {</span></span>
<span class="line"><span style="color:#E1E4E8;">      title: </span><span style="color:#9ECBFF;">&#39;工程中心&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      bread_value: </span><span style="color:#9ECBFF;">&#39;工程中心&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      path_routes: [</span><span style="color:#9ECBFF;">&#39;/project&#39;</span><span style="color:#E1E4E8;">],</span></span>
<span class="line"><span style="color:#E1E4E8;">      bread_routes: [</span><span style="color:#9ECBFF;">&#39;/project&#39;</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  {</span></span>
<span class="line"><span style="color:#E1E4E8;">    path: </span><span style="color:#9ECBFF;">&#39;/project/:projectId&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    name: </span><span style="color:#9ECBFF;">&#39;ProjectID&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">component</span><span style="color:#E1E4E8;">: () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">import</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;../views/Project/id.vue&#39;</span><span style="color:#E1E4E8;">),</span></span>
<span class="line"><span style="color:#E1E4E8;">    meta: {</span></span>
<span class="line"><span style="color:#E1E4E8;">      title: </span><span style="color:#9ECBFF;">&#39;工程&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      path_routes: [</span><span style="color:#9ECBFF;">&#39;/project&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&#39;/project/&#39;</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  {</span></span>
<span class="line"><span style="color:#E1E4E8;">    path: </span><span style="color:#9ECBFF;">&#39;/project/create&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    name: </span><span style="color:#9ECBFF;">&#39;ProjectCreate&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">component</span><span style="color:#E1E4E8;">: () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">import</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;../views/Project/create.vue&#39;</span><span style="color:#E1E4E8;">),</span></span>
<span class="line"><span style="color:#E1E4E8;">    meta: {</span></span>
<span class="line"><span style="color:#E1E4E8;">      title: </span><span style="color:#9ECBFF;">&#39;新建工程&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      bread_value: </span><span style="color:#9ECBFF;">&#39;新建工程&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      path_routes: [</span><span style="color:#9ECBFF;">&#39;/project&#39;</span><span style="color:#E1E4E8;">],</span></span>
<span class="line"><span style="color:#E1E4E8;">      bread_routes: [</span><span style="color:#9ECBFF;">&#39;/project&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&#39;/project/create&#39;</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  {</span></span>
<span class="line"><span style="color:#E1E4E8;">    path: </span><span style="color:#9ECBFF;">&#39;/project/recycle&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    name: </span><span style="color:#9ECBFF;">&#39;ProjectRecycle&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">component</span><span style="color:#E1E4E8;">: () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">import</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;../views/Project/recycle.vue&#39;</span><span style="color:#E1E4E8;">),</span></span>
<span class="line"><span style="color:#E1E4E8;">    meta: {</span></span>
<span class="line"><span style="color:#E1E4E8;">      title: </span><span style="color:#9ECBFF;">&#39;回收站&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      bread_value: </span><span style="color:#9ECBFF;">&#39;回收站&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      path_routes: [</span><span style="color:#9ECBFF;">&#39;/project&#39;</span><span style="color:#E1E4E8;">],</span></span>
<span class="line"><span style="color:#E1E4E8;">      bread_routes: [</span><span style="color:#9ECBFF;">&#39;/project&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&#39;/project/recycle&#39;</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  {</span></span>
<span class="line"><span style="color:#E1E4E8;">    path: </span><span style="color:#9ECBFF;">&#39;/project/preprocessing&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    name: </span><span style="color:#9ECBFF;">&#39;Preprocessing&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">component</span><span style="color:#E1E4E8;">: () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">import</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;../views/Project/Preprocessing/index.vue&#39;</span><span style="color:#E1E4E8;">),</span></span>
<span class="line"><span style="color:#E1E4E8;">    meta: {</span></span>
<span class="line"><span style="color:#E1E4E8;">      title: </span><span style="color:#9ECBFF;">&#39;前置处理&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      bread_value: </span><span style="color:#9ECBFF;">&#39;前置处理&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      path_routes: [</span><span style="color:#9ECBFF;">&#39;/project&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&#39;/project/preprocessing&#39;</span><span style="color:#E1E4E8;">],</span></span>
<span class="line"><span style="color:#E1E4E8;">      bread_routes: [</span><span style="color:#9ECBFF;">&#39;/project/preprocessing&#39;</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  {</span></span>
<span class="line"><span style="color:#E1E4E8;">    path: </span><span style="color:#9ECBFF;">&#39;/project/image_annotation&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    name: </span><span style="color:#9ECBFF;">&#39;ImageAnnotation&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">component</span><span style="color:#E1E4E8;">: () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">import</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;../views/Project/ImageAnnotation/index.vue&#39;</span><span style="color:#E1E4E8;">),</span></span>
<span class="line"><span style="color:#E1E4E8;">    meta: {</span></span>
<span class="line"><span style="color:#E1E4E8;">      title: </span><span style="color:#9ECBFF;">&#39;在线标注&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      bread_value: </span><span style="color:#9ECBFF;">&#39;在线标注&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      path_routes: [</span><span style="color:#9ECBFF;">&#39;/project&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&#39;/project/image_annotation&#39;</span><span style="color:#E1E4E8;">],</span></span>
<span class="line"><span style="color:#E1E4E8;">      bread_routes: [</span><span style="color:#9ECBFF;">&#39;/project/image_annotation&#39;</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  {</span></span>
<span class="line"><span style="color:#E1E4E8;">    path: </span><span style="color:#9ECBFF;">&#39;/project/model_generate&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    name: </span><span style="color:#9ECBFF;">&#39;ModelGenerate&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">component</span><span style="color:#E1E4E8;">: () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">import</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;../views/Project/ModelGenerate/index.vue&#39;</span><span style="color:#E1E4E8;">),</span></span>
<span class="line"><span style="color:#E1E4E8;">    meta: {</span></span>
<span class="line"><span style="color:#E1E4E8;">      title: </span><span style="color:#9ECBFF;">&#39;模型生成&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      bread_value: </span><span style="color:#9ECBFF;">&#39;模型生成&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      path_routes: [</span><span style="color:#9ECBFF;">&#39;/project&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&#39;/project/model_generate&#39;</span><span style="color:#E1E4E8;">],</span></span>
<span class="line"><span style="color:#E1E4E8;">      bread_routes: [</span><span style="color:#9ECBFF;">&#39;/project/model_generate&#39;</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">    },</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">beforeEnter</span><span style="color:#E1E4E8;">: (</span><span style="color:#FFAB70;">to</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">from</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">next</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">modelGenerateBeforeEnter</span><span style="color:#E1E4E8;">(to, from, next)</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  {</span></span>
<span class="line"><span style="color:#E1E4E8;">    path: </span><span style="color:#9ECBFF;">&#39;/project/model_evaluation&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    name: </span><span style="color:#9ECBFF;">&#39;ModelEvaluation&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">component</span><span style="color:#E1E4E8;">: () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">import</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;../views/Project/ModelEvaluation/index.vue&#39;</span><span style="color:#E1E4E8;">),</span></span>
<span class="line"><span style="color:#E1E4E8;">    meta: {</span></span>
<span class="line"><span style="color:#E1E4E8;">      title: </span><span style="color:#9ECBFF;">&#39;模型评估&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      bread_value: </span><span style="color:#9ECBFF;">&#39;模型评估&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      path_routes: [</span><span style="color:#9ECBFF;">&#39;/project&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&#39;/project/model_evaluation&#39;</span><span style="color:#E1E4E8;">],</span></span>
<span class="line"><span style="color:#E1E4E8;">      bread_routes: [</span><span style="color:#9ECBFF;">&#39;/project/model_evaluation&#39;</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  {</span></span>
<span class="line"><span style="color:#E1E4E8;">    path: </span><span style="color:#9ECBFF;">&#39;/project/model_validate&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    name: </span><span style="color:#9ECBFF;">&#39;ModelValidate&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">component</span><span style="color:#E1E4E8;">: () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">import</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;../views/Project/ModelValidate/index.vue&#39;</span><span style="color:#E1E4E8;">),</span></span>
<span class="line"><span style="color:#E1E4E8;">    meta: {</span></span>
<span class="line"><span style="color:#E1E4E8;">      title: </span><span style="color:#9ECBFF;">&#39;模型验证&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      bread_value: </span><span style="color:#9ECBFF;">&#39;模型验证&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      path_routes: [</span><span style="color:#9ECBFF;">&#39;/project&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&#39;/project/model_validate&#39;</span><span style="color:#E1E4E8;">],</span></span>
<span class="line"><span style="color:#E1E4E8;">      bread_routes: [</span><span style="color:#9ECBFF;">&#39;/project/model_validate&#39;</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  {</span></span>
<span class="line"><span style="color:#E1E4E8;">    path: </span><span style="color:#9ECBFF;">&#39;/project/model_validate/validate_result&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    name: </span><span style="color:#9ECBFF;">&#39;ValidateResult&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">component</span><span style="color:#E1E4E8;">: () </span><span style="color:#F97583;">=&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">import</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#9ECBFF;">&#39;/src/views/Project/ModelValidate/components/ValidateResult/index.vue&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">      ),</span></span>
<span class="line"><span style="color:#E1E4E8;">    meta: {</span></span>
<span class="line"><span style="color:#E1E4E8;">      title: </span><span style="color:#9ECBFF;">&#39;&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      bread_value: </span><span style="color:#9ECBFF;">&#39;默认&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      path_routes: [</span><span style="color:#9ECBFF;">&#39;/project&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&#39;/project/model_validate&#39;</span><span style="color:#E1E4E8;">],</span></span>
<span class="line"><span style="color:#E1E4E8;">      bread_routes: [</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#9ECBFF;">&#39;/project/model_validate&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#9ECBFF;">&#39;/project/model_validate/validate_result&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">      ]</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  {</span></span>
<span class="line"><span style="color:#E1E4E8;">    path: </span><span style="color:#9ECBFF;">&#39;/project/project_deploy&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    name: </span><span style="color:#9ECBFF;">&#39;ProjectDeploy&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">component</span><span style="color:#E1E4E8;">: () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">import</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;../views/Project/ProjectDeploy/index.vue&#39;</span><span style="color:#E1E4E8;">),</span></span>
<span class="line"><span style="color:#E1E4E8;">    meta: {</span></span>
<span class="line"><span style="color:#E1E4E8;">      title: </span><span style="color:#9ECBFF;">&#39;工程部署&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      bread_value: </span><span style="color:#9ECBFF;">&#39;工程部署&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      path_routes: [</span><span style="color:#9ECBFF;">&#39;/project&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&#39;/project/project_deploy&#39;</span><span style="color:#E1E4E8;">],</span></span>
<span class="line"><span style="color:#E1E4E8;">      bread_routes: [</span><span style="color:#9ECBFF;">&#39;/project/project_deploy&#39;</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  {</span></span>
<span class="line"><span style="color:#E1E4E8;">    path: </span><span style="color:#9ECBFF;">&#39;/operation_document&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    name: </span><span style="color:#9ECBFF;">&#39;OperationDocument&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">component</span><span style="color:#E1E4E8;">: () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">import</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;../views/OperationDocument/index.vue&#39;</span><span style="color:#E1E4E8;">),</span></span>
<span class="line"><span style="color:#E1E4E8;">    meta: {</span></span>
<span class="line"><span style="color:#E1E4E8;">      title: </span><span style="color:#9ECBFF;">&#39;操作文档&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      noLayerSide: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      noLayerHeader: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      path_routes: [</span><span style="color:#9ECBFF;">&#39;/operation_document&#39;</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  {</span></span>
<span class="line"><span style="color:#E1E4E8;">    path: </span><span style="color:#9ECBFF;">&#39;/user_center&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    name: </span><span style="color:#9ECBFF;">&#39;UserCenter&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">component</span><span style="color:#E1E4E8;">: () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">import</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;../views/UserCenter/index.vue&#39;</span><span style="color:#E1E4E8;">),</span></span>
<span class="line"><span style="color:#E1E4E8;">    meta: {</span></span>
<span class="line"><span style="color:#E1E4E8;">      noLayerSide: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      title: </span><span style="color:#9ECBFF;">&#39;用户中心&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      bread_value: </span><span style="color:#9ECBFF;">&#39;个人中心&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      bread_routes: [</span><span style="color:#9ECBFF;">&#39;/user_center&#39;</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">    },</span></span>
<span class="line"><span style="color:#E1E4E8;">    children: [</span></span>
<span class="line"><span style="color:#E1E4E8;">      {</span></span>
<span class="line"><span style="color:#E1E4E8;">        path: </span><span style="color:#9ECBFF;">&#39;complete_info&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        name: </span><span style="color:#9ECBFF;">&#39;CompleteInfo&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">component</span><span style="color:#E1E4E8;">: () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">import</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;../views/UserCenter/completeInfo.vue&#39;</span><span style="color:#E1E4E8;">),</span></span>
<span class="line"><span style="color:#E1E4E8;">        meta: {</span></span>
<span class="line"><span style="color:#E1E4E8;">          hiddenFather: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">          bread_value: </span><span style="color:#9ECBFF;">&#39;完善信息&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">          bread_routes: [</span><span style="color:#9ECBFF;">&#39;/user_center&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&#39;/user_center/complete_info&#39;</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">    ]</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  {</span></span>
<span class="line"><span style="color:#E1E4E8;">    path: </span><span style="color:#9ECBFF;">&#39;/login-redirect&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    name: </span><span style="color:#9ECBFF;">&#39;LoginRedirect&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">component</span><span style="color:#E1E4E8;">: () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">import</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;../views/login-redirect.vue&#39;</span><span style="color:#E1E4E8;">),</span></span>
<span class="line"><span style="color:#E1E4E8;">    meta: {</span></span>
<span class="line"><span style="color:#E1E4E8;">      title: </span><span style="color:#9ECBFF;">&#39;转发中...&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      noLayerSide: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      noLayerHeader: </span><span style="color:#79B8FF;">true</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  {</span></span>
<span class="line"><span style="color:#E1E4E8;">    path: </span><span style="color:#9ECBFF;">&#39;/project/task-management&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    name: </span><span style="color:#9ECBFF;">&#39;TaskManagement&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">component</span><span style="color:#E1E4E8;">: () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">import</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;../views/Project/TaskManagement/index.vue&#39;</span><span style="color:#E1E4E8;">),</span></span>
<span class="line"><span style="color:#E1E4E8;">    meta: {</span></span>
<span class="line"><span style="color:#E1E4E8;">      title: </span><span style="color:#9ECBFF;">&#39;任务列表&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      bread_value: </span><span style="color:#9ECBFF;">&#39;任务列表&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      path_routes: [</span><span style="color:#9ECBFF;">&#39;/project&#39;</span><span style="color:#E1E4E8;">],</span></span>
<span class="line"><span style="color:#E1E4E8;">      bread_routes: [</span><span style="color:#9ECBFF;">&#39;/project&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&#39;/project/task-management&#39;</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  {</span></span>
<span class="line"><span style="color:#E1E4E8;">    path: </span><span style="color:#9ECBFF;">&#39;/:pathMatch(.*)&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    redirect: </span><span style="color:#9ECBFF;">&#39;/overview&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">router</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">createRouter</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">  history: </span><span style="color:#B392F0;">createWebHistory</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">import</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">meta</span><span style="color:#E1E4E8;">.env.</span><span style="color:#79B8FF;">BASE_URL</span><span style="color:#E1E4E8;">), </span><span style="color:#6A737D;">// https://vitejs.cn/guide/build.html#public-base-path</span></span>
<span class="line"><span style="color:#E1E4E8;">  routes</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">router.</span><span style="color:#B392F0;">beforeEach</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">async</span><span style="color:#E1E4E8;"> (</span><span style="color:#FFAB70;">to</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">from</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">next</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">systemStore</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">useSystemStore</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// ModelValidate ValidateResult</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (to.name </span><span style="color:#F97583;">===</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;ModelValidate&#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&amp;&amp;</span><span style="color:#E1E4E8;"> from.name </span><span style="color:#F97583;">===</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;ValidateResult&#39;</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    sessionStorage.</span><span style="color:#B392F0;">setItem</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;dontgotovalidateres&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&#39;true&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">  } </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    sessionStorage.</span><span style="color:#B392F0;">setItem</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;dontgotovalidateres&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&#39;false&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span></span>
<span class="line"><span style="color:#E1E4E8;">    sessionStorage.</span><span style="color:#B392F0;">getItem</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;isViewModules&#39;</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">&amp;&amp;</span></span>
<span class="line"><span style="color:#E1E4E8;">    sessionStorage.</span><span style="color:#B392F0;">getItem</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;isViewModules&#39;</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">===</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;y&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">  ) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (systemStore.AllSiderMenu[</span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">].pre_children) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">item</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> systemStore.AllSiderMenu[</span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">].pre_children</span></span>
<span class="line"><span style="color:#E1E4E8;">      systemStore.AllSiderMenu[</span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">].children </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> item</span></span>
<span class="line"><span style="color:#E1E4E8;">      systemStore.dynamicSiderMenu </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> [</span><span style="color:#F97583;">...</span><span style="color:#E1E4E8;">item]</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">delete</span><span style="color:#E1E4E8;"> systemStore.AllSiderMenu[</span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">].pre_children</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">name</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> sessionStorage.</span><span style="color:#B392F0;">getItem</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;project_title&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">solutionID</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> sessionStorage.</span><span style="color:#B392F0;">getItem</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;solution_id&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">    systemStore.</span><span style="color:#B392F0;">setCurProjectInfo</span><span style="color:#E1E4E8;">(name, solutionID)</span></span>
<span class="line"><span style="color:#E1E4E8;">  } </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (to.query?._m </span><span style="color:#F97583;">!==</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;guide&#39;</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">isViewModules</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> sessionStorage.</span><span style="color:#B392F0;">getItem</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;isViewModules&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">!</span><span style="color:#E1E4E8;">isViewModules) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        sessionStorage.</span><span style="color:#B392F0;">setItem</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;isViewModules&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&#39;y&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">    } </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">/* 当没有选择某个工程时，手动进入到后续的路由中的处理 */</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">!</span><span style="color:#E1E4E8;">findPaths.</span><span style="color:#B392F0;">includes</span><span style="color:#E1E4E8;">(to.name)) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">screenLoading</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> AqLoading.</span><span style="color:#B392F0;">service</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">          fullscreen: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">          text: </span><span style="color:#9ECBFF;">&#39;&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">        })</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">AqMessage</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">          type: </span><span style="color:#9ECBFF;">&#39;error&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">          duration: </span><span style="color:#79B8FF;">5000</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">          message:</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#9ECBFF;">&#39;请先选择需要操作的工程项，再继续本次操作，即将为您跳转到工程页&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">        })</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">setTimeout</span><span style="color:#E1E4E8;">(() </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">          screenLoading.</span><span style="color:#B392F0;">close</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#B392F0;">next</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;/project&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">          location.</span><span style="color:#B392F0;">replace</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;/project&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">        }, </span><span style="color:#79B8FF;">5000</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  NProgress.</span><span style="color:#B392F0;">start</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">!</span><span style="color:#E1E4E8;">to.name) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">next</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;/overview&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">    NProgress.</span><span style="color:#B392F0;">done</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">  } </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">next</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">    NProgress.</span><span style="color:#B392F0;">done</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  document.title </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">\`\${</span><span style="color:#E1E4E8;">to</span><span style="color:#9ECBFF;">.</span><span style="color:#E1E4E8;">meta</span><span style="color:#9ECBFF;">.</span><span style="color:#E1E4E8;">title</span><span style="color:#9ECBFF;">} - NexSight\`</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">router.</span><span style="color:#B392F0;">afterEach</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">async</span><span style="color:#E1E4E8;"> (</span><span style="color:#FFAB70;">to</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">from</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  NProgress.</span><span style="color:#B392F0;">done</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">systemStore</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">useSystemStore</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">projectStore</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">useProjectStore</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (to.query?._m </span><span style="color:#F97583;">===</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;guide&#39;</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (sessionStorage.</span><span style="color:#B392F0;">getItem</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;isViewCourse&#39;</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">===</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;y&#39;</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      systemStore.guideVisible </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">true</span></span>
<span class="line"><span style="color:#E1E4E8;">      systemStore.guideConfig </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> systemStore.guides_position[to.name]</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  } </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">solutionID</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> sessionStorage.</span><span style="color:#B392F0;">getItem</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;solution_id&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">isSolutionExistPath</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> [</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#9ECBFF;">&#39;ProjectID&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#9ECBFF;">&#39;ImageAnnotation&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#9ECBFF;">&#39;ModelGenerate&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#9ECBFF;">&#39;ModelEvaluation&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#9ECBFF;">&#39;ModelValidate&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#9ECBFF;">&#39;ValidateResult&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#9ECBFF;">&#39;ProjectDeploy&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">    ]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (isSolutionExistPath.</span><span style="color:#B392F0;">includes</span><span style="color:#E1E4E8;">(to.name)) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">await</span><span style="color:#E1E4E8;"> projectStore.</span><span style="color:#B392F0;">getSolutionsDetail</span><span style="color:#E1E4E8;">(solutionID).</span><span style="color:#B392F0;">then</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">        () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {},</span></span>
<span class="line"><span style="color:#E1E4E8;">        () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">          router.</span><span style="color:#B392F0;">replace</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;/project&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">          AqMessage.</span><span style="color:#B392F0;">error</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;工程已被删除，请刷新后重试&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">          sessionStorage.</span><span style="color:#B392F0;">removeItem</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;isViewModules&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">          sessionStorage.</span><span style="color:#B392F0;">removeItem</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;solution_id&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (systemStore.AllSiderMenu[</span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">].children) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">item</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> systemStore.AllSiderMenu[</span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">].children</span></span>
<span class="line"><span style="color:#E1E4E8;">            systemStore.AllSiderMenu[</span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">].pre_children </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> item</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">delete</span><span style="color:#E1E4E8;"> systemStore.AllSiderMenu[</span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">].children</span></span>
<span class="line"><span style="color:#E1E4E8;">          }</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">      )</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">setTimeout</span><span style="color:#E1E4E8;">(() </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">floatBox</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> document.</span><span style="color:#B392F0;">getElementsByClassName</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;float-6587-dbvc&#39;</span><span style="color:#E1E4E8;">)[</span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (floatBox) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      document.body.</span><span style="color:#B392F0;">removeChild</span><span style="color:#E1E4E8;">(floatBox)</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  })</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 进入模型生成前必须检查是否标签满足条件</span></span>
<span class="line"><span style="color:#F97583;">async</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">modelGenerateBeforeEnter</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">to</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">from</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">next</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">systemStore</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">useSystemStore</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">moduleType</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> systemStore.cur_module_type</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (from.fullPath </span><span style="color:#F97583;">===</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;/&#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">||</span><span style="color:#E1E4E8;"> from.query?._m </span><span style="color:#F97583;">===</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;guide&#39;</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">next</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">  } </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (to.fullPath </span><span style="color:#F97583;">===</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;/project/model_generate&#39;</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">solution_id</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> sessionStorage.</span><span style="color:#B392F0;">getItem</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;solution_id&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">module_id</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> sessionStorage.</span><span style="color:#B392F0;">getItem</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;module_id&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">modelStore</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">useModelStore</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (solution_id </span><span style="color:#F97583;">&amp;&amp;</span><span style="color:#E1E4E8;"> module_id) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">markInfo</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">await</span><span style="color:#E1E4E8;"> modelStore.</span><span style="color:#B392F0;">getModelMarkInfo</span><span style="color:#E1E4E8;">(solution_id, module_id)</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">unqualifiedMarkTags</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> markInfo.data.tags.</span><span style="color:#B392F0;">filter</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#FFAB70;">markTag</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> markTag.marked_count </span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;"> markTag.min_marked_num</span></span>
<span class="line"><span style="color:#E1E4E8;">      )</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (unqualifiedMarkTags.</span><span style="color:#79B8FF;">length</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">===</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&amp;&amp;</span><span style="color:#E1E4E8;"> moduleType </span><span style="color:#F97583;">!==</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;ocr&#39;</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">next</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">      } </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (markInfo.data.marked_count </span><span style="color:#F97583;">&gt;=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">10</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&amp;&amp;</span><span style="color:#E1E4E8;"> moduleType </span><span style="color:#F97583;">===</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;ocr&#39;</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">next</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">      } </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> markText </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">        unqualifiedMarkTags.</span><span style="color:#B392F0;">forEach</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">tag</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">          markText </span><span style="color:#F97583;">+=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">\` “&lt;span style=&quot;color:#2f3fe9&quot;&gt;\${</span><span style="color:#E1E4E8;">tag</span><span style="color:#9ECBFF;">.</span><span style="color:#E1E4E8;">title</span><span style="color:#9ECBFF;">}&lt;/span&gt;” \`</span></span>
<span class="line"><span style="color:#E1E4E8;">        })</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">ocrText</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#9ECBFF;">&#39;至少需要10张已标注图片以开启训练，是否继续前往模型生成页？&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">otherText</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#9ECBFF;">\`标签\${</span><span style="color:#E1E4E8;">markText</span><span style="color:#9ECBFF;">}标注数量不足，</span></span>
<span class="line"><span style="color:#9ECBFF;">        每类标签图片数量至少需要10张以开启训练，</span></span>
<span class="line"><span style="color:#9ECBFF;">				是否继续前往模型生成页？\`</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">markPrgressText</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> moduleType </span><span style="color:#F97583;">===</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;ocr&#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">?</span><span style="color:#E1E4E8;"> ocrText </span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> otherText</span></span>
<span class="line"><span style="color:#E1E4E8;">        AqMessageBox.</span><span style="color:#B392F0;">confirm</span><span style="color:#E1E4E8;">(markPrgressText, </span><span style="color:#9ECBFF;">&#39;标注进度&#39;</span><span style="color:#E1E4E8;">, {</span></span>
<span class="line"><span style="color:#E1E4E8;">          confirmButtonText: </span><span style="color:#9ECBFF;">&#39;确认&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">          cancelButtonText: </span><span style="color:#9ECBFF;">&#39;取消&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">          dangerouslyUseHTMLString: </span><span style="color:#79B8FF;">true</span></span>
<span class="line"><span style="color:#E1E4E8;">        })</span></span>
<span class="line"><span style="color:#E1E4E8;">          .</span><span style="color:#B392F0;">then</span><span style="color:#E1E4E8;">(() </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#B392F0;">next</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">          })</span></span>
<span class="line"><span style="color:#E1E4E8;">          .</span><span style="color:#B392F0;">catch</span><span style="color:#E1E4E8;">(() </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {})</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">default</span><span style="color:#E1E4E8;"> router</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { createRouter, createWebHistory } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;vue-router&#39;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> NProgress </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;nprogress&#39;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { useSystemStore } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;@/store/system&#39;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { useProjectStore } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;@/store/project&#39;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { AqMessage, AqMessageBox, AqLoading } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;aq-ui&#39;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { useModelStore } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;@/store/model&#39;</span></span>
<span class="line"><span style="color:#24292E;">NProgress.</span><span style="color:#6F42C1;">configure</span><span style="color:#24292E;">({ showSpinner: </span><span style="color:#005CC5;">false</span><span style="color:#24292E;"> })</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/* 未存在当前工程的 [router name] 白名单集合 */</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">findPaths</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> [</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">&#39;Overview&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">&#39;DataManageImages&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">&#39;DataManageImagesId&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">&#39;Project&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">&#39;ProjectCreate&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">&#39;ProjectRecycle&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">&#39;LoginRedirect&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">&#39;UserCenter&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">&#39;&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">&#39;OperationDocument&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">&#39;CompleteInfo&#39;</span></span>
<span class="line"><span style="color:#24292E;">]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">routes</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> [</span></span>
<span class="line"><span style="color:#24292E;">  {</span></span>
<span class="line"><span style="color:#24292E;">    path: </span><span style="color:#032F62;">&#39;/overview&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    name: </span><span style="color:#032F62;">&#39;Overview&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">component</span><span style="color:#24292E;">: () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">import</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;../views/Overview/index.vue&#39;</span><span style="color:#24292E;">),</span></span>
<span class="line"><span style="color:#24292E;">    meta: {</span></span>
<span class="line"><span style="color:#24292E;">      title: </span><span style="color:#032F62;">&#39;总览&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      bread_value: </span><span style="color:#032F62;">&#39;开发进度&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      path_routes: [</span><span style="color:#032F62;">&#39;/overview&#39;</span><span style="color:#24292E;">],</span></span>
<span class="line"><span style="color:#24292E;">      bread_routes: [</span><span style="color:#032F62;">&#39;/overview&#39;</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  {</span></span>
<span class="line"><span style="color:#24292E;">    path: </span><span style="color:#032F62;">&#39;/data_manage/images&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    name: </span><span style="color:#032F62;">&#39;DataManageImages&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">component</span><span style="color:#24292E;">: () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">import</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;../views/DataManage/index.vue&#39;</span><span style="color:#24292E;">),</span></span>
<span class="line"><span style="color:#24292E;">    meta: {</span></span>
<span class="line"><span style="color:#24292E;">      title: </span><span style="color:#032F62;">&#39;图库&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      bread_value: </span><span style="color:#032F62;">&#39;图库&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      path_routes: [</span><span style="color:#032F62;">&#39;/data_manage/images&#39;</span><span style="color:#24292E;">],</span></span>
<span class="line"><span style="color:#24292E;">      bread_routes: [</span><span style="color:#032F62;">&#39;/data_manage/images&#39;</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  {</span></span>
<span class="line"><span style="color:#24292E;">    path: </span><span style="color:#032F62;">&#39;/data_manage/images/:id&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    name: </span><span style="color:#032F62;">&#39;DataManageImagesId&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">component</span><span style="color:#24292E;">: () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">import</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;../views/DataManage/images.vue&#39;</span><span style="color:#24292E;">),</span></span>
<span class="line"><span style="color:#24292E;">    meta: {</span></span>
<span class="line"><span style="color:#24292E;">      title: </span><span style="color:#032F62;">&#39;&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      bread_value: </span><span style="color:#032F62;">&#39;&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      path_routes: [</span><span style="color:#032F62;">&#39;/data_manage/images&#39;</span><span style="color:#24292E;">],</span></span>
<span class="line"><span style="color:#24292E;">      bread_routes: [</span><span style="color:#032F62;">&#39;/data_manage/images&#39;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&#39;/data_manage/images/:id&#39;</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  {</span></span>
<span class="line"><span style="color:#24292E;">    path: </span><span style="color:#032F62;">&#39;/project&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    name: </span><span style="color:#032F62;">&#39;Project&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">component</span><span style="color:#24292E;">: () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">import</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;../views/Project/index.vue&#39;</span><span style="color:#24292E;">),</span></span>
<span class="line"><span style="color:#24292E;">    meta: {</span></span>
<span class="line"><span style="color:#24292E;">      title: </span><span style="color:#032F62;">&#39;工程中心&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      bread_value: </span><span style="color:#032F62;">&#39;工程中心&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      path_routes: [</span><span style="color:#032F62;">&#39;/project&#39;</span><span style="color:#24292E;">],</span></span>
<span class="line"><span style="color:#24292E;">      bread_routes: [</span><span style="color:#032F62;">&#39;/project&#39;</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  {</span></span>
<span class="line"><span style="color:#24292E;">    path: </span><span style="color:#032F62;">&#39;/project/:projectId&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    name: </span><span style="color:#032F62;">&#39;ProjectID&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">component</span><span style="color:#24292E;">: () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">import</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;../views/Project/id.vue&#39;</span><span style="color:#24292E;">),</span></span>
<span class="line"><span style="color:#24292E;">    meta: {</span></span>
<span class="line"><span style="color:#24292E;">      title: </span><span style="color:#032F62;">&#39;工程&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      path_routes: [</span><span style="color:#032F62;">&#39;/project&#39;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&#39;/project/&#39;</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  {</span></span>
<span class="line"><span style="color:#24292E;">    path: </span><span style="color:#032F62;">&#39;/project/create&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    name: </span><span style="color:#032F62;">&#39;ProjectCreate&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">component</span><span style="color:#24292E;">: () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">import</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;../views/Project/create.vue&#39;</span><span style="color:#24292E;">),</span></span>
<span class="line"><span style="color:#24292E;">    meta: {</span></span>
<span class="line"><span style="color:#24292E;">      title: </span><span style="color:#032F62;">&#39;新建工程&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      bread_value: </span><span style="color:#032F62;">&#39;新建工程&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      path_routes: [</span><span style="color:#032F62;">&#39;/project&#39;</span><span style="color:#24292E;">],</span></span>
<span class="line"><span style="color:#24292E;">      bread_routes: [</span><span style="color:#032F62;">&#39;/project&#39;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&#39;/project/create&#39;</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  {</span></span>
<span class="line"><span style="color:#24292E;">    path: </span><span style="color:#032F62;">&#39;/project/recycle&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    name: </span><span style="color:#032F62;">&#39;ProjectRecycle&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">component</span><span style="color:#24292E;">: () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">import</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;../views/Project/recycle.vue&#39;</span><span style="color:#24292E;">),</span></span>
<span class="line"><span style="color:#24292E;">    meta: {</span></span>
<span class="line"><span style="color:#24292E;">      title: </span><span style="color:#032F62;">&#39;回收站&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      bread_value: </span><span style="color:#032F62;">&#39;回收站&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      path_routes: [</span><span style="color:#032F62;">&#39;/project&#39;</span><span style="color:#24292E;">],</span></span>
<span class="line"><span style="color:#24292E;">      bread_routes: [</span><span style="color:#032F62;">&#39;/project&#39;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&#39;/project/recycle&#39;</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  {</span></span>
<span class="line"><span style="color:#24292E;">    path: </span><span style="color:#032F62;">&#39;/project/preprocessing&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    name: </span><span style="color:#032F62;">&#39;Preprocessing&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">component</span><span style="color:#24292E;">: () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">import</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;../views/Project/Preprocessing/index.vue&#39;</span><span style="color:#24292E;">),</span></span>
<span class="line"><span style="color:#24292E;">    meta: {</span></span>
<span class="line"><span style="color:#24292E;">      title: </span><span style="color:#032F62;">&#39;前置处理&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      bread_value: </span><span style="color:#032F62;">&#39;前置处理&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      path_routes: [</span><span style="color:#032F62;">&#39;/project&#39;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&#39;/project/preprocessing&#39;</span><span style="color:#24292E;">],</span></span>
<span class="line"><span style="color:#24292E;">      bread_routes: [</span><span style="color:#032F62;">&#39;/project/preprocessing&#39;</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  {</span></span>
<span class="line"><span style="color:#24292E;">    path: </span><span style="color:#032F62;">&#39;/project/image_annotation&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    name: </span><span style="color:#032F62;">&#39;ImageAnnotation&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">component</span><span style="color:#24292E;">: () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">import</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;../views/Project/ImageAnnotation/index.vue&#39;</span><span style="color:#24292E;">),</span></span>
<span class="line"><span style="color:#24292E;">    meta: {</span></span>
<span class="line"><span style="color:#24292E;">      title: </span><span style="color:#032F62;">&#39;在线标注&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      bread_value: </span><span style="color:#032F62;">&#39;在线标注&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      path_routes: [</span><span style="color:#032F62;">&#39;/project&#39;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&#39;/project/image_annotation&#39;</span><span style="color:#24292E;">],</span></span>
<span class="line"><span style="color:#24292E;">      bread_routes: [</span><span style="color:#032F62;">&#39;/project/image_annotation&#39;</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  {</span></span>
<span class="line"><span style="color:#24292E;">    path: </span><span style="color:#032F62;">&#39;/project/model_generate&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    name: </span><span style="color:#032F62;">&#39;ModelGenerate&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">component</span><span style="color:#24292E;">: () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">import</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;../views/Project/ModelGenerate/index.vue&#39;</span><span style="color:#24292E;">),</span></span>
<span class="line"><span style="color:#24292E;">    meta: {</span></span>
<span class="line"><span style="color:#24292E;">      title: </span><span style="color:#032F62;">&#39;模型生成&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      bread_value: </span><span style="color:#032F62;">&#39;模型生成&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      path_routes: [</span><span style="color:#032F62;">&#39;/project&#39;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&#39;/project/model_generate&#39;</span><span style="color:#24292E;">],</span></span>
<span class="line"><span style="color:#24292E;">      bread_routes: [</span><span style="color:#032F62;">&#39;/project/model_generate&#39;</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">beforeEnter</span><span style="color:#24292E;">: (</span><span style="color:#E36209;">to</span><span style="color:#24292E;">, </span><span style="color:#E36209;">from</span><span style="color:#24292E;">, </span><span style="color:#E36209;">next</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">modelGenerateBeforeEnter</span><span style="color:#24292E;">(to, from, next)</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  {</span></span>
<span class="line"><span style="color:#24292E;">    path: </span><span style="color:#032F62;">&#39;/project/model_evaluation&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    name: </span><span style="color:#032F62;">&#39;ModelEvaluation&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">component</span><span style="color:#24292E;">: () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">import</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;../views/Project/ModelEvaluation/index.vue&#39;</span><span style="color:#24292E;">),</span></span>
<span class="line"><span style="color:#24292E;">    meta: {</span></span>
<span class="line"><span style="color:#24292E;">      title: </span><span style="color:#032F62;">&#39;模型评估&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      bread_value: </span><span style="color:#032F62;">&#39;模型评估&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      path_routes: [</span><span style="color:#032F62;">&#39;/project&#39;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&#39;/project/model_evaluation&#39;</span><span style="color:#24292E;">],</span></span>
<span class="line"><span style="color:#24292E;">      bread_routes: [</span><span style="color:#032F62;">&#39;/project/model_evaluation&#39;</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  {</span></span>
<span class="line"><span style="color:#24292E;">    path: </span><span style="color:#032F62;">&#39;/project/model_validate&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    name: </span><span style="color:#032F62;">&#39;ModelValidate&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">component</span><span style="color:#24292E;">: () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">import</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;../views/Project/ModelValidate/index.vue&#39;</span><span style="color:#24292E;">),</span></span>
<span class="line"><span style="color:#24292E;">    meta: {</span></span>
<span class="line"><span style="color:#24292E;">      title: </span><span style="color:#032F62;">&#39;模型验证&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      bread_value: </span><span style="color:#032F62;">&#39;模型验证&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      path_routes: [</span><span style="color:#032F62;">&#39;/project&#39;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&#39;/project/model_validate&#39;</span><span style="color:#24292E;">],</span></span>
<span class="line"><span style="color:#24292E;">      bread_routes: [</span><span style="color:#032F62;">&#39;/project/model_validate&#39;</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  {</span></span>
<span class="line"><span style="color:#24292E;">    path: </span><span style="color:#032F62;">&#39;/project/model_validate/validate_result&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    name: </span><span style="color:#032F62;">&#39;ValidateResult&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">component</span><span style="color:#24292E;">: () </span><span style="color:#D73A49;">=&gt;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">import</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#032F62;">&#39;/src/views/Project/ModelValidate/components/ValidateResult/index.vue&#39;</span></span>
<span class="line"><span style="color:#24292E;">      ),</span></span>
<span class="line"><span style="color:#24292E;">    meta: {</span></span>
<span class="line"><span style="color:#24292E;">      title: </span><span style="color:#032F62;">&#39;&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      bread_value: </span><span style="color:#032F62;">&#39;默认&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      path_routes: [</span><span style="color:#032F62;">&#39;/project&#39;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&#39;/project/model_validate&#39;</span><span style="color:#24292E;">],</span></span>
<span class="line"><span style="color:#24292E;">      bread_routes: [</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#032F62;">&#39;/project/model_validate&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#032F62;">&#39;/project/model_validate/validate_result&#39;</span></span>
<span class="line"><span style="color:#24292E;">      ]</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  {</span></span>
<span class="line"><span style="color:#24292E;">    path: </span><span style="color:#032F62;">&#39;/project/project_deploy&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    name: </span><span style="color:#032F62;">&#39;ProjectDeploy&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">component</span><span style="color:#24292E;">: () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">import</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;../views/Project/ProjectDeploy/index.vue&#39;</span><span style="color:#24292E;">),</span></span>
<span class="line"><span style="color:#24292E;">    meta: {</span></span>
<span class="line"><span style="color:#24292E;">      title: </span><span style="color:#032F62;">&#39;工程部署&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      bread_value: </span><span style="color:#032F62;">&#39;工程部署&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      path_routes: [</span><span style="color:#032F62;">&#39;/project&#39;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&#39;/project/project_deploy&#39;</span><span style="color:#24292E;">],</span></span>
<span class="line"><span style="color:#24292E;">      bread_routes: [</span><span style="color:#032F62;">&#39;/project/project_deploy&#39;</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  {</span></span>
<span class="line"><span style="color:#24292E;">    path: </span><span style="color:#032F62;">&#39;/operation_document&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    name: </span><span style="color:#032F62;">&#39;OperationDocument&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">component</span><span style="color:#24292E;">: () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">import</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;../views/OperationDocument/index.vue&#39;</span><span style="color:#24292E;">),</span></span>
<span class="line"><span style="color:#24292E;">    meta: {</span></span>
<span class="line"><span style="color:#24292E;">      title: </span><span style="color:#032F62;">&#39;操作文档&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      noLayerSide: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      noLayerHeader: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      path_routes: [</span><span style="color:#032F62;">&#39;/operation_document&#39;</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  {</span></span>
<span class="line"><span style="color:#24292E;">    path: </span><span style="color:#032F62;">&#39;/user_center&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    name: </span><span style="color:#032F62;">&#39;UserCenter&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">component</span><span style="color:#24292E;">: () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">import</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;../views/UserCenter/index.vue&#39;</span><span style="color:#24292E;">),</span></span>
<span class="line"><span style="color:#24292E;">    meta: {</span></span>
<span class="line"><span style="color:#24292E;">      noLayerSide: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      title: </span><span style="color:#032F62;">&#39;用户中心&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      bread_value: </span><span style="color:#032F62;">&#39;个人中心&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      bread_routes: [</span><span style="color:#032F62;">&#39;/user_center&#39;</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#24292E;">    children: [</span></span>
<span class="line"><span style="color:#24292E;">      {</span></span>
<span class="line"><span style="color:#24292E;">        path: </span><span style="color:#032F62;">&#39;complete_info&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        name: </span><span style="color:#032F62;">&#39;CompleteInfo&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">component</span><span style="color:#24292E;">: () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">import</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;../views/UserCenter/completeInfo.vue&#39;</span><span style="color:#24292E;">),</span></span>
<span class="line"><span style="color:#24292E;">        meta: {</span></span>
<span class="line"><span style="color:#24292E;">          hiddenFather: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">          bread_value: </span><span style="color:#032F62;">&#39;完善信息&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">          bread_routes: [</span><span style="color:#032F62;">&#39;/user_center&#39;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&#39;/user_center/complete_info&#39;</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">    ]</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  {</span></span>
<span class="line"><span style="color:#24292E;">    path: </span><span style="color:#032F62;">&#39;/login-redirect&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    name: </span><span style="color:#032F62;">&#39;LoginRedirect&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">component</span><span style="color:#24292E;">: () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">import</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;../views/login-redirect.vue&#39;</span><span style="color:#24292E;">),</span></span>
<span class="line"><span style="color:#24292E;">    meta: {</span></span>
<span class="line"><span style="color:#24292E;">      title: </span><span style="color:#032F62;">&#39;转发中...&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      noLayerSide: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      noLayerHeader: </span><span style="color:#005CC5;">true</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  {</span></span>
<span class="line"><span style="color:#24292E;">    path: </span><span style="color:#032F62;">&#39;/project/task-management&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    name: </span><span style="color:#032F62;">&#39;TaskManagement&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">component</span><span style="color:#24292E;">: () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">import</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;../views/Project/TaskManagement/index.vue&#39;</span><span style="color:#24292E;">),</span></span>
<span class="line"><span style="color:#24292E;">    meta: {</span></span>
<span class="line"><span style="color:#24292E;">      title: </span><span style="color:#032F62;">&#39;任务列表&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      bread_value: </span><span style="color:#032F62;">&#39;任务列表&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      path_routes: [</span><span style="color:#032F62;">&#39;/project&#39;</span><span style="color:#24292E;">],</span></span>
<span class="line"><span style="color:#24292E;">      bread_routes: [</span><span style="color:#032F62;">&#39;/project&#39;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&#39;/project/task-management&#39;</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  {</span></span>
<span class="line"><span style="color:#24292E;">    path: </span><span style="color:#032F62;">&#39;/:pathMatch(.*)&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    redirect: </span><span style="color:#032F62;">&#39;/overview&#39;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">router</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">createRouter</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">  history: </span><span style="color:#6F42C1;">createWebHistory</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">import</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">meta</span><span style="color:#24292E;">.env.</span><span style="color:#005CC5;">BASE_URL</span><span style="color:#24292E;">), </span><span style="color:#6A737D;">// https://vitejs.cn/guide/build.html#public-base-path</span></span>
<span class="line"><span style="color:#24292E;">  routes</span></span>
<span class="line"><span style="color:#24292E;">})</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">router.</span><span style="color:#6F42C1;">beforeEach</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">async</span><span style="color:#24292E;"> (</span><span style="color:#E36209;">to</span><span style="color:#24292E;">, </span><span style="color:#E36209;">from</span><span style="color:#24292E;">, </span><span style="color:#E36209;">next</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">systemStore</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">useSystemStore</span><span style="color:#24292E;">()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// ModelValidate ValidateResult</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (to.name </span><span style="color:#D73A49;">===</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;ModelValidate&#39;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&amp;&amp;</span><span style="color:#24292E;"> from.name </span><span style="color:#D73A49;">===</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;ValidateResult&#39;</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">    sessionStorage.</span><span style="color:#6F42C1;">setItem</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;dontgotovalidateres&#39;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&#39;true&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">  } </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    sessionStorage.</span><span style="color:#6F42C1;">setItem</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;dontgotovalidateres&#39;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&#39;false&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span></span>
<span class="line"><span style="color:#24292E;">    sessionStorage.</span><span style="color:#6F42C1;">getItem</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;isViewModules&#39;</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">&amp;&amp;</span></span>
<span class="line"><span style="color:#24292E;">    sessionStorage.</span><span style="color:#6F42C1;">getItem</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;isViewModules&#39;</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">===</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;y&#39;</span></span>
<span class="line"><span style="color:#24292E;">  ) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (systemStore.AllSiderMenu[</span><span style="color:#005CC5;">2</span><span style="color:#24292E;">].pre_children) {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">item</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> systemStore.AllSiderMenu[</span><span style="color:#005CC5;">2</span><span style="color:#24292E;">].pre_children</span></span>
<span class="line"><span style="color:#24292E;">      systemStore.AllSiderMenu[</span><span style="color:#005CC5;">2</span><span style="color:#24292E;">].children </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> item</span></span>
<span class="line"><span style="color:#24292E;">      systemStore.dynamicSiderMenu </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> [</span><span style="color:#D73A49;">...</span><span style="color:#24292E;">item]</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">delete</span><span style="color:#24292E;"> systemStore.AllSiderMenu[</span><span style="color:#005CC5;">2</span><span style="color:#24292E;">].pre_children</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">name</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> sessionStorage.</span><span style="color:#6F42C1;">getItem</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;project_title&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">solutionID</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> sessionStorage.</span><span style="color:#6F42C1;">getItem</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;solution_id&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">    systemStore.</span><span style="color:#6F42C1;">setCurProjectInfo</span><span style="color:#24292E;">(name, solutionID)</span></span>
<span class="line"><span style="color:#24292E;">  } </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (to.query?._m </span><span style="color:#D73A49;">!==</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;guide&#39;</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">isViewModules</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> sessionStorage.</span><span style="color:#6F42C1;">getItem</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;isViewModules&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">!</span><span style="color:#24292E;">isViewModules) {</span></span>
<span class="line"><span style="color:#24292E;">        sessionStorage.</span><span style="color:#6F42C1;">setItem</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;isViewModules&#39;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&#39;y&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">    } </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">/* 当没有选择某个工程时，手动进入到后续的路由中的处理 */</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">!</span><span style="color:#24292E;">findPaths.</span><span style="color:#6F42C1;">includes</span><span style="color:#24292E;">(to.name)) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">screenLoading</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> AqLoading.</span><span style="color:#6F42C1;">service</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">          fullscreen: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">          text: </span><span style="color:#032F62;">&#39;&#39;</span></span>
<span class="line"><span style="color:#24292E;">        })</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">AqMessage</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">          type: </span><span style="color:#032F62;">&#39;error&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">          duration: </span><span style="color:#005CC5;">5000</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">          message:</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#032F62;">&#39;请先选择需要操作的工程项，再继续本次操作，即将为您跳转到工程页&#39;</span></span>
<span class="line"><span style="color:#24292E;">        })</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">setTimeout</span><span style="color:#24292E;">(() </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">          screenLoading.</span><span style="color:#6F42C1;">close</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#6F42C1;">next</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;/project&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">          location.</span><span style="color:#6F42C1;">replace</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;/project&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">        }, </span><span style="color:#005CC5;">5000</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  NProgress.</span><span style="color:#6F42C1;">start</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">!</span><span style="color:#24292E;">to.name) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">next</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;/overview&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">    NProgress.</span><span style="color:#6F42C1;">done</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">  } </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">next</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">    NProgress.</span><span style="color:#6F42C1;">done</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  document.title </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">\`\${</span><span style="color:#24292E;">to</span><span style="color:#032F62;">.</span><span style="color:#24292E;">meta</span><span style="color:#032F62;">.</span><span style="color:#24292E;">title</span><span style="color:#032F62;">} - NexSight\`</span></span>
<span class="line"><span style="color:#24292E;">})</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">router.</span><span style="color:#6F42C1;">afterEach</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">async</span><span style="color:#24292E;"> (</span><span style="color:#E36209;">to</span><span style="color:#24292E;">, </span><span style="color:#E36209;">from</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  NProgress.</span><span style="color:#6F42C1;">done</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">systemStore</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">useSystemStore</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">projectStore</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">useProjectStore</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (to.query?._m </span><span style="color:#D73A49;">===</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;guide&#39;</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (sessionStorage.</span><span style="color:#6F42C1;">getItem</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;isViewCourse&#39;</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">===</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;y&#39;</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">      systemStore.guideVisible </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">true</span></span>
<span class="line"><span style="color:#24292E;">      systemStore.guideConfig </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> systemStore.guides_position[to.name]</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  } </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">solutionID</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> sessionStorage.</span><span style="color:#6F42C1;">getItem</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;solution_id&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">isSolutionExistPath</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> [</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#032F62;">&#39;ProjectID&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#032F62;">&#39;ImageAnnotation&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#032F62;">&#39;ModelGenerate&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#032F62;">&#39;ModelEvaluation&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#032F62;">&#39;ModelValidate&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#032F62;">&#39;ValidateResult&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#032F62;">&#39;ProjectDeploy&#39;</span></span>
<span class="line"><span style="color:#24292E;">    ]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (isSolutionExistPath.</span><span style="color:#6F42C1;">includes</span><span style="color:#24292E;">(to.name)) {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">await</span><span style="color:#24292E;"> projectStore.</span><span style="color:#6F42C1;">getSolutionsDetail</span><span style="color:#24292E;">(solutionID).</span><span style="color:#6F42C1;">then</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">        () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {},</span></span>
<span class="line"><span style="color:#24292E;">        () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">          router.</span><span style="color:#6F42C1;">replace</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;/project&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">          AqMessage.</span><span style="color:#6F42C1;">error</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;工程已被删除，请刷新后重试&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">          sessionStorage.</span><span style="color:#6F42C1;">removeItem</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;isViewModules&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">          sessionStorage.</span><span style="color:#6F42C1;">removeItem</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;solution_id&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (systemStore.AllSiderMenu[</span><span style="color:#005CC5;">2</span><span style="color:#24292E;">].children) {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">item</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> systemStore.AllSiderMenu[</span><span style="color:#005CC5;">2</span><span style="color:#24292E;">].children</span></span>
<span class="line"><span style="color:#24292E;">            systemStore.AllSiderMenu[</span><span style="color:#005CC5;">2</span><span style="color:#24292E;">].pre_children </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> item</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">delete</span><span style="color:#24292E;"> systemStore.AllSiderMenu[</span><span style="color:#005CC5;">2</span><span style="color:#24292E;">].children</span></span>
<span class="line"><span style="color:#24292E;">          }</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">      )</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">setTimeout</span><span style="color:#24292E;">(() </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">floatBox</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> document.</span><span style="color:#6F42C1;">getElementsByClassName</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;float-6587-dbvc&#39;</span><span style="color:#24292E;">)[</span><span style="color:#005CC5;">0</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (floatBox) {</span></span>
<span class="line"><span style="color:#24292E;">      document.body.</span><span style="color:#6F42C1;">removeChild</span><span style="color:#24292E;">(floatBox)</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  })</span></span>
<span class="line"><span style="color:#24292E;">})</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 进入模型生成前必须检查是否标签满足条件</span></span>
<span class="line"><span style="color:#D73A49;">async</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">modelGenerateBeforeEnter</span><span style="color:#24292E;">(</span><span style="color:#E36209;">to</span><span style="color:#24292E;">, </span><span style="color:#E36209;">from</span><span style="color:#24292E;">, </span><span style="color:#E36209;">next</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">systemStore</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">useSystemStore</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">moduleType</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> systemStore.cur_module_type</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (from.fullPath </span><span style="color:#D73A49;">===</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;/&#39;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">||</span><span style="color:#24292E;"> from.query?._m </span><span style="color:#D73A49;">===</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;guide&#39;</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">next</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">  } </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (to.fullPath </span><span style="color:#D73A49;">===</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;/project/model_generate&#39;</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">solution_id</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> sessionStorage.</span><span style="color:#6F42C1;">getItem</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;solution_id&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">module_id</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> sessionStorage.</span><span style="color:#6F42C1;">getItem</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;module_id&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">modelStore</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">useModelStore</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (solution_id </span><span style="color:#D73A49;">&amp;&amp;</span><span style="color:#24292E;"> module_id) {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">markInfo</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">await</span><span style="color:#24292E;"> modelStore.</span><span style="color:#6F42C1;">getModelMarkInfo</span><span style="color:#24292E;">(solution_id, module_id)</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">unqualifiedMarkTags</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> markInfo.data.tags.</span><span style="color:#6F42C1;">filter</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#E36209;">markTag</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> markTag.marked_count </span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;"> markTag.min_marked_num</span></span>
<span class="line"><span style="color:#24292E;">      )</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (unqualifiedMarkTags.</span><span style="color:#005CC5;">length</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">===</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&amp;&amp;</span><span style="color:#24292E;"> moduleType </span><span style="color:#D73A49;">!==</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;ocr&#39;</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">next</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">      } </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (markInfo.data.marked_count </span><span style="color:#D73A49;">&gt;=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">10</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&amp;&amp;</span><span style="color:#24292E;"> moduleType </span><span style="color:#D73A49;">===</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;ocr&#39;</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">next</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">      } </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> markText </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;&#39;</span></span>
<span class="line"><span style="color:#24292E;">        unqualifiedMarkTags.</span><span style="color:#6F42C1;">forEach</span><span style="color:#24292E;">(</span><span style="color:#E36209;">tag</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">          markText </span><span style="color:#D73A49;">+=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">\` “&lt;span style=&quot;color:#2f3fe9&quot;&gt;\${</span><span style="color:#24292E;">tag</span><span style="color:#032F62;">.</span><span style="color:#24292E;">title</span><span style="color:#032F62;">}&lt;/span&gt;” \`</span></span>
<span class="line"><span style="color:#24292E;">        })</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">ocrText</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#032F62;">&#39;至少需要10张已标注图片以开启训练，是否继续前往模型生成页？&#39;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">otherText</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#032F62;">\`标签\${</span><span style="color:#24292E;">markText</span><span style="color:#032F62;">}标注数量不足，</span></span>
<span class="line"><span style="color:#032F62;">        每类标签图片数量至少需要10张以开启训练，</span></span>
<span class="line"><span style="color:#032F62;">				是否继续前往模型生成页？\`</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">markPrgressText</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> moduleType </span><span style="color:#D73A49;">===</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;ocr&#39;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">?</span><span style="color:#24292E;"> ocrText </span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> otherText</span></span>
<span class="line"><span style="color:#24292E;">        AqMessageBox.</span><span style="color:#6F42C1;">confirm</span><span style="color:#24292E;">(markPrgressText, </span><span style="color:#032F62;">&#39;标注进度&#39;</span><span style="color:#24292E;">, {</span></span>
<span class="line"><span style="color:#24292E;">          confirmButtonText: </span><span style="color:#032F62;">&#39;确认&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">          cancelButtonText: </span><span style="color:#032F62;">&#39;取消&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">          dangerouslyUseHTMLString: </span><span style="color:#005CC5;">true</span></span>
<span class="line"><span style="color:#24292E;">        })</span></span>
<span class="line"><span style="color:#24292E;">          .</span><span style="color:#6F42C1;">then</span><span style="color:#24292E;">(() </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6F42C1;">next</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">          })</span></span>
<span class="line"><span style="color:#24292E;">          .</span><span style="color:#6F42C1;">catch</span><span style="color:#24292E;">(() </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {})</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">default</span><span style="color:#24292E;"> router</span></span></code></pre></div>`,20),t=[e];function c(r,E,y,i,F,m){return n(),a("div",null,t)}const C=s(o,[["render",c]]);export{u as __pageData,C as default};
