"use strict";
exports.__esModule = true;
var process = require("process");
var path_1 = require("path");
var fs_1 = require("fs");
var rootPath = process.cwd();
var prefix = '__test__/demo-goods';
var goodsImageExt = (0, path_1.join)(rootPath, prefix, 'goods-image');
var readDir = function (dir) {
    var res = [];
    (0, fs_1.readdirSync)(dir).forEach(function (content) {
        var contentPath = (0, path_1.join)(dir, content);
        var stat = (0, fs_1.statSync)(contentPath);
        if (stat.isDirectory()) {
            res.push.apply(res, readDir(contentPath));
        }
        else if (stat.isFile()) {
            res.push(contentPath);
        }
    });
    return res;
};
// console.log(readDir(goodsImageExt), existsSync(''));
console.log((0, path_1.basename)('asdads/asdasd/helloworld.vue'));
// watch(join(rootPath, prefix, 'goods-image')).on("all", (eventName, path) => {
// 	console.log(eventName, path);
// });
//
//
// createFile(join(rootPath, prefix, 'retail-goods-image/dist/widgets/a.vue')).then(res => {
// 	console.log(res, 'create file');
// })
//
