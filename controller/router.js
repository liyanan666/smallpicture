var file = require("../models/files.js");


exports.showIndex = function(req,res,next){
	file.getAllAlbums(function(err,allAlabums){
		if(err){
			next();
			return;
		}
		res.render("index",{
			"albums" : allAlabums
		});
	})
}

exports.shoAlbum = function(req,res,next){
	var allblums = req.params.albumName;
	file.getAllImage(allblums,function(err,imageArray){
		if(err){
			next();
			return;
		}
		res.render("album",{
			"albumname" : allblums,
			"images" : imageArray
		});
	})
}