'use strict';
const
    express = require('express'),
    router = express.Router(),
    { filesTree } = require('./utils'),
    config = [{
        type: 'get',
        url: '/getTree',
        callback: (req, res, next) => {
            res.json({
                status: 200,
                data: filesTree('static/html')
            })
        }
    }];

config.map((value, index, arr) => {
    router[value.type](value.url, value.callback);
});

module.exports = router;