var express = require("express");
var app = express();

//控制器
var router  = require("./controller");
//设置模板
app.set("view engine","ejs");

//引用静态资源
app.use(express.static("./public"));
app.use(express.static("./uploads"));

app.get("/",router.showIndex);
app.get("/:albumName",router.shoAlbum);
app.get("/up",router.showup);
app.post("/up",router.upload);

app.listen(3000);
