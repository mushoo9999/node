'use strict';
const fs = require('fs');
const path = require('path');
module.exports = {
    getIPAdress: function() { //获取IP
        const interfaces = require('os').networkInterfaces();
        for (let devName in interfaces) {
            const iface = interfaces[devName];
            for (let i = 0; i < iface.length; i++) {
                let alias = iface[i];
                if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                    return alias.address;
                }
            }
        }
    },
    filesTree: function(dir) { //生成目录树
        let tree = [];

        function creatTree(dir, folderName, level) {
            let arr = {
                name: path.basename(dir),
                level: level,
                //path: dir
            }
            let files = fs.readdirSync(dir);
            if (files.length == 0) arr.name = arr.name + '(空)';
            files = files.filter((value) => {
                return fs.statSync(path.join(dir, value)).isDirectory();
            });
            level++
            arr.children = files.map((fileName) => {
                let path_ = path.join(dir, fileName);
                let stats = fs.statSync(path_);
                if (fs.readdirSync(path_).includes('index.html')) {
                    return {
                        name: fileName,
                        level: level,
                        //path:_path
                    }
                }
                return creatTree(path_, fileName, level);
            });
            return arr
        }
        tree.push(creatTree(dir, dir, 0));
        return tree
    }
}