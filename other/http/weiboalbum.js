/**
 * 微博相册功能
 * weibo album
 * @author unofficial
 */
"use strict";
const ROOT = global.root = __dirname;
var g = require(ROOT + '/lib/global');

var http = require('http');
var qs = require('querystring');

var postData = qs.stringify({
    album_name:'测试1',
    album_describe:'测试1',
    property:1,
    question:'',
    answer:'',
});

var weibo = g.loadYaml('weibo');
var options = {
    hostname: 'm.weibo.cn',
    path: '/album/addAlbum',
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Origin':'http://m.weibo.cn',
        'Referer':'http://m.weibo.cn/album',
        'cookie': weibo.sub,
    },
};

var _un = {
    "request": function() {
        var req = http.request(options, function(res) {
            var photosStr = '';
            console.log(res.headers);
            res.setEncoding('utf8');
            res.on('data', function(data) {
                photosStr += data;
            }).on('end', function() {
                console.log(photosStr);
            })
        })

        //error
        req.on('error', function(e) {
            if(e) throw e;
        })

        req.write(postData);
        req.end();
    }
}
_un.request();
