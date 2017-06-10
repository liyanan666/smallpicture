var fs = require("fs");
var formidable = require('formidable');
var path = require("path");
var fs = require("fs");
var sd = require("silly-datetime");
var util = require("util");
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

exports.getAllImage =function(albumName,callback){
	fs.readdir("./uploads/"+ albumName,function(err,files){
		if(err){
	        callback("没有找到uploads文件",null);
	        return;
	    }
		var allImages = [];
	    (function iterator(i){
	    	console.log("hhhhahahah");
	        if(i == files.length){
	            //遍历结束
	            callback(null,allImages);
	            return;
	        }
	        fs.stat("./uploads/" + albumName + "/" + files[i],function(err,stats){
	            if(err){
	                callback("找不到文件" + files[i] , null);
	                return;
	            }
	            if(stats.isFile()){
	                allImages.push(files[i]);
	            }
	            iterator(i + 1);
	        });
	    })(0);
	})
	
}

exports.upload = function(req,res){
	var form = new formidable.IncomingForm();
	
	form.encoding = 'utf-8';
	
	form.uploadDir =__dirname + "/../uploads";
	 
    form.parse(req, function(err, fields, files) {
    	var ttt = sd.format(new Date(), 'YYYYMMDDHHmmss');
        var ran = parseInt(Math.random() * 89999 + 10000);
        var extname = path.extname(files.tupian.name);
    	var wenjianjia = fields.wenjianjia;
    	console.log(fields);
    	console.log(files); 
    	var oldpath = files.tupian.path;
    	console.log(oldpath);
    	var newpath = __dirname + "/../uploads/" + wenjianjia + "/" + ttt + ran + extname;
    	 
         fs.rename(oldpath,newpath,function(err){
        	 if(err){
        		 res.send("改名失败");
        		 return;
        	 }
        	 res.send("改名成功")
         });
    });
	 
    return;
	  
}