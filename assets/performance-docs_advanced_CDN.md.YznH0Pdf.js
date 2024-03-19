import{_ as s,c as i,o as a,U as n}from"./chunks/framework.PFQuerqu.js";const l="/assets/max-age.BLrOmn1z.png",y=JSON.parse('{"title":"CDN优化实践","description":"","frontmatter":{},"headers":[],"relativePath":"performance-docs/advanced/CDN.md","filePath":"performance-docs/advanced/CDN.md","lastUpdated":1710855057000}'),t={name:"performance-docs/advanced/CDN.md"},p=n(`<h1 id="cdn优化实践" tabindex="-1">CDN优化实践 <a class="header-anchor" href="#cdn优化实践" aria-label="Permalink to &quot;CDN优化实践&quot;">​</a></h1><p>CDN 内容分发网络，是前端工程的核心基础设施，也是各类静态资源的来源，同时也是优化用户体验的重要目标。</p><p>从用户体验和开发角度来看，CDN的影响体验的因素主要还是以下5类：</p><ul><li>CDN服务器所在的地理位置</li><li>CDN缓存的配置</li><li>CDN域名导致的跨域问题</li><li>CDN所使用的压缩算法</li><li>CDN服务器的协议版本</li></ul><h2 id="cdn服务器的地理位置" tabindex="-1">CDN服务器的地理位置 <a class="header-anchor" href="#cdn服务器的地理位置" aria-label="Permalink to &quot;CDN服务器的地理位置&quot;">​</a></h2><p>服务器地理位置直接影响到了用户访问CDN服务的延迟和下载CDN上各类资源的耗时，CDN服务器的位置距离用户越近，其下载速度，连接延迟时间等影响体验的指标状况也会变好。</p><p><strong>所以一般要根据用户的所在位置来选择CDN服务器的地理位置，那么就要统计用户所在的地域数据</strong></p><p>如果不清楚前端应用的用户分布地域情况，那么可以使用<a href="https://www.npmjs.com/package/geoip-lite" target="_blank" rel="noreferrer">geoip-lite</a>NPM包基于用户请求的IP地址来获取用户所在的地域。</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// src\\get-geo.js</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> geoip</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> require</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;geoip-lite&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">useCounter</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> require</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;./prom-client&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">/* Return Example: </span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">{</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  &quot;range&quot;: [3745513472, 3745517567],</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  &quot;country&quot;: &quot;CN&quot;,</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  &quot;region&quot;: &quot;JS&quot;,</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  &quot;eu&quot;: &quot; 0&quot;,</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  &quot;timezone&quot;: &quot;Asia/Shanghai&quot;,</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  &quot;city&quot;: &quot;Suzhou&quot;,</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  &quot;ll&quot;: [31.3041, 120.5954],</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  &quot;metro&quot;:  0,</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  &quot;area&quot;:  20</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">}</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">*/</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> getGeoDataFromIP</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">ip</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> geoip.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">lookup</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(ip);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> userRegionStatistic</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">ip</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> geo</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> getGeoDataFromIP</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(ip);</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  // console.log(\`geo=\${JSON.stringify(geo, null,  2)}\`);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">geo) {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // 忽略 &#39; 12 7. 0. 0. 1&#39;等特殊IP导致的数据为null</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  useCounter</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    name: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;UserRegion&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    help: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;user region data from node.js server&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    labels: {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      country: geo.country,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      city: geo.city,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  });</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">module</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">exports</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  userRegionStatistic,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">};</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 用法：</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// src\\app.js</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">app.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">post</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;/counter-metric&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">function</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">req</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">res</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  const</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">help</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">labels</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> req.body;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  useCounter</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({ name, help, labels });</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  userRegionStatistic</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    req.headers[</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;x-forwarded-for&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">] </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">||</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> req.socket.remoteAddress</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  );</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  // ...</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>geoip-lite 运行时需要加载一个体积较大的数据库，一般会占据100MB的服务器内存，有可能会导致服务器应用启动变慢。 作为替代也推荐使用，内存开销更小，但查询时长略长的fast-geoip<a href="https://github.com/onramper/fast-geoip" target="_blank" rel="noreferrer">fast-geoip</a>库，两者用法几乎一致</p></div><h2 id="配置cdn缓存时间" tabindex="-1">配置CDN缓存时间 <a class="header-anchor" href="#配置cdn缓存时间" aria-label="Permalink to &quot;配置CDN缓存时间&quot;">​</a></h2><p>CDN的最佳用法是文件上传之后不再覆盖更新，这样就能最大限度的利用CDN的缓存能力。而且CDN往往下载流量较多，较贵，上传流量较少，较便宜。</p><p>所系现代架构的前端应用工程一般利用<strong>文件重命名</strong>的方式来实现版本更新，一般通过文件内容来生成hash值添加到文件名称中作为版本号，部署上线时更新文件名中的哈希字符串，从而实现版本更新：</p><ul><li>01-01 上线版本JS文件名：<code>bundle.djh112.js</code></li><li>03-18 上线版本JS文件名为：<code>bundle.i125d.js</code></li></ul><p>基于这种部署上线的方式，完全可以把CDN上资源的缓存时间设置为<strong>固定的最大值</strong>，来提高缓存效果。</p><p>具体来说，可以通过配置强缓存响应头<code>Cache-Control</code>，并将缓存有效期设置为最大值<code>31536000</code>，比如：</p><p><img src="`+l+'" alt="image"></p><h2 id="让cdn域名符合同源策略" tabindex="-1">让CDN域名符合同源策略 <a class="header-anchor" href="#让cdn域名符合同源策略" aria-label="Permalink to &quot;让CDN域名符合同源策略&quot;">​</a></h2><p>如果CDN资源是跨域的，那么将会配置复杂的CORS的响应头:</p><ul><li><code>Access-Control-Allow-Origin: https://github.com</code></li><li><code>Access-Control-Allow-Headers: origin, content-type, accept</code></li><li><code>Access-Control-Allow-Methods: GET</code></li><li><code>Access-Control-Allow-Credentials: true</code></li></ul><p>这些用于实现**跨域资源共享（CORS）**的HTTP标头复杂也容易出错，如果存在多个CDN域名，那么统一管理这些标头也很麻烦</p><p>而且对于POST方法，还需要支持<code>OPTIONS</code></p><p>也就是说，最好的解决方案就是<strong>避免加载跨域资源</strong></p><p>这里提供一个简单的实现思路，使用<strong>负载均衡</strong>服务，将静态资源所在的同源域名路径的请求，转发到CDN服务，实现CDN域名同源。</p><p>一般的云服务供应商的负载均衡都支持基于<strong>域名</strong>和<strong>URL</strong>的灵活转发能力。</p><p>可以利用基于<strong>URL路径</strong>的转发能力，实现把和前端应用所在域名同源的URL路径，例如<code>/static/*</code>，配置成静态资源专用路径。</p><p>对这个路径发送的静态资源HTTP请求，用负载均衡，转发到CDN服务器获得响应。</p><h2 id="采用更好的压缩算法broti" tabindex="-1">采用更好的压缩算法Broti <a class="header-anchor" href="#采用更好的压缩算法broti" aria-label="Permalink to &quot;采用更好的压缩算法Broti&quot;">​</a></h2><p>除了Gzip压缩算法之外还有Brotli算法来进行文件的压缩，以体积为1000KB的源文件为例：</p><table><thead><tr><th>项目/压缩算法</th><th>Gzip</th><th>Brotli</th></tr></thead><tbody><tr><td>源文件体积：1000KB</td><td>239KB</td><td>208KB</td></tr></tbody></table><p>通常来说Broti算法的压缩率比其他两种更高，用Brotil替代Gzip预计可以减少10%的CDN的流量开销。</p><p>GPT是这么解释Broti算法的：</p><p>Brotil压缩算法是一种基于LZ77算法和哈夫曼编码的压缩算法，具体实现方法如下：</p><ul><li><p>1.Brotli首先会使用一种叫做连续转化的技术，将输入数据分割成一些小的块。这可以减少内存占用，并且也可以提高压缩效率。</p></li><li><p>2.对每个块进行预处理，包括了局部分析，共享在不同块之间的字典等操作，这些操作能够帮助Brotli产生更好的匹配。</p></li><li><p>3.Brotli使用LZ77算法来查找输入数据中的重复序列，找出最长的匹配序列，并将匹配的位置以及长度信息编码成一种叫做“distance”和“length”的方式。</p></li><li><p>4.接着，Brotli还会使用一种叫做“last-dance”或者“recompression”技术来进一步优化匹配，尤其是针对位于块边界上的匹配。</p></li><li><p>5.最后，Brotli使用哈夫曼编码来压缩匹配位置和长度的信息以及未匹配的原始字符，从而实现更高效的压缩。</p></li></ul><p>这种一般在CDN云服务商里面的后台配置中开启压缩算法就可以了</p><h2 id="更新的http协议" tabindex="-1">更新的HTTP协议 <a class="header-anchor" href="#更新的http协议" aria-label="Permalink to &quot;更新的HTTP协议&quot;">​</a></h2><p>这个不多说，现在大多数CDN还在使用<strong>HTTP/1.1</strong>协议，建议有能力做升级，对流量和改善用户体验都有很好的显著优化</p>',37),h=[p];function e(k,r,o,d,E,c){return a(),i("div",null,h)}const D=s(t,[["render",e]]);export{y as __pageData,D as default};
