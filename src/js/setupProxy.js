const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        'https://friendly-sinoussi-3fd1f5.netlify.app/',
        createProxyMiddleware(
            {
                        target: 'http://122.51.213.254:8086/',
                        changeOrigin: true
                    }
        )
    )
}