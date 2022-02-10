export default {
  buildModules: [
    ['@nuxtjs/vuetify', { /* module options */ }]
  ],
  serverMiddleware: ['../api'],
  modules: ['@nuxtjs/axios'],
  axios: {
    prefix: '/api',
    proxy: true
  },
  proxy: {
    '/api/': 'http://localhost:8080'
  }
}

