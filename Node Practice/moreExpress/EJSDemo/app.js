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

app.listen(process.env.PORT,process.env.IP,function()
{
    console.log("server started");
});