var fs = require("fs");
var formidable = require('formidable');
var path = require("path");
var fs = require("fs");
var sd = require("silly-datetime");
//这个函数的callback中含有两个参数，一个是err
//另一个是存放所有文件夹名字的array。
exports.getAllAlbums = function(callback){
	fs.readdir("./uploads",function(err,files){
		if(err){
			callback("没有找到uploads文件",null);
		}
		var allAlbums = [];
		(function iterator(i){
			if(i == files.length){
				console.log(allAlbums);
				callback(null,allAlbums);
				return;
			}
			fs.stat("./uploads/" + files[i],function(err,stats){
                if(err){
                    callback("找不到文件" + files[i] , null);
                }
                if(stats.isDirectory()){
                    allAlbums.push(files[i]);
                }
                iterator(i + 1);
            });
		})(0);
	});
}
