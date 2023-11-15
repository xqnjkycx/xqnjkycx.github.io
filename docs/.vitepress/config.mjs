import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "await-docs",
  titleTemplate: "welcome!",
  description: "front-web docs",
  themeConfig: {
    logo:'/logo.png',
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '主页', link: '/' },
      { text: 'TypeScript笔记', link: '/typescript-docs/基础类型' },
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
      '/project-docs/NexSight/':[
        {
          text:'NexSight AI标注缺陷检测系统',
          items:[
            {
              text:'项目简介',
              link:'project-docs/NexSight/项目简介.md'
            },{
              text:'项目结构',
              link:'project-docs/NexSight/项目结构.md'
            },{
              text:'项目基本配置',
              link:'project-docs/NexSight/项目基本配置.md'
            },{
              text:'核心模块',
              link:'project-docs/NexSight/核心模块.md'
            },{
              text:'项目优化',
              link:'project-docs/NexSight/项目优化.md'
            },{
              text:'其他细节',
              link:'project-docs/NexSight/其他细节.md'
            }
          ]
        }
      ],
      '/project-docs/VitePress/':[
        {
          text:'快速搭建一个个人博客',
          items:[
            {
              text:'VitePress搭建',
              link:'project-docs/VitePress/VitePress博客.md'
            }

          ]
        }
      ]
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/xqnjkycx' }
    ]
  }
})
