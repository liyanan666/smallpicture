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
