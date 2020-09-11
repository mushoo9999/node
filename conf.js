'use strict';
const
    express = require('express'),
    app = express(),
    browser = require('browser-sync'), //文件监听
    { createProxyMiddleware } = require('http-proxy-middleware'), //代理
    { getIPAdress } = require('./utils'), //显示ip
    bodyParser = require('body-parser'),
    router=require('./router'),//接口
    proxyUrls = ['/auth'],
    port = 3008,
    rootUrl = [express.static(__dirname + '/static')];

app.use(bodyParser.json());
app.use(...rootUrl);//静态资源根目录
app.use('/api',router);//接口路由
app.use(proxyUrls, createProxyMiddleware({//正向代理
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