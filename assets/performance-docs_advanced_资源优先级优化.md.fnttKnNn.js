import{_ as t,c as e,o,U as s}from"./chunks/framework.PFQuerqu.js";const c="/assets/pretch.4BxLOakB.png",i="/assets/preload1.oNWKIL51.png",r="/assets/preload2.iFNw-vcx.png",m=JSON.parse('{"title":"资源优先级优化","description":"","frontmatter":{},"headers":[],"relativePath":"performance-docs/advanced/资源优先级优化.md","filePath":"performance-docs/advanced/资源优先级优化.md","lastUpdated":1710776055000}'),a={name:"performance-docs/advanced/资源优先级优化.md"},d=s('<h1 id="资源优先级优化" tabindex="-1">资源优先级优化 <a class="header-anchor" href="#资源优先级优化" aria-label="Permalink to &quot;资源优先级优化&quot;">​</a></h1><p>对于运行在浏览器中的前端应用来说，JS，CSS等各类静态资源加载的耗时，直接决定了页面的渲染速度。</p><p>对于静态资源的拉取，主要依靠的就是资源优先级提示。</p><p>资源优先级提示是浏览器平台为控制资源加载时机而设计的一系列API，主要包括：</p><ul><li>预取回 Prefetch</li><li>预加载 Preload</li><li>预连接 Preconnect</li><li>DNS预取回 DNS-Prefetch</li></ul><h2 id="prefetch" tabindex="-1">Prefetch <a class="header-anchor" href="#prefetch" aria-label="Permalink to &quot;Prefetch&quot;">​</a></h2><p>预取回用来提示浏览器在CPU和网络带宽空闲时，预先下载指定URL的JS，图片等各类资源，存储到浏览器本地缓存中，从而减少该资源文件后续加载的耗时，从而优化用户体验。</p><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>可以预取回的资源有很多：JS CSS 各种格式的图片 音频 WASM文件 字体文件 甚至HTML文件本身都可以实现预缓存</p></div><p>具体的使用方式是将<code>link</code>标签的<code>rel</code>属性设为<code>prefetch</code>，并将<code>href</code>属性设为<strong>目标资源URL</strong>，例如<code>&lt;link rel=&quot;prefetch&quot; href=&quot;https://github.com/xxxxx/xxxxx.js&quot; /&gt;</code></p><p>该标签插入DOM后，将触发一次<code>href</code>属性值对应URL的HTTP请求，并将响应保存到本地的<code>prefetch cache</code>中，但是并不会进一步解析，运行该资源。</p><p>命中预取回缓存的请求，会有明显的<code>(prefetch cache)</code>标记</p><p><img src="'+c+'" alt="image"></p><h3 id="crossorigin属性简介" tabindex="-1"><code>crossorigin</code>属性简介 <a class="header-anchor" href="#crossorigin属性简介" aria-label="Permalink to &quot;`crossorigin`属性简介&quot;">​</a></h3><p><code>crossorigin</code>属性是浏览器同源策略的相关API，用于对<code>link</code>，<code>script</code>和<code>img</code>等元素指定以何种<strong>跨域资源共享模式</strong>加载目标资源。</p><p>默认情况下，JS脚本，图片等部分静态资源不受同源策略的限制，可以从任何跨域域名加载等三方JS文件，图片文件。</p><p>这样的规则有明显的<strong>安全风险</strong>，例如：</p><ul><li>第三方JS文件可以访问第一方网站的错误上下文，从而获取内部信息</li><li>第三方资源的源服务器可以在HTTP请求过程中通过SSL握手验证，<code>cookies</code>等手段获取用户身份信息</li></ul><p>为了缓解这些安全风险，浏览器引入了可用于<code>link</code>，<code>script</code>和<code>img</code>元素的<code>crossorigin</code>属性，对于这些元素加载的资源指定3类 <strong>跨域资源共享模式</strong>，分别是：</p><ul><li>没有<code>crossorigin</code>属性：无法获取JS的错误上下文，也不会在SSL握手阶段附带Cookie等用户身份相关的信息</li><li>将<code>crossorigin</code>值设置为<code>&quot;anonymous&quot;</code>：可以访问JavaScript的错误上下文，但在请求过程中的SSL握手阶段不会携带Cookies或其他用户凭证</li><li>将<code>crossorigin</code>值设置为<code>&quot;use-credentials&quot;</code>：既可以访问JS的错误上下文，也可以在请求过程中的SSL握手阶段携带Cookies或用户凭证</li></ul><p>此外，Chrome浏览器的<strong>HTTP缓存</strong>以及相应的Prefetch，Preconnect资源优先级提示效果也会说到<code>crossorigin</code>属性的影响。</p><p>对于跨域资源，则器资源优先级提示也需要设置为跨域。即<code>crossorigin=&quot;anonymous&quot;</code>，例如：<code>&lt;link rel=&quot;prefetch&quot; href=&quot;https://github.com/xxxxxx/xxxxxx.js&quot; crossorigin=&quot;anonymous&quot; /&gt;</code></p><h2 id="预加载-preload" tabindex="-1">预加载 Preload <a class="header-anchor" href="#预加载-preload" aria-label="Permalink to &quot;预加载 Preload&quot;">​</a></h2><p>与预取回不同，预加载用于提高<strong>当前</strong>页面中资源加载的优先级，确保关键资源优先加载完成。</p><p>预加载最常见的用法是用于字体文件。减少因字体加载较慢导致的文字字体闪烁变化。例如：<code>&lt;link rel=&quot;preload&quot; as=&quot;font&quot; href=&quot;/main.woff&quot; /&gt;</code></p><p>应用了<code>preload</code>提示的资源，通常会以较高的优先级<strong>率先</strong>在网页中加载，例如下图中的<code>nato-sans.woff2</code>请求，<code>priority</code>列的值为<code>High</code>，加载顺序仅次于<code>Document</code>本身，能让字体较早在页面中渲染生效。</p><p><img src="'+i+'" alt="image"></p><p><img src="'+r+`" alt="image"></p><h2 id="预连接-preconnect" tabindex="-1">预连接 Preconnect <a class="header-anchor" href="#预连接-preconnect" aria-label="Permalink to &quot;预连接 Preconnect&quot;">​</a></h2><p>预连接提示用于提前与目标域名握手，完成DNS寻址，并建立TCP和TLS连接。</p><p>具体使用方式是将<code>link</code>标签的<code>rel</code>属性设为<code>preconnect</code>，并将<code>href</code>属性设为目标域名，例如<code>&lt;link rel=&quot;preconnect&quot; href=&quot;https://github.com&quot; /&gt;</code></p><p>优先效果是通过提前完成DNS寻址，建立TCP连接和完成TLS握手，从而减少后续访问目标域名时的连接耗时，改善用户体验。</p><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>注意！强烈建议只对重要域名进行Preconnect优化，数量最好不要超过6个</p></div><p>因为<code>Preconnect</code>生效后，会与目标域名的保持至少10秒钟的网络连接。占用设备的网络和内存资源，甚至阻碍其他资源的加载。</p><h2 id="dns预取出-dns-prefetch" tabindex="-1">DNS预取出 DNS-Prefetch <a class="header-anchor" href="#dns预取出-dns-prefetch" aria-label="Permalink to &quot;DNS预取出 DNS-Prefetch&quot;">​</a></h2><p>DNS预取回用于对 <strong>目标域名</strong> 提前进行DNS寻址，取回并缓存域名对应IP地址，而非像预取回Prefetch那样缓存文件资源。</p><p>优化效果是通过提前解析出目标域名的IP地址，从而减少后续从目标域名加载资源的耗时，加快页面加载速度，改善用户体验。</p><p>通常来说，解析DNS的耗时往往有几十甚至几百毫秒，对资源加载耗时有直接影响。</p><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>DNS预取回的能力 与 预连接Preconnect有所重合，这时因为以往 <strong>dns-prefetch</strong>的浏览器兼容性略好于<strong>preconnect</strong>，往往两者一同使用。</p></div><p>例如，静态资源部署在域名为<code>static.zhihu.com</code>的CDN上</p><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">link</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> rel</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;preconnect&quot;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> href</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;static.zhihu.com&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> /&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">link</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> rel</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;dns-prefetch&quot;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> href</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;static.zhihu.com&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> /&gt;</span></span></code></pre></div><p>因为preconnect的生效使得资源加载时的DNS寻址，SSL握手等阶段得以提前进行，各个资源加载使其耗时就大幅减少，产生了显著的优化效果</p><h2 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h2><table><thead><tr><th>类型</th><th>优化目标</th><th>示例</th><th>注意事项</th></tr></thead><tbody><tr><td>Prefetch</td><td>加载优先级较低的资源;后续页面浏览需要加载的资源</td><td>rel=&quot;prefetch&quot;</td><td>Prefetch预取回的资源并不会被立刻解析，运行；Prefetch的触发时机不固定，有浏览器决定，会在空闲时触发下载</td></tr><tr><td>Preload</td><td>当前页面需要优先加载的静态资源</td><td>rel=&quot;preload&quot;</td><td>优化目标为当前页面所需资源，而非后续加载</td></tr><tr><td>Preconnect</td><td>加载优先级较低的域名;后续页面浏览器需要连接的域名</td><td>rel=&quot;proconnect&quot;</td><td>用于跨域域名，同源域名不需要；控制只对关键域名应用，避免数量超过6个</td></tr><tr><td>DNS-Prefetch</td><td>后续页面浏览需要连接的域名</td><td>rel=&quot;dns-prefetch&quot;</td><td>同预连接 Preconnect</td></tr></tbody></table>`,43),n=[d];function p(l,h,u,k,g,f){return o(),e("div",null,n)}const P=t(a,[["render",p]]);export{m as __pageData,P as default};
