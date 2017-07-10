var express = require("express"),
    app = express(),
    mongoose = require("mongoose"),
    bodyParser = require("body-parser"),
    expressSanitizer=require("express-sanitizer"),
    methodOverride=require("method-override");

//initial settings 
mongoose.connect("mongodb://localhost/blog_app");
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer()); //after body parser req
app.use(methodOverride("_method")); //to check for the method overriding done 

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
    //sanitize the code
    //second body is for the body of the blog being sent by that form
    req.body.blog.body = req.sanitize(req.body.blog.body);
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
    });
});

//edit route
app.get("/blogs/:id/edit",function(req, res) 
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
            res.render("edit",{blog: val});
        }
    });
});

//update route (put req)
app.put("/blogs/:id",function(req,res)
{
    //sanitize the code
    //second body is for the body of the blog being sent by that form
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.findByIdAndUpdate(req.params.id,req.body.blog,function(err,val)
    {
        if (err)
        {
            res.redirect("/blogs");
        }
        else
        {
            res.redirect("/blogs/" + req.params.id);
        }
    });
});

//destroy/delete route
app.delete("/blogs/:id",function(req,res)
{
   //destroy blog
   Blog.findByIdAndRemove(req.params.id,function(err)
   {
      if (err)
      {
          res.redirect("/blogs");
      }
      else
      {
          res.redirect("/blogs");
      }
   });
});

app.listen(process.env.PORT,process.env.IP,function()
{
   console.log("started"); 
});