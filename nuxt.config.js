export default {
  router: {
    linkActiveClass: 'active',
    extendRoutes(routes, resolve) {
      // 清除默认路由规则
      routes.splice(0)
      routes.push(...[
        {
          path: '/',
          component: resolve(__dirname, 'pages/layouts'),
          children: [
            {
              path: '',
              name: 'home',
              component: resolve(__dirname, 'pages/home'),
            },
            {
              path: '/login',
              name: 'login',
              component: resolve(__dirname, 'pages/login'),
            },
            {
              path: '/register',
              name: 'register',
              component: resolve(__dirname, 'pages/login'),
            },
            {
              path: '/settings',
              name: 'settings',
              component: resolve(__dirname, 'pages/settings'),
            },
            {
              path: '/editor',
              name: 'editorCreate',
              component: resolve(__dirname, 'pages/editor'),
            },
            {
              path: '/editor/:slug',
              name: 'editorEdit',
              component: resolve(__dirname, 'pages/editor'),
            },
            {
              path: '/profile/:username',
              name: 'profile',
              component: resolve(__dirname, 'pages/profile'),
            },
            {
              path: '/article/:slug',
              name: 'article',
              component: resolve(__dirname, 'pages/article'),
            }
          ]
        }
      ])
    }
  },
  plugins: [
    '~/plugins/request.js',
    '~/plugins/day.js',
  ],
  server:{
    host: '0.0.0.0', 
    port: 3000
  }
}