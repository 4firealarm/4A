const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://www.ellison7.net/laravel/public/',
      changeOrigin: true,
    })
  );
};