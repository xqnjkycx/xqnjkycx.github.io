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
        link: ''
      }, {
        text: '业务场景',
        link: ''
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
            link: '/bundle-tool-docs/vite/index'
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
      '/typescript-docs/': [
        {
          text: 'Typescript基础',
          items: [
            { text: '基础类型', link: '/typescript-docs/基础类型' }
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
