import{_ as a,c as t,o as e,U as s}from"./chunks/framework.PFQuerqu.js";const o="/assets/浏览器渲染原理.Y9Mh2Y0T.png",p="/assets/浏览器渲染流程.AbFAHdHq.png",r="/assets/解析HTML.bWJEAIoA.png",i="/assets/解析link.I2CdWjzN.png",c="/assets/样式tree.y9mAXT36.png",n="/assets/布局tree.FvBKikl_.png",d="/assets/分层.T3jI-MCo.png",l="/assets/绘制流程.7tZ8_wV2.png",m="/assets/分块.KakT0vfv.png",_="/assets/光栅化.UtKuuhdl.png",h="/assets/光栅化流程.r234PXxt.png",S=JSON.parse('{"title":"浏览器渲染原理","description":"","frontmatter":{},"headers":[],"relativePath":"javascript-docs/javascript-advanced/浏览器渲染原理.md","filePath":"javascript-docs/javascript-advanced/浏览器渲染原理.md","lastUpdated":1708786968000}'),g={name:"javascript-docs/javascript-advanced/浏览器渲染原理.md"},u=s('<h1 id="浏览器渲染原理" tabindex="-1">浏览器渲染原理 <a class="header-anchor" href="#浏览器渲染原理" aria-label="Permalink to &quot;浏览器渲染原理&quot;">​</a></h1><p>当浏览器的网络进程收到 HTML 文档后，会产生一个渲染任务，并将其传递给渲染主线程的消息队列。</p><p>在事件循环机制的作用下，渲染主线程取出消息队列中的渲染任务，开启渲染流程。</p><p><img src="'+o+'" alt="image"></p><p>整个渲染流程的阶段，分别是：HTML解析，样式计算，布局，分层，绘制，分块，光栅化，画。最后得到像素信息。</p><p>每个阶段都有非常明确的输入和输出，上一个阶段的输出成为下一个阶段的输入：</p><p><img src="'+p+'" alt="image"></p><h2 id="解析html" tabindex="-1">解析HTML <a class="header-anchor" href="#解析html" aria-label="Permalink to &quot;解析HTML&quot;">​</a></h2><p>浏览器会把HTML解析成 <code>HTML树</code> 和 <code>CSSOM树</code>。</p><p><img src="'+r+'" alt="image"></p><p>如果在渲染主线程时，有link这样的css代码，浏览器就会启动一个预解析线程率先下载并解析CSS代码：</p><p><img src="'+i+'" alt="image"></p><p>所以CSS代码是不会阻塞主线程的HTML解析的。</p><p>但是JS是会阻塞的，预解析虽然可以分担一些下载任务，但是因为JS代码的执行过程可能会修改当前DOM树，所以DOM树的解析必须暂停。</p><h2 id="样式计算" tabindex="-1">样式计算 <a class="header-anchor" href="#样式计算" aria-label="Permalink to &quot;样式计算&quot;">​</a></h2><p>主线程会遍历得到DOM树，依次为树中的每个节点计算出它的最后样式，称之为Computed Style。</p><p>在这个过程中很多预设值会发生改变，比如red变为rgb(255,0,0)；相对单位变为绝对单位，比如em变为px。</p><p>最后会产生一棵带有样式的DOM树</p><p><img src="'+c+'" alt="image"></p><h2 id="布局" tabindex="-1">布局 <a class="header-anchor" href="#布局" aria-label="Permalink to &quot;布局&quot;">​</a></h2><p>在布局阶段，会将带有样式信息的Dom树去计算出一个布局树</p><p>Dom树和布局树不一定是一一对应的，因为有的元素可能被认为是“不显示”的，布局树就会少一个，或者有伪元素布局树就会多一个。</p><p><img src="'+n+'" alt="image"></p><h2 id="分层" tabindex="-1">分层 <a class="header-anchor" href="#分层" aria-label="Permalink to &quot;分层&quot;">​</a></h2><p>从下图可以看到，浏览器会对整个布局树进行<strong>分层</strong>。分层的好处在于如果某一个层发生改变之后，仅对当前层做后续处理，从而提升效率。滚动条，<code>transform</code>,<code>opacity</code>等样式都有可能导致结果分层，可以通过<code>will-change</code>来最大程度上的去影响分层结果。</p><p><img src="'+d+'" alt="image"></p><h2 id="绘制" tabindex="-1">绘制 <a class="header-anchor" href="#绘制" aria-label="Permalink to &quot;绘制&quot;">​</a></h2><p>浏览器为每一层生成一系列的绘制指令，类似于用中文来描述就是：**将画笔移动到（10，30）位置，画一个200*300的矩形，用红色填充矩形。**这个类似于Canvas的绘制指令一样。</p><p>至此，渲染主线程的基本工作到此为止，后续的步骤交给其他线程完成。 <img src="'+l+'" alt="image"></p><h2 id="分块" tabindex="-1">分块 <a class="header-anchor" href="#分块" aria-label="Permalink to &quot;分块&quot;">​</a></h2><p>合成线程首先会对每个图层进行分块，将其划分为更多的小型区域。分块工作会占用到多个<strong>分块器</strong>线程来完成。</p><p>分块可以优化后续处理，使得优先绘制视口内的块。</p><p><img src="'+m+'" alt="image"></p><h2 id="光栅化" tabindex="-1">光栅化 <a class="header-anchor" href="#光栅化" aria-label="Permalink to &quot;光栅化&quot;">​</a></h2><p>光栅化将每个块转换为位图，优先处理靠近视口的块。</p><p><img src="'+_+'" alt="image"></p><p>主要是计算每个块内部的像素信息，在这个阶段会切换到GPU进程，GPU进行计算之后返回给合成线程。</p><p><img src="'+h+'" alt="image"></p><h2 id="画" tabindex="-1">画 <a class="header-anchor" href="#画" aria-label="Permalink to &quot;画&quot;">​</a></h2><p>合成线程拿到每个层，每个块的位图之后，生成一个个**指引（quad）**信息。指引会标识出每个位图应该画到屏幕的哪个位置，以及会考虑到旋转，缩放等变形。变形发生在合成线程，与渲染主线程无关，和就是<code>Transform</code>效率高的本质。合成线程会把quad提交给GPU进程，由GPU进程产生系统调用，提交给GPU硬件，完成最终的屏幕图像。</p>',40),b=[u];function q(f,P,T,k,v,M){return e(),t("div",null,b)}const H=a(g,[["render",q]]);export{S as __pageData,H as default};
