var express = require("express");
var app = express();
//make a views directory for the ejs files as express looks in that
app.get("/",function(req,res)
{
   res.render("home.ejs");
});
app.get("/fallinlove/:name",function(req,res)
{
    var thing=req.params.name;
    res.render("love.ejs",{thingVar: thing});
});

app.get("/post",function(req, res) 
{
    var post=
    [
        {title: "yoho",author:"yoho ho" },
        {title: "yoho",author:"yoho 2o" },
        {title: "yoho",author:"yoho 3o" }
    ];
    
    res.render("posts.ejs",{posts: post});
});
app.listen(3000,function()
{
    console.log("server started");
});