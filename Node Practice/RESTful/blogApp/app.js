var express = require("express"),
    app = express(),
    mongoose = require("mongoose"),
    bodyParser = require("body-parser");

//initial settings 
mongoose.connect("mongodb://localhost/blog_app");
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

var blogSchema = new mongoose.Schema(
    {
        title: String,
        image: String,
        body: String,
        created: 
        {
            type: Date, default: Date.now
        }
    });

//Mongoose/model config
var Blog=mongoose.model("blog",blogSchema); 

//demo blog
// blog.create(
//     {
//       title: "First",
//       image: "https://farm4.staticflickr.com/3373/3600836516_ab924c6729.jpg",
//       body: "demo post"
//     });

//restful routes
app.get("/",function(req,res)
{
   res.redirect("/blogs"); 
});


//index route
app.get("/blogs",function(req,res)
{
    Blog.find({},function(err,val)
    {
       if (err)
       {
           console.log(err);
       }
       else
       {
               res.render("index",{blog: val});
       }
    });
});

//new route
app.get("/blogs/new",function(req,res)
{
   res.render("new"); 
});

//create route
app.post("/blogs",function(req,res)
{
    //now as we have grouped them together in blog when naming them we can directly use that
    var data=req.body.blog;
    //create blog 
    Blog.create(data, function(err,val)
    {
        if (err)
        {
            res.render("new");
        }
        else
        {
            res.redirect("/blogs")
        }
    });
   //redirect
});

//show route
app.get("/blogs/:id",function(req, res) 
{
    var id=req.params.id;
    Blog.findById(id, function(err,val)
    {
        if(err)
        {
            res.redirect("/blogs");
        }
        else
        {
            res.render("show",{blog: val});
        }
    })
});

app.listen(process.env.PORT,process.env.IP,function()
{
   console.log("started"); 
});