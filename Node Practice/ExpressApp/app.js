var express = require("express");
var app = express();

//hi there
app.get("/", function(req,res)
{
	res.send("Hi there!");
});

//tell to listen for request
app.listen(3000, function()
{
	console.log("started on 3000");
});