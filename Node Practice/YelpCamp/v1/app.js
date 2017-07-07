var express=require("express");
var app=express();
var bodyParser=require("body-parser");
var campgrounds = 
[
    {name: "Salmon Creek", image: "https://farm8.staticflickr.com/7258/7121861565_3f4957acb1.jpg"}, 
    {name: "Rishikesh", image: "https://farm9.staticflickr.com/8367/8505320133_5fd9937312.jpg"},
    {name: "Salmon Creek", image: "https://farm8.staticflickr.com/7258/7121861565_3f4957acb1.jpg"}, 
    {name: "Rishikesh", image: "https://farm9.staticflickr.com/8367/8505320133_5fd9937312.jpg"},
    {name: "Salmon Creek", image: "https://farm8.staticflickr.com/7258/7121861565_3f4957acb1.jpg"}, 
    {name: "Rishikesh", image: "https://farm9.staticflickr.com/8367/8505320133_5fd9937312.jpg"}
];

app.use(bodyParser.urlencoded({extended: true})); // to set body parser to get data 
app.set("view engine","ejs");

app.get("/",function(req,res)
{
    res.render("landing");
});

app.get("/campgrounds",function(req,res)
{
    res.render("campgrounds",{data: campgrounds});
});

//making a new campground
app.post("/campgrounds", function(req,res)
{
   //get data from from and add to campfround array
   var name=req.body.name;
   var image=req.body.image;
   var val={name: name,image: image};
   campgrounds.push(val);
   //redirect back to campground 
   res.redirect("/campgrounds"); //default is a get request when redirecting so get method will run 
});

//a form to add new forms 
app.get("/campgrounds/new",function(req, res) 
{
    res.render("new");
});

app.listen(3000,function()
{
   console.log("Yelp Camp server started"); 
});