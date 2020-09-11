'use strict';
const
    express = require('express'),
    router = express.Router(),
    { filesTree } = require('./utils'),
    api = [{
        type: 'get',
        url: '/getTree',
        callback: (req, res, next) => {
            res.status(200).json({
                data: filesTree('static/html')
            })
        }
    }, {
        type: 'post',
        url: '/post',
        callback: (req, res, next) => {
        	console.log(req.body)
            res.status(200).json({
                data: 'ok'
            })
        }
    }];

api.map((value, index, arr) => {
    router[value.type](value.url, value.callback);
});

module.exports = router;