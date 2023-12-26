import{_ as s,o as n,c as a,Q as o}from"./chunks/framework.6d94f49f.js";const l="/assets/environment-record.c103b276.png",g=JSON.parse('{"title":"作用域","description":"","frontmatter":{},"headers":[],"relativePath":"javascript-docs/javascript-advanced/作用域.md","filePath":"javascript-docs/javascript-advanced/作用域.md","lastUpdated":1702548813000}'),p={name:"javascript-docs/javascript-advanced/作用域.md"},e=o(`<h1 id="作用域" tabindex="-1">作用域 <a class="header-anchor" href="#作用域" aria-label="Permalink to &quot;作用域&quot;">​</a></h1><p>早年间有一种说法叫做 “JavaScript 没有作用域”，当然这是一种夸张的讲法，其表达的意思应该是：JavaScript 没有块级作用域。</p><p>比如下面这样的代码是可以工作的：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">{ </span><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> foo </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;Hello&quot;</span><span style="color:#E1E4E8;">; }</span></span>
<span class="line"><span style="color:#E1E4E8;">console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(foo) </span><span style="color:#6A737D;">// &quot;Hello&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> i </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">; i </span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">10</span><span style="color:#E1E4E8;">; i</span><span style="color:#F97583;">++</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(i) </span><span style="color:#6A737D;">// 10</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">{ </span><span style="color:#D73A49;">var</span><span style="color:#24292E;"> foo </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;Hello&quot;</span><span style="color:#24292E;">; }</span></span>
<span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(foo) </span><span style="color:#6A737D;">// &quot;Hello&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">for</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">var</span><span style="color:#24292E;"> i </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">; i </span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">10</span><span style="color:#24292E;">; i</span><span style="color:#D73A49;">++</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(i) </span><span style="color:#6A737D;">// 10</span></span></code></pre></div><p>大括号和 for 语句并没有束缚住变量的作用范围。</p><p>在现代的 JavaScript 执行环境中，基本已经没有了这样的困扰，“没有块级作用域”也不再适用于 JavaScript。</p><h2 id="变量的可访问性原理" tabindex="-1">变量的可访问性原理 <a class="header-anchor" href="#变量的可访问性原理" aria-label="Permalink to &quot;变量的可访问性原理&quot;">​</a></h2><p>作用域，或者称之为“上下文”，是变量被承载的容器。</p><p>在最新的 ECMAScript 规范中，定义了一个叫做环境记录<code>（Environment Record）</code>的抽象概念，可理解为就是作用域。</p><p>从 <code>Record</code> 这种词我们就能联想到它是用来记录变量的。这里的变量不仅仅包括 var 声明的变量，还包括 <code>const</code>、<code>let</code>、<code>class</code>、<code>function</code>、<code>with</code>、<code>catch</code> 等声明的变量或参数。一旦这些语句被执行，那么就会创建一个新的 <strong>Environment Record</strong>。</p><p>Environment Record是抽象的，它有三个子类，分别是：</p><ul><li><code>Declaretive Environment Record</code></li><li><code>Object Environment Record</code></li><li><code>Global Environment Record</code>，浏览器中指globalThis，Node.js中指global</li></ul><p>其中<code>Declaretive Environment Record</code>还有两个子类：</p><ul><li><code>Function Environment Record</code> —— function</li><li><code>Module Environment Record</code> —— module</li></ul><p>因此，目前官方规范中定义的这几种作用域的关系是： <img src="`+l+`" alt="environment-record"></p><p>并且，每一个 Environment Record 都有一个 <code>OuterEnv</code>属性，它指向另一个 Environment Record 实例。从这一点上可以看出来，<strong>作用域是有上下层级关系的，所有作用域都应该可以组成一个树形结构</strong>，这和平时的编码认知其实是一致的。</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> foo </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">; </span><span style="color:#6A737D;">// Env3</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">onload</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> bar </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">; </span><span style="color:#6A737D;">// Env2</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">callback</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> baz </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">3</span><span style="color:#E1E4E8;">; </span><span style="color:#6A737D;">// Env1</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> foo </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> bar </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> baz;</span></span>
<span class="line"><span style="color:#E1E4E8;">    };</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">var</span><span style="color:#24292E;"> foo </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">; </span><span style="color:#6A737D;">// Env3</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">onload</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">var</span><span style="color:#24292E;"> bar </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">2</span><span style="color:#24292E;">; </span><span style="color:#6A737D;">// Env2</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">callback</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">var</span><span style="color:#24292E;"> baz </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">3</span><span style="color:#24292E;">; </span><span style="color:#6A737D;">// Env1</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> foo </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> bar </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> baz;</span></span>
<span class="line"><span style="color:#24292E;">    };</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>从上面的代码片段中，至少可以定义三个作用域：Env1，Env2，Env3。当去计算<code>foo + bar + baz</code>的时候，需要依次<strong>从下向上</strong>搜索作用域内是否有对应的变量声明。</p><ul><li>首先，在 Env1 中查找 foo，不存在，向上在 Env2 中查找，也不存在，继续向上，直到在 Env3 中找到，取其值；</li><li>其次，在 Env1 中查找 bar，不存在，向上在 Env2 中找到，取其值；</li><li>最后，在 Env1 中找到 baz，取其值。</li></ul><p>这三个作用域的关系：Env1 的 OuterEnv 是 Env2，Env2 的 OuterEnv 是 Env3，这一条关系链称为<strong>作用域链</strong>。</p><p>不同类型的 Environment Record，其 <code>OuterEnv</code> 类型是受限的。比如，<strong>Global Environment Record</strong> 的 OuterEnv 总是 <code>null</code>，而 <strong>Module Environment Record</strong> 的 OuterEnv 总是 <strong>Global Environment Record</strong>。</p><p>举个例子：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// index.js</span></span>
<span class="line"><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> foo </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">onload</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> bar </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">import</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;./dynamic.js&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// index.js</span></span>
<span class="line"><span style="color:#D73A49;">var</span><span style="color:#24292E;"> foo </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">onload</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">var</span><span style="color:#24292E;"> bar </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">2</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">import</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;./dynamic.js&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// dynamic.js</span></span>
<span class="line"><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> baz </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">3</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(foo </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> bar </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> baz);</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// dynamic.js</span></span>
<span class="line"><span style="color:#D73A49;">var</span><span style="color:#24292E;"> baz </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">3</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(foo </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> bar </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> baz);</span></span></code></pre></div><p>dynamic.js 所在的作用域，是一个<strong>Module Environment Record</strong>，由于其<code>OuterEnv</code>是<strong>Global Environment Record</strong>，因此它可以访问到foo变量，但是访问不到bar变量，于是在console.log会报错。</p><p>除了主动声明变量，还经常会使用到<code>this</code></p><h2 id="this" tabindex="-1">this <a class="header-anchor" href="#this" aria-label="Permalink to &quot;this&quot;">​</a></h2><p><code>this</code>通常与对象相关，在对象上调用一个函数，这个函数内部的<code>this</code>通常就指向这个对象:</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">dog</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    name:</span><span style="color:#9ECBFF;">&#39;spark&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">bark</span><span style="color:#E1E4E8;">:</span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;">(){</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.name</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#E1E4E8;">console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(dog.</span><span style="color:#B392F0;">bark</span><span style="color:#E1E4E8;">()) </span><span style="color:#6A737D;">// &quot;spark&quot;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">dog</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    name:</span><span style="color:#032F62;">&#39;spark&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">bark</span><span style="color:#24292E;">:</span><span style="color:#D73A49;">function</span><span style="color:#24292E;">(){</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.name</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(dog.</span><span style="color:#6F42C1;">bark</span><span style="color:#24292E;">()) </span><span style="color:#6A737D;">// &quot;spark&quot;</span></span></code></pre></div><p>this是按如下具体工作的：</p><p>ECMAScript 规定，在Environment Record的抽象定义上，有一个函数叫做<code>HasThisBinding()</code>，不同的子类对此函数的实现不同。</p><p>当你的代码在执行过程中遇到<code>this</code>的时候，具体的计算规则是这样的：</p><ul><li>设 env 等于当前的 <code>Environment Record</code></li><li>设 exist 等于 <code>env.HasThisBinding()</code> 返回值</li><li>如果 exist 等于 true, 则返回<code>env.GetThisBinding()</code>，终止</li><li>赋值 env 等于 <code>env.OuterEnv</code>，跳到步骤2继续执行</li></ul><div class="tip custom-block"><p class="custom-block-title">TIP</p><pre><code>GetThisBinding() 下面会提到
</code></pre></div><p>这个过程就是一个向上递归遍历的过程，哪一级的 Environment Record 有<code>ThisBinding</code>，就返回它，非常类似于<strong>作用域链</strong>。</p><p>这个算法不会死循环，因为 Environment Record 结构的最顶层是一个 Global Environment Record，它一定有<code>ThisBinding</code>，每个 Environment Record 都会有对应的标准。</p><h3 id="declarative-environment-record" tabindex="-1">Declarative Environment Record <a class="header-anchor" href="#declarative-environment-record" aria-label="Permalink to &quot;Declarative Environment Record&quot;">​</a></h3><p>Declarative Environment Record 的 <code>HasThisBinding()</code>始终返回false，因此像下面这样的代码，this其实指向的上一层 Environment Record，即<code>globalThis</code>对象：</p><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">script</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">    console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">script</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">script</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">    console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">this</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">script</span><span style="color:#24292E;">&gt;</span></span></code></pre></div><h3 id="function-environment-record" tabindex="-1">Function Environment Record <a class="header-anchor" href="#function-environment-record" aria-label="Permalink to &quot;Function Environment Record&quot;">​</a></h3><p>Function Environment Record 是 Declarative Environment Record 的子类，并设计有额外的属性或函数。</p><p>ECMAScript规定，如果函数是箭头函数=&gt;，那么<code>HasThisBinding()</code>返回false，否则返回true。</p><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">script</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">person</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">say</span><span style="color:#E1E4E8;">: () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">            console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    };</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(person.</span><span style="color:#B392F0;">say</span><span style="color:#E1E4E8;">()); </span><span style="color:#6A737D;">// window</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">script</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">script</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">person</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">say</span><span style="color:#24292E;">: () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">            console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">this</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    };</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(person.</span><span style="color:#6F42C1;">say</span><span style="color:#24292E;">()); </span><span style="color:#6A737D;">// window</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">script</span><span style="color:#24292E;">&gt;</span></span></code></pre></div><p>虽然函数<code>say</code>是在<code>person</code>对象上调用的，但是this并不指向<code>person</code>。即便使用<code>Function.prototype.bind/call/apply</code>函数尝试修改this也不行；</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">person.say.</span><span style="color:#B392F0;">call</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;Hello&quot;</span><span style="color:#E1E4E8;">); </span><span style="color:#6A737D;">// window</span></span>
<span class="line"><span style="color:#E1E4E8;">person.say.</span><span style="color:#B392F0;">apply</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;Hello&quot;</span><span style="color:#E1E4E8;">, []); </span><span style="color:#6A737D;">// window</span></span>
<span class="line"><span style="color:#E1E4E8;">person.say.</span><span style="color:#B392F0;">bind</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;Hello&quot;</span><span style="color:#E1E4E8;">)(); </span><span style="color:#6A737D;">// window</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">person.say.</span><span style="color:#6F42C1;">call</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;Hello&quot;</span><span style="color:#24292E;">); </span><span style="color:#6A737D;">// window</span></span>
<span class="line"><span style="color:#24292E;">person.say.</span><span style="color:#6F42C1;">apply</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;Hello&quot;</span><span style="color:#24292E;">, []); </span><span style="color:#6A737D;">// window</span></span>
<span class="line"><span style="color:#24292E;">person.say.</span><span style="color:#6F42C1;">bind</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;Hello&quot;</span><span style="color:#24292E;">)(); </span><span style="color:#6A737D;">// window</span></span></code></pre></div><h3 id="global-environment-record" tabindex="-1">Global Environment Record <a class="header-anchor" href="#global-environment-record" aria-label="Permalink to &quot;Global Environment Record&quot;">​</a></h3><p>Global Environment Record 也有自己专属的属性和函数，它的<code>HasThisBinding()</code>始终返回true，因此在全局环境下，this是有值的，浏览器下是<code>window/globalThis</code>，Node.js环境下是<code>global</code></p><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">script</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">); </span><span style="color:#6A737D;">// window</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">script</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">script</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">this</span><span style="color:#24292E;">); </span><span style="color:#6A737D;">// window</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">script</span><span style="color:#24292E;">&gt;</span></span></code></pre></div><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">$</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">node</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-e</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;console.log(this)&quot;</span><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;"># global</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">$</span><span style="color:#24292E;"> </span><span style="color:#032F62;">node</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-e</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;console.log(this)&quot;</span><span style="color:#24292E;">  </span><span style="color:#6A737D;"># global</span></span></code></pre></div><h3 id="module-environment-record" tabindex="-1">Module Environment Record <a class="header-anchor" href="#module-environment-record" aria-label="Permalink to &quot;Module Environment Record&quot;">​</a></h3><p>Module Environment Record，它也是 Declarative Environment Record 的子类，提供了 <code>GetThisBinding()</code> 函数。</p><p>Module Environment Record 的 <code>HasThisBinding()</code> 始终返回 true，但是 <code>GetThisBinding()</code> 却始终返回 undefined，这样的效果就是：<strong>在 ES Modules 里面的全局 this 始终是 undefined</strong>。</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// index.js</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;./lib.js&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// lib.js</span></span>
<span class="line"><span style="color:#E1E4E8;">console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">); </span><span style="color:#6A737D;">// undefined</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// index.js</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;./lib.js&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// lib.js</span></span>
<span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">this</span><span style="color:#24292E;">); </span><span style="color:#6A737D;">// undefined</span></span></code></pre></div><p>这样的设计能够避免一些潜在的歧义，比如下面这段代码在顶层上下文中运行：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">foo</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">   console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">foo</span><span style="color:#E1E4E8;">();</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">foo</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">   console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">this</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">foo</span><span style="color:#24292E;">();</span></span></code></pre></div><p>如果不是ES Modules，那么 this 指向将取决于是否是<code>strict</code>模式：</p><ul><li>strict 模式下，this为<code>undefined</code></li><li>非 strict 模式下，this为<code>window/globalThis</code></li></ul><p>ES Modules 环境避免了这种歧义，this 始终是 undefined，不会意外地修改到全局的数据</p><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>忽略对 Obeject Environment Record 的讨论，它代表的 with 是不建议使用的</p></div><h2 id="变量提升-与-tdz" tabindex="-1">变量提升 与 TDZ <a class="header-anchor" href="#变量提升-与-tdz" aria-label="Permalink to &quot;变量提升 与 TDZ&quot;">​</a></h2><p>在 ES6 之前，我们只能用 <code>var</code> 来声明变量，我还记得有一条不成文的规矩是：<strong>应该把所有 var 语句提到当前作用域的最前面</strong>。</p><p>之所以要这样做，是因为 var 声明的变量具有提升的效果，也就是我们可以在声明之前访问到它，只不过值肯定是 <strong>undefined</strong>。</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(foo); </span><span style="color:#6A737D;">// undefined</span></span>
<span class="line"><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> foo </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;hello&quot;</span><span style="color:#E1E4E8;">;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(foo); </span><span style="color:#6A737D;">// undefined</span></span>
<span class="line"><span style="color:#D73A49;">var</span><span style="color:#24292E;"> foo </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;hello&quot;</span><span style="color:#24292E;">;</span></span></code></pre></div><p>var 声明的变量也确实呼应了前面对于 “JavaScript 没有块级作用域”的特征，一个大括号根本无法阻止 var 的作用范围：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> foo </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">100</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(foo); </span><span style="color:#6A737D;">// 100</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">var</span><span style="color:#24292E;"> foo </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">100</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(foo); </span><span style="color:#6A737D;">// 100</span></span></code></pre></div><p>甚至是<code>try...catch</code>和<code>for</code>语句。</p><p>为了解决这个问题，ES6 引入了 let 和 const 关键字来声明具有块级作用域的变量，它们的区别就是一个的值可变，一个不可变。</p><p>相反的是<code>let</code>与<code>const</code>不能进行提升</p><p>如果在let声明之前使用变量，则会出发未初始化异常：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(foo); </span><span style="color:#6A737D;">// ❌ Uncaught ReferenceError: Cannot access &#39;foo&#39; before initialization</span></span>
<span class="line"><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> foo </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">100</span><span style="color:#E1E4E8;">;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(foo); </span><span style="color:#6A737D;">// ❌ Uncaught ReferenceError: Cannot access &#39;foo&#39; before initialization</span></span>
<span class="line"><span style="color:#D73A49;">let</span><span style="color:#24292E;"> foo </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">100</span><span style="color:#24292E;">;</span></span></code></pre></div><p><strong>TDZ</strong>全称Temporal Dead Zone，即<strong>暂行性死区</strong>。</p><p>可以具体看它们的定义：</p><p><strong>var</strong> : A var statement declares variables that are scoped to the running execution context&#39;s VariableEnvironment. <code>Var variables are created when their containing Environment Record is instantiated and are initialized to undefined when created.</code> Within the scope of any VariableEnvironment a common BindingIdentifier may appear in more than one VariableDeclaration but those declarations collectively define only one variable. A variable defined by a VariableDeclaration with an Initializer is assigned the value of its Initializer&#39;s AssignmentExpression when the VariableDeclaration is executed, not when the variable is created.</p><p><strong>let/const</strong> : let and const declarations define variables that are scoped to the running execution context&#39;s LexicalEnvironment. <code>The variables are created when their containing Environment Record is instantiated but may not be accessed in any way until the variable&#39;s LexicalBinding is evaluated.</code> A variable defined by a LexicalBinding with an Initializer is assigned the value of its Initializer&#39;s AssignmentExpression when the LexicalBinding is evaluated, not when the variable is created. If a LexicalBinding in a let declaration does not have an Initializer the variable is assigned the value undefined when the LexicalBinding is evaluated.</p><p>它们之间最关键的区别在于第二句话体现上：<strong>var声明的变量在 Environment Record 初始化的时候就被赋值为 undefined ，而 let/const 是直到词法绑定 <code>LexicalBinding</code> 被执行才可以被访问。</strong></p><p>词法绑定可以简单的理解为：就是 let/const 所在的那一句代码。不到这一句，都不可以访问变量。</p>`,76),c=[e];function t(r,i,E,y,d,v){return n(),a("div",null,c)}const u=s(p,[["render",t]]);export{g as __pageData,u as default};
