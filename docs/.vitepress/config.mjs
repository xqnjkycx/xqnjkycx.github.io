import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "await-docs",
  titleTemplate: "welcome!",
  description: "front-web docs",
  lastUpdated: true,
  themeConfig: {
    logo: '/logo.png',
    nav: [
      { text: '主页', link: '/' },
      { text: 'TypeScript笔记', link: '/typescript-docs/基础类型' }, 
      {
        text: '性能优化',
        items: [
          {
            text:'性能优化基础',
            link:'/performance-docs/foundation/index'
          },{
            text:'性能优化进阶',
            link:'/performance-docs/advanced/web-vitals.md'
          }
        ]
      }, {
        text: 'NodeJS',
        items:[
          {
            text:'深入浅出NodeJS',
            link: '/nodejs-docs/深入浅出NodeJS'
          },{
            text:'趣学NodeJS',
            link:'/nodejs-docs/interest-NodeJS/事件循环与异步IO'
          }
        ]
        
      }, {
        text: 'JavaScript',
        items: [
          {
            text: '函数式编程',
            link: '/javascript-docs/javascript-functional/index'
          }, {
            text: 'JS编程进阶',
            link: '/javascript-docs/javascript-advanced/index'
          }
        ]
      }, {
        text: 'VUE',
        items: [
          {
            text: 'Vue技巧',
            link: '/vue-docs/skills/如何写好组件和hook.md'
          }, {
            text: 'Vue原理',
            link: '/vue-docs/principle/响应式系统设计.md'
          },{
            text:'Pinia',
            link:'/vue-docs/pinia.md'
          }
        ]
      }, 
      {
        text: '构建工具', items: [
          {
            text: 'Vite',
            link: '/bundle-tool-docs/vite/esm'
          }, {
            text: 'Webpack',
            link: '/bundle-tool-docs/webpack/index'
          }
        ]
      },{
        text:'WebGL',
        items:[
          {
            text:'shader入门',
            link:'/webgl-docs/shader/学习shader的准备工作.md'
          }
        ]
      }
    ],
    sidebar: {
      '/performance-docs/foundation/':[
        {
          items:[
            {
              items:[
                {text:'入门',link:'/performance-docs/foundation/index.md'},
                {text:"构建工具的优化",link:'/performance-docs/foundation/构建工具的优化.md'},
                {text:'图片的优化',link:'/performance-docs/foundation/图片的优化.md'},
                {text:'浏览器缓存优化',link:'/performance-docs/foundation/浏览器缓存.md'},
                {text:'本地缓存优化',link:'/performance-docs/foundation/本地缓存优化.md'},
                {text:'CDN',link:'/performance-docs/foundation/CDN.md'},
                {text:'服务端渲染',link:'/performance-docs/foundation/服务端渲染.md'},
                {text:'加载顺序优化',link:'/performance-docs/foundation/加载顺序优化.md'},
                {text:'回流重绘的优化',link:'/performance-docs/foundation/回流重绘的优化.md'},
                {text:'操作频率的优化',link:'/performance-docs/foundation/操作频率的优化.md'},
                {text:'渲染时机的优化',link:'/performance-docs/foundation/渲染时机的优化.md'},
                {text:'密集任务优化',link:'/performance-docs/foundation/密集任务优化.md'},
                {text:'懒加载优化',link:'/performance-docs/foundation/懒加载优化.md'}
              ]
            }
          ]
        }
      ],
      '/performance-docs/advanced/':[
        {
          items:[
            {
              text:'web-vitals',link:'/performance-docs/advanced/web-vitals.md'
            },
            {
              text:'Performance API',link:'/performance-docs/advanced/Performance-API.md'
            },{
              text:'资源优先级优化',link:'/performance-docs/advanced/资源优先级优化.md'
            },{
              text:'CDN优化实践',link:'/performance-docs/advanced/CDN.md'
            },{
              text:'Lazy Load',link:'/performance-docs/advanced/lazyload.md'
            },{
              text:'Code Split',link:'/performance-docs/advanced/CodeSplit.md'
            },{
              text:'图片体积优化',link:'/performance-docs/advanced/图片体积优化.md'
            },{
              text:'资源懒加载',link:'/performance-docs/advanced/资源懒加载.md'
            },{
              text:'CSS代码优化',link:'/performance-docs/advanced/CSS代码优化.md'
            }
          ]
        }
      ],
      '/typescript-docs/': [
        {
          text: 'Typescript基础',
          items: [
            { text: '基础类型', link: '/typescript-docs/基础类型' },
            { text: '接口',link:'/typescript-docs/接口'},
            { text:'函数',link:'/typescript-docs/函数'},
            { text:'字面量类型',link:'/typescript-docs/字面量类型'},
            { text:'联合类型',link:'/typescript-docs/联合类型与交叉类型'},
            { text:'类',link:'/typescript-docs/类'},
            {text:'枚举',link:'/typescript-docs/枚举'},
            {text:'高级类型',link:'/typescript-docs/高级类型'},
            {text:'实用工具类型',link:'/typescript-docs/实用工具类型'},
            {text:'装饰器',link:'/typescript-docs/装饰器'},
            {text:'声明合并',link:'/typescript-docs/声明合并'},
            {text:'mixins混入',link:'/typescript-docs/mixins混入'},
            {text:'模块',link:'/typescript-docs/模块'}
          ]
        }
      ],
      '/javascript-docs/javascript-advanced/':[
        { 
          items:[
            {
              text:'开篇',
              link:'javascript-docs/javascript-advanced/index.md'
            },{
              text:'作用域',
              link:'javascript-docs/javascript-advanced/作用域.md'
            },{
              text:'类型判断',
              link:'javascript-docs/javascript-advanced/类型判断.md'
            },{
              text:"字符串",
              link:'javascript-docs/javascript-advanced/字符串.md'
            },{
              text:"Symbol",
              link:'javascript-docs/javascript-advanced/Symbol.md'
            },{
              text:'数组',
              link:'javascript-docs/javascript-advanced/数组.md'
            },{
              text:'函数',
              link:'javascript-docs/javascript-advanced/函数.md'
            },{
              text:'对象的基本结构',
              link:'javascript-docs/javascript-advanced/对象的基本结构.md'
            },{
              text:'对象的操作',
              link:'javascript-docs/javascript-advanced/对象的操作.md'
            },{
              text:'对象的遍历',
              link:'javascript-docs/javascript-advanced/对象的遍历.md'
            },{
              text:'class',
              link:'javascript-docs/javascript-advanced/class.md'
            },{
              text:'隐式类型转换',
              link:'javascript-docs/javascript-advanced/隐式类型转换.md'
            },{
              text:'JSON',
              link:'javascript-docs/javascript-advanced/JSON.md'
            },{
              text:'索引键值集合',
              link:'javascript-docs/javascript-advanced/索引键值集合.md'
            },{
              text:'二进制',
              link:'javascript-docs/javascript-advanced/二进制.md'
            },{
              text:'日期操作',
              link:'javascript-docs/javascript-advanced/日期操作.md'
            },{
              text:'错误处理',
              link:'javascript-docs/javascript-advanced/错误处理.md'
            },{
              text:'Reflect',
              link:'javascript-docs/javascript-advanced/Reflect.md'
            },{
              text:'Proxy',
              link:'javascript-docs/javascript-advanced/Proxy.md'
            },{
              text:'异步编程',
              link:'javascript-docs/javascript-advanced/异步编程.md'
            },{
              text:'模块化',
              link:'javascript-docs/javascript-advanced/模块化.md'
            },{
              text:'事件循环',
              link:'javascript-docs/javascript-advanced/事件循环.md'
            },
            {
              text:'浏览器渲染原理',
              link:'javascript-docs/javascript-advanced/浏览器渲染原理.md'
            }
            ,{
              text:'strict',
              link:'javascript-docs/javascript-advanced/strict.md'
            },{
              text:'全局对象',
              link:'javascript-docs/javascript-advanced/全局对象.md'
            },{
              text:'Dom节点的原型',
              link:'javascript-docs/javascript-advanced/Dom节点的原型.md'
            }
          ]
        }
      ],
      '/javascript-docs/javascript-functional':[
        {
          text: '函数式编程',
          link: '/javascript-docs/javascript-functional/index'
        },{
          text:'纯函数与副作用',
          link:'/javascript-docs/javascript-functional/pure'
        }
      ],
      '/bundle-tool-docs/vite/': [
        {
          text: 'vite学习笔记',
          items: [
            {
              text: 'esm前端模块化的未来',
              link: '/bundle-tool-docs/vite/esm.md'
            },{
              text:'初识Vite项目',
              link:'/bundle-tool-docs/vite/初识Vite项目'
            },{
              text:'Vite中的Css',
              link:'/bundle-tool-docs/vite/Vite中的Css'
            }
          ]
        }
      ],
      '/bundle-tool-docs/webpack/': [
        {
          text: 'webpack学习笔记',
          item: [
            {
              text: 'webpack',
              link: 'bundle-tool-docs/webpack/index'
            },
          ]
        },
      ],
      '/project-docs/NexSight/': [
        {
          text: 'NexSight AI标注缺陷检测系统',
          items: [
            {
              text: '项目简介',
              link: 'project-docs/NexSight/项目简介.md'
            }, {
              text: '项目结构',
              link: 'project-docs/NexSight/项目结构.md'
            }, {
              text: '项目基本配置',
              link: 'project-docs/NexSight/项目基本配置.md'
            }, {
              text: '核心模块',
              link: 'project-docs/NexSight/核心模块.md'
            }, {
              text: '项目优化',
              link: 'project-docs/NexSight/项目优化.md'
            }, {
              text: '其他细节',
              link: 'project-docs/NexSight/其他细节.md'
            }
          ]
        }
      ],
      '/project-docs/VitePress/': [
        {
          text: '快速搭建一个个人博客',
          items: [
            {
              text: 'VitePress搭建',
              link: 'project-docs/VitePress/VitePress博客.md'
            }

          ]
        }
      ],
      '/webgl-docs/shader':[
        {
          items:[
            {
              text:'学习Shader的准备工作',
              link:'webgl-docs/shader/学习shader的准备工作.md'
            },{
              text:'你懂GLSL吗？',
              link:'webgl-docs/shader/GLSL语法入门.md'
            },{
              text:'绘图高手uv',
              link:'webgl-docs/shader/uv绘图.md'
            },{
              text:'纹理来了',
              link:'webgl-docs/shader/纹理绘制.md'
            },{
              text:'随机与噪声',
              link:'webgl-docs/shader/随机与噪声.md'
            },{
              text:'后期滤镜',
              link:'webgl-docs/shader/后期滤镜.md'
            },{
              text:'顶点着色器',
              link:'webgl-docs/shader/顶点着色器.md'
            }
          ]
        }
      ],
      '/vue-docs/skills':[{
        text:'Vue技巧',
        items: [
          {
            text:'Vue项目结构划分',
            link:'/vue-docs/skills/Vue项目结构划分.md'
          },
          {
            text:'如何写好组件和hooks',
            link:'/vue-docs/skills/如何写好组件和hook.md'
          },{
            text:'递归组件',
            link:'/vue-docs/skills/递归组件.md'
          },{
            text:'利用好Teleport组件',
            link:'/vue-docs/skills/利用好Teleport组件.md'
          },{
            text:'v-if与v-for拒绝同时使用',
            link:'/vue-docs/skills/v-if与v-for拒绝同时使用.md'
          },{
            text:'v-if与v-show',
            link:'/vue-docs/skills/v-if与v-show.md'
          },{
            text:'组件间通信',
            link:'/vue-docs/skills/组件间通信.md'
          }
        ]
      }
      ],
      '/vue-docs/principle':[{
        text:'响应式',
        items: [
          {
            text:'响应式系统设计',
            link:'/vue-docs/principle/响应式系统设计.md'
          },
          {
            text:'computed实现原理',
            link:'/vue-docs/principle/computed实现原理.md'
          },
          {
            text:'watch实现原理',
            link:'/vue-docs/principle/watch实现原理.md'
          },
          {
            text:'非原始值的响应方案',
            link:'/vue-docs/principle/非原始值的响应方案.md'
          },{
            text:'原始值的响应方案',
            link:'/vue-docs/principle/原始值的响应方案'
          }
        ]
      },{
        text:'渲染原理',
        items: [
          {
            text:'渲染器',
            link:'/vue-docs/principle/渲染器设计.md'
          },
          {
            text:'挂载与更新',
            link:'/vue-docs/principle/挂载与更新.md'
          },{
            text:'简单Diff',
            link:'/vue-docs/principle/简单Diff.md'
          },{
            text:'双端Diff',
            link:'/vue-docs/principle/双端Diff.md'
          },{
            text:'快速Diff',
            link:'/vue-docs/principle/快速Diff.md'
          }
        ]
      },{
        text:'组件化原理',
        items:[
          {
            text:'组件的实现原理',
            link:'/vue-docs/principle/组件的实现原理.md'
          },{
            text:'异步组件',
            link:'/vue-docs/principle/异步组件.md'
          },{
            text:'KeepAlive组件',
            link:'/vue-docs/principle/KeepAlive组件.md'
          },{
            text:'Teleport组件',
            link:'/vue-docs/principle/Teleport组件.md'
          }
        ]
      },{
        text:'编译器',
        items:[
          {
            text:'模板编译器',
            link:'/vue-docs/principle/模板编译器.md'
          },{
            text:'编译优化',
            link:'/vue-docs/principle/编译优化.md'
          }
        ]
      }
      ],
      '/internet-docs/internet/':[{
        text:'计算机网络',
        items:[
          {
            text: '传输层',
            link: 'internet-docs/internet/teleport.md'
          }, {
            text: '应用层',
            link: 'internet-docs/internet/apply.md'
          },
        ]
      }],
      'nodejs-docs/interest-NodeJS':[
        {
          text:'趣学NodeJS',
          items:[
            {
              text:'事件循环与异步IO',
              link:'/nodejs-docs/interest-NodeJS/事件循环与异步IO'
            },{
              text:'CJS与ESM',
              link:'/nodejs-docs/interest-NodeJS/CJS和ESM'
            },{
              text:'NPM与包',
              link:'/nodejs-docs/interest-NodeJS/NPM与包'
            }
          ]
        }
      ]
    },
    footer: {
      message: '冷的咖啡，我庆幸着，你在续杯',
      copyright: 'Copyright @ 2023 made by await!'
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/xqnjkycx' }
    ],
    search: {
      provider: 'local'
    }
  }
})
