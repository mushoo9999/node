'use strict';
const
    express = require(`express`),
    router = express.Router(),
    { filesTree } = require('./utils');
module.exports = [{
    type: 'get',
    url: '/getTree',
    callback: (req, res, next) => {
        res.json({
            data: filesTree('static/html')
        })
    }
}];
module.exports=router