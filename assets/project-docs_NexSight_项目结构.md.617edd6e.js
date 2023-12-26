import{_ as s,o as n,c as a,Q as e}from"./chunks/framework.6d94f49f.js";const m=JSON.parse('{"title":"项目结构","description":"","frontmatter":{},"headers":[],"relativePath":"project-docs/NexSight/项目结构.md","filePath":"project-docs/NexSight/项目结构.md","lastUpdated":1700217325000}'),l={name:"project-docs/NexSight/项目结构.md"},p=e(`<h1 id="项目结构" tabindex="-1">项目结构 <a class="header-anchor" href="#项目结构" aria-label="Permalink to &quot;项目结构&quot;">​</a></h1><p>项目基本结构如下所示⬇️</p><p>这对其中主要的文件进行介绍，还有很多配置文件没有在结构中表现出来😛</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">--- src</span></span>
<span class="line"><span style="color:#e1e4e8;">	 |--- assets  // 存放静态资源文件</span></span>
<span class="line"><span style="color:#e1e4e8;">		 				|--- css // css文件</span></span>
<span class="line"><span style="color:#e1e4e8;">		 				|--- data // 静态数据 新手教程</span></span>
<span class="line"><span style="color:#e1e4e8;">									|--- guide</span></span>
<span class="line"><span style="color:#e1e4e8;">		 				|--- img	// 图片资源</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">     |--- components // 存放vue相关组件</span></span>
<span class="line"><span style="color:#e1e4e8;">          	|--- PicUploader     // 图片上传组件</span></span>
<span class="line"><span style="color:#e1e4e8;">          	|--- ContextMenu     // 右键菜单组件</span></span>
<span class="line"><span style="color:#e1e4e8;">          	|--- Hamburger			 // 面包屑组件</span></span>
<span class="line"><span style="color:#e1e4e8;">          	|--- JointSelector   // 联合筛选组件</span></span>
<span class="line"><span style="color:#e1e4e8;">            |--- StatusTag       // 状态标签组件</span></span>
<span class="line"><span style="color:#e1e4e8;">            |--- Guides          // 新手引导组件</span></span>
<span class="line"><span style="color:#e1e4e8;">            |--- ....</span></span>
<span class="line"><span style="color:#e1e4e8;">          	....</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">  	 |--- directive // 存放vue自定义指令</span></span>
<span class="line"><span style="color:#e1e4e8;">          	|--- aqmoudule.js       // 模块区分指令</span></span>
<span class="line"><span style="color:#e1e4e8;">          	|--- floatimg.js	    // 浮动图片指令</span></span>
<span class="line"><span style="color:#e1e4e8;">          	|--- floatvideo.js      // 浮动视频指令</span></span>
<span class="line"><span style="color:#e1e4e8;">          	|--- selectloadmore.js  // 选择下拉框加载更多样式指令</span></span>
<span class="line"><span style="color:#e1e4e8;">            |--- ...</span></span>
<span class="line"><span style="color:#e1e4e8;">            ...</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">     |--- hooks // 存放vue组合式函数(mixins)</span></span>
<span class="line"><span style="color:#e1e4e8;">          	|--- commonhook.js      // 公共hook</span></span>
<span class="line"><span style="color:#e1e4e8;">          	|--- downloadhook.js    // 下载工具hook</span></span>
<span class="line"><span style="color:#e1e4e8;">            |--- mqtt.js            // mqtt服务端客户端通信hook</span></span>
<span class="line"><span style="color:#e1e4e8;">            |--- picSelector.js     // 图片选择逻辑封装hook</span></span>
<span class="line"><span style="color:#e1e4e8;">            |--- ...</span></span>
<span class="line"><span style="color:#e1e4e8;">            ...</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">     |--- router // 存放vue路由相关</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">     |--- store  // 存放vue公共状态</span></span>
<span class="line"><span style="color:#e1e4e8;">          	|--- config.js          // 处理模型生成的参数公共状态</span></span>
<span class="line"><span style="color:#e1e4e8;">          	|--- download.js        // 处理模型导出及下载公共状态</span></span>
<span class="line"><span style="color:#e1e4e8;">          	|--- galleries.js       // 处理图集及图库服务公共状态</span></span>
<span class="line"><span style="color:#e1e4e8;">          	|--- message.js         // 处理站内信消息公共状态</span></span>
<span class="line"><span style="color:#e1e4e8;">          	|--- model.js		    // 处理具体模型相关公共状态</span></span>
<span class="line"><span style="color:#e1e4e8;">          	|--- project.js			// 处理工程管理工程图像公共状态</span></span>
<span class="line"><span style="color:#e1e4e8;">          	|--- system.js			// 处理系统级别的公共状态，如路由信息，菜单信息...</span></span>
<span class="line"><span style="color:#e1e4e8;">          	|--- validate.js		// 处理模型验证任务公共状态</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">  	 |--- utils  // 存放工具函数与数据</span></span>
<span class="line"><span style="color:#e1e4e8;">          	|--- axios.js           // 处理网络请求公共配置</span></span>
<span class="line"><span style="color:#e1e4e8;">          	|--- staticData.js		// 存储全局的静态工具数据</span></span>
<span class="line"><span style="color:#e1e4e8;">          	|--- utils.js			// 存储全局的工具函数</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">     |--- views  // 存放vue页面级组件</span></span>
<span class="line"><span style="color:#e1e4e8;">          	|--- App.vue            // 根页面</span></span>
<span class="line"><span style="color:#e1e4e8;">          	|--- DataManage  				// 数据管理(图片，图集)</span></span>
<span class="line"><span style="color:#e1e4e8;">                  	|--- images.vue   </span></span>
<span class="line"><span style="color:#e1e4e8;">                  	|--- galleries.vue</span></span>
<span class="line"><span style="color:#e1e4e8;">          	|--- OperationDocument  // 操作文档</span></span>
<span class="line"><span style="color:#e1e4e8;">          	|--- Overview           // 总览页</span></span>
<span class="line"><span style="color:#e1e4e8;">          	|--- Project            // 工程相关</span></span>
<span class="line"><span style="color:#e1e4e8;">	                |--- index.vue        // 工程列表页</span></span>
<span class="line"><span style="color:#e1e4e8;">                  	|--- create.vue       // 创建工程页</span></span>
<span class="line"><span style="color:#e1e4e8;">                  	|--- id.vue           // 工程详情页</span></span>
<span class="line"><span style="color:#e1e4e8;">                    |--- recycle.vue	  // 工程回收站页</span></span>
<span class="line"><span style="color:#e1e4e8;">                  	|--- ImageAnnotation  // 在线标注页</span></span>
<span class="line"><span style="color:#e1e4e8;">                    |--- Preprocessing    // 前置处理页</span></span>
<span class="line"><span style="color:#e1e4e8;">                  	|--- ModelGenerate    // 模型生成页</span></span>
<span class="line"><span style="color:#e1e4e8;">                  	|--- ModelEvaluation  // 模型评估页</span></span>
<span class="line"><span style="color:#e1e4e8;">                    |--- ModelValidate    // 模型验证页</span></span>
<span class="line"><span style="color:#e1e4e8;">                  	|--- ModelDeploy      // 模型部署页</span></span>
<span class="line"><span style="color:#e1e4e8;">                  	|--- TaskManagement   // 任务管理页</span></span>
<span class="line"><span style="color:#e1e4e8;">            |--- UserCenter               // 用户中心页</span></span>
<span class="line"><span style="color:#e1e4e8;">          	|--- login-redirect.vue       // 登录中转页</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">      |--- workers                       // 存放工作者线程</span></span>
<span class="line"><span style="color:#e1e4e8;">           |--- BmfWorker.js             // 计算文件md5的webWorker</span></span>
<span class="line"><span style="color:#e1e4e8;">           |--- MqttWorker.js            // 统一管理多页面mqtt通信的ShaderedWorker</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">      |--- main.js                       // 入口文件</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">--- .env.development                     // vite 开发环境变量文件</span></span>
<span class="line"><span style="color:#e1e4e8;">--- .env.production						 // vite 生产环境变量文件</span></span>
<span class="line"><span style="color:#e1e4e8;">--- ...</span></span>
<span class="line"><span style="color:#e1e4e8;">...</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">--- src</span></span>
<span class="line"><span style="color:#24292e;">	 |--- assets  // 存放静态资源文件</span></span>
<span class="line"><span style="color:#24292e;">		 				|--- css // css文件</span></span>
<span class="line"><span style="color:#24292e;">		 				|--- data // 静态数据 新手教程</span></span>
<span class="line"><span style="color:#24292e;">									|--- guide</span></span>
<span class="line"><span style="color:#24292e;">		 				|--- img	// 图片资源</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">     |--- components // 存放vue相关组件</span></span>
<span class="line"><span style="color:#24292e;">          	|--- PicUploader     // 图片上传组件</span></span>
<span class="line"><span style="color:#24292e;">          	|--- ContextMenu     // 右键菜单组件</span></span>
<span class="line"><span style="color:#24292e;">          	|--- Hamburger			 // 面包屑组件</span></span>
<span class="line"><span style="color:#24292e;">          	|--- JointSelector   // 联合筛选组件</span></span>
<span class="line"><span style="color:#24292e;">            |--- StatusTag       // 状态标签组件</span></span>
<span class="line"><span style="color:#24292e;">            |--- Guides          // 新手引导组件</span></span>
<span class="line"><span style="color:#24292e;">            |--- ....</span></span>
<span class="line"><span style="color:#24292e;">          	....</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">  	 |--- directive // 存放vue自定义指令</span></span>
<span class="line"><span style="color:#24292e;">          	|--- aqmoudule.js       // 模块区分指令</span></span>
<span class="line"><span style="color:#24292e;">          	|--- floatimg.js	    // 浮动图片指令</span></span>
<span class="line"><span style="color:#24292e;">          	|--- floatvideo.js      // 浮动视频指令</span></span>
<span class="line"><span style="color:#24292e;">          	|--- selectloadmore.js  // 选择下拉框加载更多样式指令</span></span>
<span class="line"><span style="color:#24292e;">            |--- ...</span></span>
<span class="line"><span style="color:#24292e;">            ...</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">     |--- hooks // 存放vue组合式函数(mixins)</span></span>
<span class="line"><span style="color:#24292e;">          	|--- commonhook.js      // 公共hook</span></span>
<span class="line"><span style="color:#24292e;">          	|--- downloadhook.js    // 下载工具hook</span></span>
<span class="line"><span style="color:#24292e;">            |--- mqtt.js            // mqtt服务端客户端通信hook</span></span>
<span class="line"><span style="color:#24292e;">            |--- picSelector.js     // 图片选择逻辑封装hook</span></span>
<span class="line"><span style="color:#24292e;">            |--- ...</span></span>
<span class="line"><span style="color:#24292e;">            ...</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">     |--- router // 存放vue路由相关</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">     |--- store  // 存放vue公共状态</span></span>
<span class="line"><span style="color:#24292e;">          	|--- config.js          // 处理模型生成的参数公共状态</span></span>
<span class="line"><span style="color:#24292e;">          	|--- download.js        // 处理模型导出及下载公共状态</span></span>
<span class="line"><span style="color:#24292e;">          	|--- galleries.js       // 处理图集及图库服务公共状态</span></span>
<span class="line"><span style="color:#24292e;">          	|--- message.js         // 处理站内信消息公共状态</span></span>
<span class="line"><span style="color:#24292e;">          	|--- model.js		    // 处理具体模型相关公共状态</span></span>
<span class="line"><span style="color:#24292e;">          	|--- project.js			// 处理工程管理工程图像公共状态</span></span>
<span class="line"><span style="color:#24292e;">          	|--- system.js			// 处理系统级别的公共状态，如路由信息，菜单信息...</span></span>
<span class="line"><span style="color:#24292e;">          	|--- validate.js		// 处理模型验证任务公共状态</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">  	 |--- utils  // 存放工具函数与数据</span></span>
<span class="line"><span style="color:#24292e;">          	|--- axios.js           // 处理网络请求公共配置</span></span>
<span class="line"><span style="color:#24292e;">          	|--- staticData.js		// 存储全局的静态工具数据</span></span>
<span class="line"><span style="color:#24292e;">          	|--- utils.js			// 存储全局的工具函数</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">     |--- views  // 存放vue页面级组件</span></span>
<span class="line"><span style="color:#24292e;">          	|--- App.vue            // 根页面</span></span>
<span class="line"><span style="color:#24292e;">          	|--- DataManage  				// 数据管理(图片，图集)</span></span>
<span class="line"><span style="color:#24292e;">                  	|--- images.vue   </span></span>
<span class="line"><span style="color:#24292e;">                  	|--- galleries.vue</span></span>
<span class="line"><span style="color:#24292e;">          	|--- OperationDocument  // 操作文档</span></span>
<span class="line"><span style="color:#24292e;">          	|--- Overview           // 总览页</span></span>
<span class="line"><span style="color:#24292e;">          	|--- Project            // 工程相关</span></span>
<span class="line"><span style="color:#24292e;">	                |--- index.vue        // 工程列表页</span></span>
<span class="line"><span style="color:#24292e;">                  	|--- create.vue       // 创建工程页</span></span>
<span class="line"><span style="color:#24292e;">                  	|--- id.vue           // 工程详情页</span></span>
<span class="line"><span style="color:#24292e;">                    |--- recycle.vue	  // 工程回收站页</span></span>
<span class="line"><span style="color:#24292e;">                  	|--- ImageAnnotation  // 在线标注页</span></span>
<span class="line"><span style="color:#24292e;">                    |--- Preprocessing    // 前置处理页</span></span>
<span class="line"><span style="color:#24292e;">                  	|--- ModelGenerate    // 模型生成页</span></span>
<span class="line"><span style="color:#24292e;">                  	|--- ModelEvaluation  // 模型评估页</span></span>
<span class="line"><span style="color:#24292e;">                    |--- ModelValidate    // 模型验证页</span></span>
<span class="line"><span style="color:#24292e;">                  	|--- ModelDeploy      // 模型部署页</span></span>
<span class="line"><span style="color:#24292e;">                  	|--- TaskManagement   // 任务管理页</span></span>
<span class="line"><span style="color:#24292e;">            |--- UserCenter               // 用户中心页</span></span>
<span class="line"><span style="color:#24292e;">          	|--- login-redirect.vue       // 登录中转页</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">      |--- workers                       // 存放工作者线程</span></span>
<span class="line"><span style="color:#24292e;">           |--- BmfWorker.js             // 计算文件md5的webWorker</span></span>
<span class="line"><span style="color:#24292e;">           |--- MqttWorker.js            // 统一管理多页面mqtt通信的ShaderedWorker</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">      |--- main.js                       // 入口文件</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">--- .env.development                     // vite 开发环境变量文件</span></span>
<span class="line"><span style="color:#24292e;">--- .env.production						 // vite 生产环境变量文件</span></span>
<span class="line"><span style="color:#24292e;">--- ...</span></span>
<span class="line"><span style="color:#24292e;">...</span></span></code></pre></div>`,4),t=[p];function o(c,r,i,y,d,u){return n(),a("div",null,t)}const j=s(l,[["render",o]]);export{m as __pageData,j as default};
