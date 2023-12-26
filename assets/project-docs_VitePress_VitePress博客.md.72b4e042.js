import{_ as l,o,c as e,k as s,a as n,t,Q as a}from"./chunks/framework.6d94f49f.js";const c="/assets/github-pages-branch.91ecf690.png",B=JSON.parse('{"title":"光速搭建个人博客","description":"","frontmatter":{},"headers":[],"relativePath":"project-docs/VitePress/VitePress博客.md","filePath":"project-docs/VitePress/VitePress博客.md","lastUpdated":1703607609000}'),r={name:"project-docs/VitePress/VitePress博客.md"},y=a(`<h1 id="光速搭建个人博客" tabindex="-1">光速搭建个人博客 <a class="header-anchor" href="#光速搭建个人博客" aria-label="Permalink to &quot;光速搭建个人博客&quot;">​</a></h1><p><strong>使用VitePress + Github Pages 搭建个人博客网站，并实现自动构建和发布。</strong></p><p>你现在浏览的这个博客就是这样搭建的（其实没什么技术含量，我选择了最简单的方式😝，有👋就行）。</p><h2 id="使用vitepress搭建博客工程" tabindex="-1">使用VitePress搭建博客工程 <a class="header-anchor" href="#使用vitepress搭建博客工程" aria-label="Permalink to &quot;使用VitePress搭建博客工程&quot;">​</a></h2><p>VitePress是一个静态网站生成器，内容使用Markdown语法，配置十分简单，同时附带了非常优美的默认主题，即使不需要写前端代码，也可以生成一个静态网站。底层使用<code>Vite</code>和<code>Vue3</code>，前端开发者可以方便的进行修改或定制。</p><p><a href="https://vitepress.dev/" target="_blank" rel="noreferrer">当然我更喜欢你去直接阅读VitePress的官方文档！</a></p><p>具体编写博客的规则都在文档里面，这里不会细讲，而是说一下如何搭建博客的大致框架～</p><div class="tip custom-block"><p class="custom-block-title">温馨小提示</p><p>一切都以官方文档为准哦😘😘</p></div><h2 id="安装vitepress" tabindex="-1">安装VitePress <a class="header-anchor" href="#安装vitepress" aria-label="Permalink to &quot;安装VitePress&quot;">​</a></h2><p>你最好有以下的一些准备</p><ul><li>Node.js版本必须在18及其以上</li><li>VitePress CLI</li><li>一个支持Markdown语法的编辑器，这个我强推VSCode</li></ul><p>ok😯，here we go!</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">npm</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">add</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-D</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">vitepress</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">npm</span><span style="color:#24292E;"> </span><span style="color:#032F62;">add</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-D</span><span style="color:#24292E;"> </span><span style="color:#032F62;">vitepress</span></span></code></pre></div><p>紧接着</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">npx</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">vitepress</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">init</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">npx</span><span style="color:#24292E;"> </span><span style="color:#032F62;">vitepress</span><span style="color:#24292E;"> </span><span style="color:#032F62;">init</span></span></code></pre></div><p>然后按照下面的方式进行选择</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">┌</span><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">Welcome</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">to</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">VitePress!</span></span>
<span class="line"><span style="color:#B392F0;">│</span></span>
<span class="line"><span style="color:#B392F0;">◇</span><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">Where</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">should</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">VitePress</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">initialize</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">the</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">config?</span></span>
<span class="line"><span style="color:#B392F0;">│</span><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">./docs</span></span>
<span class="line"><span style="color:#B392F0;">│</span></span>
<span class="line"><span style="color:#B392F0;">◇</span><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">Site</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">title:</span></span>
<span class="line"><span style="color:#B392F0;">│</span><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">My</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">Awesome</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">Project</span></span>
<span class="line"><span style="color:#B392F0;">│</span></span>
<span class="line"><span style="color:#B392F0;">◇</span><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">Site</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">description:</span></span>
<span class="line"><span style="color:#B392F0;">│</span><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">A</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">VitePress</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">Site</span></span>
<span class="line"><span style="color:#B392F0;">│</span></span>
<span class="line"><span style="color:#B392F0;">◆</span><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">Theme:</span></span>
<span class="line"><span style="color:#B392F0;">│</span><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">●</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">Default</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">Theme</span><span style="color:#E1E4E8;"> (Out </span><span style="color:#9ECBFF;">of</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">the</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">box,</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">good-looking</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">docs</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#B392F0;">│</span><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">○</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">Default</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">Theme</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">+</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">Customization</span></span>
<span class="line"><span style="color:#B392F0;">│</span><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">○</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">Custom</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">Theme</span></span>
<span class="line"><span style="color:#B392F0;">└</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">┌</span><span style="color:#24292E;">  </span><span style="color:#032F62;">Welcome</span><span style="color:#24292E;"> </span><span style="color:#032F62;">to</span><span style="color:#24292E;"> </span><span style="color:#032F62;">VitePress!</span></span>
<span class="line"><span style="color:#6F42C1;">│</span></span>
<span class="line"><span style="color:#6F42C1;">◇</span><span style="color:#24292E;">  </span><span style="color:#032F62;">Where</span><span style="color:#24292E;"> </span><span style="color:#032F62;">should</span><span style="color:#24292E;"> </span><span style="color:#032F62;">VitePress</span><span style="color:#24292E;"> </span><span style="color:#032F62;">initialize</span><span style="color:#24292E;"> </span><span style="color:#032F62;">the</span><span style="color:#24292E;"> </span><span style="color:#032F62;">config?</span></span>
<span class="line"><span style="color:#6F42C1;">│</span><span style="color:#24292E;">  </span><span style="color:#032F62;">./docs</span></span>
<span class="line"><span style="color:#6F42C1;">│</span></span>
<span class="line"><span style="color:#6F42C1;">◇</span><span style="color:#24292E;">  </span><span style="color:#032F62;">Site</span><span style="color:#24292E;"> </span><span style="color:#032F62;">title:</span></span>
<span class="line"><span style="color:#6F42C1;">│</span><span style="color:#24292E;">  </span><span style="color:#032F62;">My</span><span style="color:#24292E;"> </span><span style="color:#032F62;">Awesome</span><span style="color:#24292E;"> </span><span style="color:#032F62;">Project</span></span>
<span class="line"><span style="color:#6F42C1;">│</span></span>
<span class="line"><span style="color:#6F42C1;">◇</span><span style="color:#24292E;">  </span><span style="color:#032F62;">Site</span><span style="color:#24292E;"> </span><span style="color:#032F62;">description:</span></span>
<span class="line"><span style="color:#6F42C1;">│</span><span style="color:#24292E;">  </span><span style="color:#032F62;">A</span><span style="color:#24292E;"> </span><span style="color:#032F62;">VitePress</span><span style="color:#24292E;"> </span><span style="color:#032F62;">Site</span></span>
<span class="line"><span style="color:#6F42C1;">│</span></span>
<span class="line"><span style="color:#6F42C1;">◆</span><span style="color:#24292E;">  </span><span style="color:#032F62;">Theme:</span></span>
<span class="line"><span style="color:#6F42C1;">│</span><span style="color:#24292E;">  </span><span style="color:#032F62;">●</span><span style="color:#24292E;"> </span><span style="color:#032F62;">Default</span><span style="color:#24292E;"> </span><span style="color:#032F62;">Theme</span><span style="color:#24292E;"> (Out </span><span style="color:#032F62;">of</span><span style="color:#24292E;"> </span><span style="color:#032F62;">the</span><span style="color:#24292E;"> </span><span style="color:#032F62;">box,</span><span style="color:#24292E;"> </span><span style="color:#032F62;">good-looking</span><span style="color:#24292E;"> </span><span style="color:#032F62;">docs</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#6F42C1;">│</span><span style="color:#24292E;">  </span><span style="color:#032F62;">○</span><span style="color:#24292E;"> </span><span style="color:#032F62;">Default</span><span style="color:#24292E;"> </span><span style="color:#032F62;">Theme</span><span style="color:#24292E;"> </span><span style="color:#032F62;">+</span><span style="color:#24292E;"> </span><span style="color:#032F62;">Customization</span></span>
<span class="line"><span style="color:#6F42C1;">│</span><span style="color:#24292E;">  </span><span style="color:#032F62;">○</span><span style="color:#24292E;"> </span><span style="color:#032F62;">Custom</span><span style="color:#24292E;"> </span><span style="color:#032F62;">Theme</span></span>
<span class="line"><span style="color:#6F42C1;">└</span></span></code></pre></div><p>基本的项目结构就有了，现在可以看到最后的文件结构是这样的⬇️⬇️</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">.</span></span>
<span class="line"><span style="color:#e1e4e8;">├─ docs</span></span>
<span class="line"><span style="color:#e1e4e8;">│  ├─ .vitepress</span></span>
<span class="line"><span style="color:#e1e4e8;">│  │  └─ config.js</span></span>
<span class="line"><span style="color:#e1e4e8;">│  ├─ api-examples.md</span></span>
<span class="line"><span style="color:#e1e4e8;">│  ├─ markdown-examples.md</span></span>
<span class="line"><span style="color:#e1e4e8;">│  └─ index.md</span></span>
<span class="line"><span style="color:#e1e4e8;">└─ package.json</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">.</span></span>
<span class="line"><span style="color:#24292e;">├─ docs</span></span>
<span class="line"><span style="color:#24292e;">│  ├─ .vitepress</span></span>
<span class="line"><span style="color:#24292e;">│  │  └─ config.js</span></span>
<span class="line"><span style="color:#24292e;">│  ├─ api-examples.md</span></span>
<span class="line"><span style="color:#24292e;">│  ├─ markdown-examples.md</span></span>
<span class="line"><span style="color:#24292e;">│  └─ index.md</span></span>
<span class="line"><span style="color:#24292e;">└─ package.json</span></span></code></pre></div><p>进入package.json之后，就可以看到对应的脚本命令了，这里简陈述一下其作用：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"># 安装依赖</span></span>
<span class="line"><span style="color:#e1e4e8;">pnpm install</span></span>
<span class="line"><span style="color:#e1e4e8;"># 开发模式启动</span></span>
<span class="line"><span style="color:#e1e4e8;">pnpm docs:dev</span></span>
<span class="line"><span style="color:#e1e4e8;"># 手动构建</span></span>
<span class="line"><span style="color:#e1e4e8;">pnpm docs:build</span></span>
<span class="line"><span style="color:#e1e4e8;"># 预览构建成果</span></span>
<span class="line"><span style="color:#e1e4e8;">pnpm docs:preview</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"># 安装依赖</span></span>
<span class="line"><span style="color:#24292e;">pnpm install</span></span>
<span class="line"><span style="color:#24292e;"># 开发模式启动</span></span>
<span class="line"><span style="color:#24292e;">pnpm docs:dev</span></span>
<span class="line"><span style="color:#24292e;"># 手动构建</span></span>
<span class="line"><span style="color:#24292e;">pnpm docs:build</span></span>
<span class="line"><span style="color:#24292e;"># 预览构建成果</span></span>
<span class="line"><span style="color:#24292e;">pnpm docs:preview</span></span></code></pre></div><h2 id="基本的文档结构" tabindex="-1">基本的文档结构 <a class="header-anchor" href="#基本的文档结构" aria-label="Permalink to &quot;基本的文档结构&quot;">​</a></h2><p>每个人都应该会有自己的文档结构，这里我简单贴一下我的项目结构，仅供参考😊😊</p><div class="language-txt vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">txt</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">jzplp.github.io</span></span>
<span class="line"><span style="color:#e1e4e8;">├─.github           # github配置(可选)</span></span>
<span class="line"><span style="color:#e1e4e8;">│  └─workflows      # 自动构建部署配置</span></span>
<span class="line"><span style="color:#e1e4e8;">├─components        # vue组件(可选)</span></span>
<span class="line"><span style="color:#e1e4e8;">├─docs              # 博客内容</span></span>
<span class="line"><span style="color:#e1e4e8;">│   ├─.vitepress    </span></span>
<span class="line"><span style="color:#e1e4e8;">│   │  ├─config.ts  # vitepress配置</span></span>
<span class="line"><span style="color:#e1e4e8;">│   │  ├─cache      # 缓存文件，可忽略提交</span></span>
<span class="line"><span style="color:#e1e4e8;">│   │  ├─dist       # 构建包，可忽略提交</span></span>
<span class="line"><span style="color:#e1e4e8;">│   │  └─theme      # 样式和主题</span></span>
<span class="line"><span style="color:#e1e4e8;">│   ├─index.md      # 博客首页</span></span>
<span class="line"><span style="color:#e1e4e8;">│   ├─some-docs     # 按照各种名称分类的博客</span></span>
<span class="line"><span style="color:#e1e4e8;">│   ├─any-docs</span></span>
<span class="line"><span style="color:#e1e4e8;">│   ├─...           # 更多博客目录</span></span>
<span class="line"><span style="color:#e1e4e8;">│   └─public        # 博客使用的静态资源</span></span>
<span class="line"><span style="color:#e1e4e8;">├─node_modules      # 依赖目录，可忽略提交</span></span>
<span class="line"><span style="color:#e1e4e8;">├─.gitignore        # git提交忽略配置</span></span>
<span class="line"><span style="color:#e1e4e8;">├─package.json      # node.js配置</span></span>
<span class="line"><span style="color:#e1e4e8;">└─README.md         # 工程说明</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">jzplp.github.io</span></span>
<span class="line"><span style="color:#24292e;">├─.github           # github配置(可选)</span></span>
<span class="line"><span style="color:#24292e;">│  └─workflows      # 自动构建部署配置</span></span>
<span class="line"><span style="color:#24292e;">├─components        # vue组件(可选)</span></span>
<span class="line"><span style="color:#24292e;">├─docs              # 博客内容</span></span>
<span class="line"><span style="color:#24292e;">│   ├─.vitepress    </span></span>
<span class="line"><span style="color:#24292e;">│   │  ├─config.ts  # vitepress配置</span></span>
<span class="line"><span style="color:#24292e;">│   │  ├─cache      # 缓存文件，可忽略提交</span></span>
<span class="line"><span style="color:#24292e;">│   │  ├─dist       # 构建包，可忽略提交</span></span>
<span class="line"><span style="color:#24292e;">│   │  └─theme      # 样式和主题</span></span>
<span class="line"><span style="color:#24292e;">│   ├─index.md      # 博客首页</span></span>
<span class="line"><span style="color:#24292e;">│   ├─some-docs     # 按照各种名称分类的博客</span></span>
<span class="line"><span style="color:#24292e;">│   ├─any-docs</span></span>
<span class="line"><span style="color:#24292e;">│   ├─...           # 更多博客目录</span></span>
<span class="line"><span style="color:#24292e;">│   └─public        # 博客使用的静态资源</span></span>
<span class="line"><span style="color:#24292e;">├─node_modules      # 依赖目录，可忽略提交</span></span>
<span class="line"><span style="color:#24292e;">├─.gitignore        # git提交忽略配置</span></span>
<span class="line"><span style="color:#24292e;">├─package.json      # node.js配置</span></span>
<span class="line"><span style="color:#24292e;">└─README.md         # 工程说明</span></span></code></pre></div><h2 id="部署到github-pages上" tabindex="-1">部署到github pages上 <a class="header-anchor" href="#部署到github-pages上" aria-label="Permalink to &quot;部署到github pages上&quot;">​</a></h2>`,25),E=s("code",null,"await",-1),i=s("code",null,"await.github.io",-1),d=a(`<p>创建仓库后，直接将你创建好的博客工程上传到GitHub的仓库上。千万不要把<code>node_modules</code>传上去啊，所以需要在工程根目录下创建<code>.gitignore</code>，写入要忽略提交的文件，再进行上传。</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">node_modules</span></span>
<span class="line"><span style="color:#B392F0;">docs/.vitepress/cache</span></span>
<span class="line"><span style="color:#B392F0;">docs/.vitepress/dist</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">node_modules</span></span>
<span class="line"><span style="color:#6F42C1;">docs/.vitepress/cache</span></span>
<span class="line"><span style="color:#6F42C1;">docs/.vitepress/dist</span></span></code></pre></div><p>这里也要把构建后的<code>dist</code>目录的内容也忽略了，因为这个主分支<code>master</code>只用于存放源码，构建后的文档会在后续内容放在另外一个分支中。</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">git</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">remote</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">add</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;远程仓库地址&quot;</span></span>
<span class="line"><span style="color:#B392F0;">git</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">add</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">.</span></span>
<span class="line"><span style="color:#B392F0;">git</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">commit</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-m</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;创建博客工程&quot;</span></span>
<span class="line"><span style="color:#B392F0;">git</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">push</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">git</span><span style="color:#24292E;"> </span><span style="color:#032F62;">remote</span><span style="color:#24292E;"> </span><span style="color:#032F62;">add</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;远程仓库地址&quot;</span></span>
<span class="line"><span style="color:#6F42C1;">git</span><span style="color:#24292E;"> </span><span style="color:#032F62;">add</span><span style="color:#24292E;"> </span><span style="color:#032F62;">.</span></span>
<span class="line"><span style="color:#6F42C1;">git</span><span style="color:#24292E;"> </span><span style="color:#032F62;">commit</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-m</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;创建博客工程&quot;</span></span>
<span class="line"><span style="color:#6F42C1;">git</span><span style="color:#24292E;"> </span><span style="color:#032F62;">push</span></span></code></pre></div><div class="warning custom-block"><p class="custom-block-title">注意！</p><p>这里我很默认你已经无比懂git了</p></div><p>就在刚才，其实我们只是上传了工程的源代码。对于打包构建好的结果，也需要进行上传，最后才能发布到博客网站上。你还需要执行下面这些命令⬇️</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">npm</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">docs:build</span></span>
<span class="line"><span style="color:#79B8FF;">cd</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">docs/.vitepress/dist</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">git</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">init</span></span>
<span class="line"><span style="color:#B392F0;">git</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">add</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-A</span></span>
<span class="line"><span style="color:#B392F0;">git</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">commit</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-m</span><span style="color:#9ECBFF;">&quot;给我狠狠地提交&quot;</span></span>
<span class="line"><span style="color:#B392F0;">git</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">push</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-f</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">https://github.com/await/await.github.io.git</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">master:gh-pages</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">npm</span><span style="color:#24292E;"> </span><span style="color:#032F62;">docs:build</span></span>
<span class="line"><span style="color:#005CC5;">cd</span><span style="color:#24292E;"> </span><span style="color:#032F62;">docs/.vitepress/dist</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">git</span><span style="color:#24292E;"> </span><span style="color:#032F62;">init</span></span>
<span class="line"><span style="color:#6F42C1;">git</span><span style="color:#24292E;"> </span><span style="color:#032F62;">add</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-A</span></span>
<span class="line"><span style="color:#6F42C1;">git</span><span style="color:#24292E;"> </span><span style="color:#032F62;">commit</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-m</span><span style="color:#032F62;">&quot;给我狠狠地提交&quot;</span></span>
<span class="line"><span style="color:#6F42C1;">git</span><span style="color:#24292E;"> </span><span style="color:#032F62;">push</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-f</span><span style="color:#24292E;"> </span><span style="color:#032F62;">https://github.com/await/await.github.io.git</span><span style="color:#24292E;"> </span><span style="color:#032F62;">master:gh-pages</span></span></code></pre></div><p><strong>记得push的地址填你自己的github地址</strong></p><p>上面的命令就是干了这么两件事</p><ul><li>构建了工程，生成了dist，并进入到dist目录</li><li>将dist目录中的内容上传到<code>gh-pages</code>分支中</li></ul><p>OK，大的要来了，进入创建的GitHub仓库的配置，具体位置在<code>Setting -&gt; Pages -&gt; Build and deployment -&gt; Source</code>。来源选择<code>Deploy from a branch</code>，既一个分支。</p><p>旋转刚刚上传上来的<code>gh-pages</code>分支，根目录，保存save！！</p><p><img src="`+c+`" alt="github-pages图例"></p><h2 id="实现自动化部署" tabindex="-1">实现自动化部署 <a class="header-anchor" href="#实现自动化部署" aria-label="Permalink to &quot;实现自动化部署&quot;">​</a></h2><p>使用上面的描述方法，会发现每次写完博客之后，提交工程代码后，还需要手动👋构建，更新分支并发布。构建过程在本地电脑上。</p><p>但是使用GitHub Actions就能做到这一点，而且GitHub提供了服务器，所以可以把构建过程放到服务器来做。</p><p>首先创建配置文件，位置在<code>.github/workflows/deploy.yml</code></p><div class="language-yml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;"># Sample workflow for building and deploying a VitePress site to GitHub Pages</span></span>
<span class="line"><span style="color:#6A737D;">#</span></span>
<span class="line"><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">Deploy VitePress site to Pages</span></span>
<span class="line"></span>
<span class="line"><span style="color:#79B8FF;">on</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;"># Runs on pushes targeting the \`main\` branch. Change this to \`master\` if you&#39;re</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;"># using the \`master\` branch as the default branch.</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">push</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">branches</span><span style="color:#E1E4E8;">: [</span><span style="color:#9ECBFF;">&quot;master&quot;</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;"># Allows you to run this workflow manually from the Actions tab</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">workflow_dispatch</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># Sets permissions of the GITHUB_TOKEN to allow deployment to GitHub Pages</span></span>
<span class="line"><span style="color:#85E89D;">permissions</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">contents</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">read</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">pages</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">write</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">id-token</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">write</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># Allow only one concurrent deployment, skipping runs queued between the run in-progress and latest queued.</span></span>
<span class="line"><span style="color:#6A737D;"># However, do NOT cancel in-progress runs as we want to allow these production deployments to complete.</span></span>
<span class="line"><span style="color:#85E89D;">concurrency</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">group</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">pages</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">cancel-in-progress</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">false</span></span>
<span class="line"></span>
<span class="line"><span style="color:#85E89D;">jobs</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;"># Build job</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">build</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">runs-on</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">ubuntu-latest</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">steps</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">Checkout</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">uses</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">actions/checkout@v3</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">with</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">fetch-depth</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;"># Not needed if lastUpdated is not enabled</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;"># - uses: pnpm/action-setup@v2 # Uncomment this if you&#39;re using pnpm</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;"># - uses: oven-sh/setup-bun@v1 # Uncomment this if you&#39;re using Bun</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">Setup Node</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">uses</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">actions/setup-node@v3</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">with</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">node-version</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">18</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">cache</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">npm</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;"># or pnpm / yarn</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">Setup Pages</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">uses</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">actions/configure-pages@v3</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">Install dependencies</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">run</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">npm ci</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;"># or pnpm install / yarn install / bun install</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">Build with VitePress</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">run</span><span style="color:#E1E4E8;">:  </span><span style="color:#9ECBFF;">npm run docs:build</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">Upload artifact</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">uses</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">actions/upload-pages-artifact@v2</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">with</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">path</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">docs/.vitepress/dist</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;"># Deployment job</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">deploy</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">environment</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">github-pages</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">url</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">\${{ steps.deployment.outputs.page_url }}</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">needs</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">build</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">runs-on</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">ubuntu-latest</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">Deploy</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">steps</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">Deploy to GitHub Pages</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">id</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">deployment</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">uses</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">actions/deploy-pages@v2</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># Sample workflow for building and deploying a VitePress site to GitHub Pages</span></span>
<span class="line"><span style="color:#6A737D;">#</span></span>
<span class="line"><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">Deploy VitePress site to Pages</span></span>
<span class="line"></span>
<span class="line"><span style="color:#005CC5;">on</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;"># Runs on pushes targeting the \`main\` branch. Change this to \`master\` if you&#39;re</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;"># using the \`master\` branch as the default branch.</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">push</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">branches</span><span style="color:#24292E;">: [</span><span style="color:#032F62;">&quot;master&quot;</span><span style="color:#24292E;">]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;"># Allows you to run this workflow manually from the Actions tab</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">workflow_dispatch</span><span style="color:#24292E;">:</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># Sets permissions of the GITHUB_TOKEN to allow deployment to GitHub Pages</span></span>
<span class="line"><span style="color:#22863A;">permissions</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">contents</span><span style="color:#24292E;">: </span><span style="color:#032F62;">read</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">pages</span><span style="color:#24292E;">: </span><span style="color:#032F62;">write</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">id-token</span><span style="color:#24292E;">: </span><span style="color:#032F62;">write</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># Allow only one concurrent deployment, skipping runs queued between the run in-progress and latest queued.</span></span>
<span class="line"><span style="color:#6A737D;"># However, do NOT cancel in-progress runs as we want to allow these production deployments to complete.</span></span>
<span class="line"><span style="color:#22863A;">concurrency</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">group</span><span style="color:#24292E;">: </span><span style="color:#032F62;">pages</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">cancel-in-progress</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">false</span></span>
<span class="line"></span>
<span class="line"><span style="color:#22863A;">jobs</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;"># Build job</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">build</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">runs-on</span><span style="color:#24292E;">: </span><span style="color:#032F62;">ubuntu-latest</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">steps</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">Checkout</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">uses</span><span style="color:#24292E;">: </span><span style="color:#032F62;">actions/checkout@v3</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">with</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">fetch-depth</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">0</span><span style="color:#24292E;"> </span><span style="color:#6A737D;"># Not needed if lastUpdated is not enabled</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;"># - uses: pnpm/action-setup@v2 # Uncomment this if you&#39;re using pnpm</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;"># - uses: oven-sh/setup-bun@v1 # Uncomment this if you&#39;re using Bun</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">Setup Node</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">uses</span><span style="color:#24292E;">: </span><span style="color:#032F62;">actions/setup-node@v3</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">with</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">node-version</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">18</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">cache</span><span style="color:#24292E;">: </span><span style="color:#032F62;">npm</span><span style="color:#24292E;"> </span><span style="color:#6A737D;"># or pnpm / yarn</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">Setup Pages</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">uses</span><span style="color:#24292E;">: </span><span style="color:#032F62;">actions/configure-pages@v3</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">Install dependencies</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">run</span><span style="color:#24292E;">: </span><span style="color:#032F62;">npm ci</span><span style="color:#24292E;"> </span><span style="color:#6A737D;"># or pnpm install / yarn install / bun install</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">Build with VitePress</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">run</span><span style="color:#24292E;">:  </span><span style="color:#032F62;">npm run docs:build</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">Upload artifact</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">uses</span><span style="color:#24292E;">: </span><span style="color:#032F62;">actions/upload-pages-artifact@v2</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">with</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">path</span><span style="color:#24292E;">: </span><span style="color:#032F62;">docs/.vitepress/dist</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;"># Deployment job</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">deploy</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">environment</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">github-pages</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">url</span><span style="color:#24292E;">: </span><span style="color:#032F62;">\${{ steps.deployment.outputs.page_url }}</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">needs</span><span style="color:#24292E;">: </span><span style="color:#032F62;">build</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">runs-on</span><span style="color:#24292E;">: </span><span style="color:#032F62;">ubuntu-latest</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">Deploy</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">steps</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">Deploy to GitHub Pages</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">id</span><span style="color:#24292E;">: </span><span style="color:#032F62;">deployment</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">uses</span><span style="color:#24292E;">: </span><span style="color:#032F62;">actions/deploy-pages@v2</span></span></code></pre></div><p>GitHub Actions的环境中提供了很多预置的配置和工具，例如Node.js，pnpm等等，我们直接使用即可。如果你的配置和文中上述流程一致，那么直接复制该文件内容到你的工程即可。之后上传到工程代码GitHub仓库中。如果想了解更多，可以参考<a href="https://docs.github.com/zh/actions" target="_blank" rel="noreferrer">GitHub Actions文档</a>以及其他人的配置。</p><p>最后记得回到老地方<code>Settings -&gt; Pages -&gt; Build and deployment -&gt; Source</code>。将之前设置的<code>Deploy from a branch</code>，修改为<code>GitHub Actions</code></p><p>做完操作后，每次写完博客，将工程代码push到Github仓库之后，GitHub会自动触发构建和发布流程，从而更新博客网站。</p><h2 id="参考文章" tabindex="-1">参考文章 <a class="header-anchor" href="#参考文章" aria-label="Permalink to &quot;参考文章&quot;">​</a></h2><ul><li><p><a href="https://juejin.cn/post/7235513984555384892" target="_blank" rel="noreferrer">使用VitePress和Github搭建个人博客网站，可以自动构建和发布</a></p></li><li><p><a href="https://juejin.cn/post/7250834083046621241" target="_blank" rel="noreferrer">快速给个人网站集成评论功能</a></p></li></ul>`,23);function F(p,u,h,g,m,C){return o(),e("div",null,[y,s("p",null,[n("在GitHub上创建仓库，对于名称有特殊套要求，为"),s("code",null,t(p.用户名)+".github.io",1),n("。例如我的用户名叫"),E,n("，那么仓库名就应该为"),i]),d])}const v=l(r,[["render",F]]);export{B as __pageData,v as default};
