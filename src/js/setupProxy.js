const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        'http://localhost:8086/description/202112210003',
        createProxyMiddleware(
            {
                        target: 'http://localhost:8086/description/202112210003',
                        changeOrigin: true
                    }
        )
    )
}