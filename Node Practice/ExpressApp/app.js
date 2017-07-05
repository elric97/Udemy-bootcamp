var express = require("express");
var app = express();

//hi there
app.get("/", function(req,res)
{
	res.send("Hi there!");
});
//bye
app.get("/bye",function(req,res)
{
	res.send("GoodBye");
});
//defining a pattern to match 
app.get("/r/:anyName",function(req,res)
{
	res.send("hello there");
});
//for any other get request other than defined we use * but we have to keep this below all the other routes to avoid matching to this
app.get("*",function(req,res)
{
	res.send("404 error not found");
});
//tell to listen for request
app.listen(3000, function()
{
	console.log("started on 3000");
});