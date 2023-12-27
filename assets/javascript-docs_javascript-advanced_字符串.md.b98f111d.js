import{_ as s,o as a,c as o,Q as n}from"./chunks/framework.6d94f49f.js";const l="/assets/字符串码元.157b4264.png",d=JSON.parse('{"title":"字符串","description":"","frontmatter":{},"headers":[],"relativePath":"javascript-docs/javascript-advanced/字符串.md","filePath":"javascript-docs/javascript-advanced/字符串.md","lastUpdated":1703694410000}'),p={name:"javascript-docs/javascript-advanced/字符串.md"},t=n('<h1 id="字符串" tabindex="-1">字符串 <a class="header-anchor" href="#字符串" aria-label="Permalink to &quot;字符串&quot;">​</a></h1><p>字符串是平时业务需求中最经常碰到的东西，多多少少会遇到这些需求：</p><ul><li>限制输入框中的内容长度，保证在具体的位置能够显示得下</li><li>拼接服务端得数据为一个阅读良好的提示语，并展现给用户，比如“您的训练次数还剩xxx次”</li><li>在固定格式中舍去一部分信息，保留剩余的内容，比如在身份证号中获取生日信息</li></ul><p>这些基础操作如果不注意，也会产生一些错误的结果，现在来滤清字符串的进阶知识</p><h2 id="基本结构" tabindex="-1">基本结构 <a class="header-anchor" href="#基本结构" aria-label="Permalink to &quot;基本结构&quot;">​</a></h2><p>字符串——<strong>以“字符”为基本单位的有序序列</strong>，但是这个字符并不是直观意义上的一个文字符号，比如英文字母“A”,汉字“中”，或者是标点符号“.”，而是一个叫做 码元Code Unit 的东西，占据16bit，即2byte空间。</p><p><img src="'+l+`" alt="字符串码元"></p><p>无论什么数据，在计算机内容中都是二进制的数字表示的，因此一个码元就是一个16位无符号整数，最大的是0xFFFF。这个数字是需要映射成可见的，有意义的文字符号，这个映射关系本来是由字符集 Unicode 来负责的，比如数字65映射为大写英文字母“A”,数字 0x4E2D映射为汉字“中”。但是，通常来说一个字符的 Unicode 编码值不适合用来直接存储和传输，原因包括：</p><ul><li>纠错问题，即便错了一二进制位，就会变成另外一个合法的字符</li><li>前导问题，一个字符的编码值可能是另一个字符的前面一部分</li></ul><p>因此，Unicode 编码值会通过算法再次编码成另一个数字来进行存储和传输。这个过程就叫做<strong>字符编码</strong>，通常见到的字符编码比如GBK，UTF-8等。</p><p>编码过程虽然会浪费一部分空间，但是拥有了一定的纠错能力，并且规避了前导问题。</p><p>而JavaScript的码元就是经过字符编码后的整数，只不过这个编码不是叫做<code>UTF-16</code>的编码方案，而<code>UTF-16</code>编码之后只可能是2byte或4byte的</p><p><strong>而一个Unicode字符在JavaScript字符串中可能占据1个码元，也有可能占据2个</strong></p><p>这就导致获取一些字符串长度的时候会出现问题。</p><h2 id="获取长度" tabindex="-1">获取长度 <a class="header-anchor" href="#获取长度" aria-label="Permalink to &quot;获取长度&quot;">​</a></h2><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#9ECBFF;">&quot;我是中国人&quot;</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">length</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">//5</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#032F62;">&quot;我是中国人&quot;</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">length</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">//5</span></span></code></pre></div><p>可以看出这句话有5个码元，就是10个字节。</p><p>一个字符串最多包含2的53次方-1个码元，这也是 JavaScript 所能表示的最大整数，即<code>Number.MAX_SAFE_INTEGER</code>。</p><p>经常会遇到通过length来推算文本在页面上的显示宽度。由于英文字母，标点符号和汉字的显示宽度明显不一样，因此也可以判断字符是否是汉字，如果是的话算作两个英文字母的宽度。（但是世界上有各种各样的语言，宽度各不相同，这个方法也不靠谱）</p><p>因此，<strong>还得是依赖CSS去解决宽度问题</strong></p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#9ECBFF;">&quot;😀&quot;</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">length</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">//2</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#032F62;">&quot;😀&quot;</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">length</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">//2</span></span></code></pre></div><p>这个例子就是一个字符占2个码元的例子。</p><p>然而有的特殊的emoji表情可能会占到7个码元。这是因为Emoji的一个“修饰序列”的功能造成的：在一个基础的Emoji编码后面，添加修饰符的编码，中间用0x200D来分隔，从而产生一系列的码元。</p><p>修饰序列和双码元字符共同作用，使得字符串对于字符位置的操作更加敏感，如果读取位置不正确，很有可能会读到无意义的字符碎片。</p><h2 id="字符串截取" tabindex="-1">字符串截取 <a class="header-anchor" href="#字符串截取" aria-label="Permalink to &quot;字符串截取&quot;">​</a></h2><p>截取字符串可以分为<strong>截取单个字符串</strong>和<strong>截取片段</strong>，JavaScript中的字符串也是不可变的，任何看似修改其内容的操作，无一例外都是拷贝返回新的字符串实例。</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> str </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;我在工作&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">str[</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">] </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;不&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(str) </span><span style="color:#6A737D;">//“我在工作”</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">var</span><span style="color:#24292E;"> str </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;我在工作&quot;</span></span>
<span class="line"><span style="color:#24292E;">str[</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">] </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;不&quot;</span></span>
<span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(str) </span><span style="color:#6A737D;">//“我在工作”</span></span></code></pre></div><p>但在strict模式下，上面的代码会抛出错误。</p><h2 id="截取字符" tabindex="-1">截取字符 <a class="header-anchor" href="#截取字符" aria-label="Permalink to &quot;截取字符&quot;">​</a></h2><p>先来看截取单个字符，如果把字符串看作一个字符数组的话，那么一个下标就能唯一定位一个字符。</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#9ECBFF;">&quot;12345&quot;</span><span style="color:#E1E4E8;">[</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">] </span><span style="color:#6A737D;">// &quot;2&quot;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#032F62;">&quot;12345&quot;</span><span style="color:#24292E;">[</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">] </span><span style="color:#6A737D;">// &quot;2&quot;</span></span></code></pre></div><p>同时还有 charAt 和 at 方法</p><ul><li><strong>数组下标</strong> 如果参数在<code>[0, lenth - 1]</code>之外的，返回undefined</li><li><strong>charAt 函数</strong> 如果参数在<code>[0, length - 1]</code>之外的，返回的是空字符串</li><li><strong>at 函数</strong>，如果序号是负数，则会加上字符串的 length 作为新的符号，如果新的序号也不在有效范围内，则会返回undefined</li></ul><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#9ECBFF;">&quot;𠯿a&quot;</span><span style="color:#E1E4E8;">[</span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">]        </span><span style="color:#6A737D;">// &quot;a&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">&quot;𠯿a&quot;</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">charAt</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">) </span><span style="color:#6A737D;">// &quot;a&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">&quot;𠯿a&quot;</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">at</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">)     </span><span style="color:#6A737D;">// &quot;a&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">Array.</span><span style="color:#B392F0;">from</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;𠯿a&quot;</span><span style="color:#E1E4E8;">)[</span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">] </span><span style="color:#6A737D;">// &quot;𠯿&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">[</span><span style="color:#F97583;">...</span><span style="color:#9ECBFF;">&quot;𠯿a&quot;</span><span style="color:#E1E4E8;">][</span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">]        </span><span style="color:#6A737D;">// &quot;𠯿&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">Array.</span><span style="color:#B392F0;">from</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;🧑🏾🎓a&quot;</span><span style="color:#E1E4E8;">)[</span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">] </span><span style="color:#6A737D;">// &quot;🧑&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">[</span><span style="color:#F97583;">...</span><span style="color:#9ECBFF;">&quot;🧑🏾🎓a&quot;</span><span style="color:#E1E4E8;">][</span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">]        </span><span style="color:#6A737D;">// &quot;🧑&quot;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#032F62;">&quot;𠯿a&quot;</span><span style="color:#24292E;">[</span><span style="color:#005CC5;">2</span><span style="color:#24292E;">]        </span><span style="color:#6A737D;">// &quot;a&quot;</span></span>
<span class="line"><span style="color:#032F62;">&quot;𠯿a&quot;</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">charAt</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">2</span><span style="color:#24292E;">) </span><span style="color:#6A737D;">// &quot;a&quot;</span></span>
<span class="line"><span style="color:#032F62;">&quot;𠯿a&quot;</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">at</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">2</span><span style="color:#24292E;">)     </span><span style="color:#6A737D;">// &quot;a&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">Array.</span><span style="color:#6F42C1;">from</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;𠯿a&quot;</span><span style="color:#24292E;">)[</span><span style="color:#005CC5;">0</span><span style="color:#24292E;">] </span><span style="color:#6A737D;">// &quot;𠯿&quot;</span></span>
<span class="line"><span style="color:#24292E;">[</span><span style="color:#D73A49;">...</span><span style="color:#032F62;">&quot;𠯿a&quot;</span><span style="color:#24292E;">][</span><span style="color:#005CC5;">0</span><span style="color:#24292E;">]        </span><span style="color:#6A737D;">// &quot;𠯿&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">Array.</span><span style="color:#6F42C1;">from</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;🧑🏾🎓a&quot;</span><span style="color:#24292E;">)[</span><span style="color:#005CC5;">0</span><span style="color:#24292E;">] </span><span style="color:#6A737D;">// &quot;🧑&quot;</span></span>
<span class="line"><span style="color:#24292E;">[</span><span style="color:#D73A49;">...</span><span style="color:#032F62;">&quot;🧑🏾🎓a&quot;</span><span style="color:#24292E;">][</span><span style="color:#005CC5;">0</span><span style="color:#24292E;">]        </span><span style="color:#6A737D;">// &quot;🧑&quot;</span></span></code></pre></div><h2 id="截取片段" tabindex="-1">截取片段 <a class="header-anchor" href="#截取片段" aria-label="Permalink to &quot;截取片段&quot;">​</a></h2><p>ECMA262 提供了两个推荐使用的字符串截取函数：<strong>substring</strong> 和 <strong>slice</strong>，使用方式很类似，容易混淆。</p><p>它们的参数都是<code>[startIndex,endIndex]</code>，注意是半开区间，区别在于：</p><ul><li>substring 会允许 endIndex &lt; startIndex，会自动交换这两个值，而slice不允许，会返回空字符串</li></ul><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#9ECBFF;">&quot;12345&quot;</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">substring</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">3</span><span style="color:#E1E4E8;">,</span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">) </span><span style="color:#6A737D;">//&quot;3&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">&quot;12345&quot;</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">slice</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">3</span><span style="color:#E1E4E8;">,</span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">) </span><span style="color:#6A737D;">// &quot;&quot;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#032F62;">&quot;12345&quot;</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">substring</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">3</span><span style="color:#24292E;">,</span><span style="color:#005CC5;">2</span><span style="color:#24292E;">) </span><span style="color:#6A737D;">//&quot;3&quot;</span></span>
<span class="line"><span style="color:#032F62;">&quot;12345&quot;</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">slice</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">3</span><span style="color:#24292E;">,</span><span style="color:#005CC5;">2</span><span style="color:#24292E;">) </span><span style="color:#6A737D;">// &quot;&quot;</span></span></code></pre></div><ul><li>substring 的参数如果是负数，会当作0处理，slice对负数会加上字符串长度</li></ul><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#9ECBFF;">&quot;12345&quot;</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">substring</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">-</span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">,</span><span style="color:#F97583;">-</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">) </span><span style="color:#6A737D;">// &quot;&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">&quot;12345&quot;</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">slice</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">-</span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">,</span><span style="color:#F97583;">-</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">) </span><span style="color:#6A737D;">// &quot;4&quot;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#032F62;">&quot;12345&quot;</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">substring</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">-</span><span style="color:#005CC5;">2</span><span style="color:#24292E;">,</span><span style="color:#D73A49;">-</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">) </span><span style="color:#6A737D;">// &quot;&quot;</span></span>
<span class="line"><span style="color:#032F62;">&quot;12345&quot;</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">slice</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">-</span><span style="color:#005CC5;">2</span><span style="color:#24292E;">,</span><span style="color:#D73A49;">-</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">) </span><span style="color:#6A737D;">// &quot;4&quot;</span></span></code></pre></div><p>同理，也会收到双码元和Emoji的修饰符序列的影响</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#9ECBFF;">&quot;🧑🏾🎓a&quot;</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">substring</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">) </span><span style="color:#6A737D;">// &quot;🧑&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">&quot;🧑🏾🎓a&quot;</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">slice</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">)     </span><span style="color:#6A737D;">// &quot;🧑&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">&quot;🧑🏾🎓a&quot;</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">substring</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">7</span><span style="color:#E1E4E8;">)    </span><span style="color:#6A737D;">// &quot;a&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">&quot;🧑🏾🎓a&quot;</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">slice</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">7</span><span style="color:#E1E4E8;">)        </span><span style="color:#6A737D;">// &quot;a&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">&quot;今天天气晴朗🧑🏾🎓！&quot;</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">slice</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">9</span><span style="color:#E1E4E8;">)  </span><span style="color:#6A737D;">// &quot;今天天气晴朗🧑\\uD83C&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">&quot;今天天气晴朗🧑🏾🎓！&quot;</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">slice</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">10</span><span style="color:#E1E4E8;">) </span><span style="color:#6A737D;">// &quot;今天天气晴朗🧑🏾&quot;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#032F62;">&quot;🧑🏾🎓a&quot;</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">substring</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">0</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">2</span><span style="color:#24292E;">) </span><span style="color:#6A737D;">// &quot;🧑&quot;</span></span>
<span class="line"><span style="color:#032F62;">&quot;🧑🏾🎓a&quot;</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">slice</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">0</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">2</span><span style="color:#24292E;">)     </span><span style="color:#6A737D;">// &quot;🧑&quot;</span></span>
<span class="line"><span style="color:#032F62;">&quot;🧑🏾🎓a&quot;</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">substring</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">7</span><span style="color:#24292E;">)    </span><span style="color:#6A737D;">// &quot;a&quot;</span></span>
<span class="line"><span style="color:#032F62;">&quot;🧑🏾🎓a&quot;</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">slice</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">7</span><span style="color:#24292E;">)        </span><span style="color:#6A737D;">// &quot;a&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">&quot;今天天气晴朗🧑🏾🎓！&quot;</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">slice</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">0</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">9</span><span style="color:#24292E;">)  </span><span style="color:#6A737D;">// &quot;今天天气晴朗🧑\\uD83C&quot;</span></span>
<span class="line"><span style="color:#032F62;">&quot;今天天气晴朗🧑🏾🎓！&quot;</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">slice</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">0</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">10</span><span style="color:#24292E;">) </span><span style="color:#6A737D;">// &quot;今天天气晴朗🧑🏾&quot;</span></span></code></pre></div>`,43),e=[t];function c(r,y,E,i,u,q){return a(),o("div",null,e)}const C=s(p,[["render",c]]);export{d as __pageData,C as default};
