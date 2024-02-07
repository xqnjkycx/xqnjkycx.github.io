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
      { text: 'TypeScript笔记', link: '/typescript-docs/基础类型' }, {
        text: '性能优化',
        items: [
          {
            text:'性能优化基础',
            link:'/performance-docs/foundation/index'
          },{
            text:'性能优化进阶',
            link:'/performance-docs/advanced/index'
          }
        ]
      }, {
        text: 'NodeJS笔记',
        link: '/nodejs-docs/深入浅出NodeJS'
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
            link: '/bundle-tool-docs/vite/index'
          }
        ]
      }, 
      {
        text: '构建工具', items: [
          {
            text: 'Vite',
            link: '/bundle-tool-docs/vite/index'
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
                {text:'浏览器缓存优化',link:'/performance-docs/foundation/浏览器缓存.md'}
              ]
            }
          ]
        }
      ],
      '/performance-docs/advanced/':[
        {
          items:[
            {
              items:[
                {text:'入门',link:'/performance/advanced/index.md'},
                
              ]
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
            {text:'高级类型',link:'/typescript-docs/高级类型'}
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
      '/bundle-tool-docs/vite/': [
        {
          text: 'vite学习笔记',
          items: [
            {
              text: 'vite',
              link: '/bundle-tool-docs/vite/index'
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
            text:'如何写好组件和hooks',
            link:'/vue-docs/skills/如何写好组件和hook.md'
          },
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
