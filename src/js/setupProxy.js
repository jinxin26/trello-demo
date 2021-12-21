const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        'https://friendly-sinoussi-3fd1f5.netlify.app/',
        createProxyMiddleware(
            {
                        target: 'http://127.0.0.1:8086/',
                        changeOrigin: true
                    }
        )
    )
}