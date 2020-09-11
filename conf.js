'use strict';
const
    express = require('express'),
    app = express(),
    browser = require('browser-sync'), //文件监听
    { createProxyMiddleware } = require('http-proxy-middleware'), //代理
    { getIPAdress } = require('./utils'), //显示ip
    router=require('./router')
    port = 3008,
    proxyUrls = ['/auth'],
    rootUrl = [express.static(__dirname + '/static')];
let fetch = require('./fetch'); //接口
app.use(...rootUrl);

app.use(proxyUrls, createProxyMiddleware({
    target: 'http://pms.test.expowh.com:8081/',
    changeOrigin: true,
    "secure": false
}));

app.listen(port, function() {
    browser({
        proxy: getIPAdress() + ':' + port + '/index.html',
        files: ['!static/**/*.scss', './static'],
        port: 8080,
        open: false
    });
});