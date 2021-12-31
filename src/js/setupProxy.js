const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        'http://trello.vaiwan.com/',
        createProxyMiddleware(
            {
                        target: 'http://trello.vaiwan.com/',
                        changeOrigin: true
                    }
        )
    )
}