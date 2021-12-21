const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/description',
        createProxyMiddleware(
            {
                        target: 'http://localhost:8086',
                        changeOrigin: true
                    }
        )
    )
}