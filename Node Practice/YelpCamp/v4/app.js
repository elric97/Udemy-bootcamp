var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    Campground = require("./models/campground"),
    Comment = require("./models/comment"),
    seedDB = require("./seeds"),
    mongoose = require("mongoose");

seedDB();
mongoose.connect("mongodb://localhost/yelp_camp_v4");

app.use(bodyParser.urlencoded({extended: true})); // to set body parser to get data 
app.set("view engine","ejs");

app.get("/",function(req,res)
{
    res.render("landing");
});

app.get("/campgrounds",function(req,res)
{
    //get all campgrounds from db
    Campground.find({},function(err,allCampgrounds)
    {
        if(err)
        {
            console.log(err);
        }
        else
        {
            res.render("campgrounds/index",{data: allCampgrounds});
        }
    });
    // res.render("campgrounds",{data: campgrounds});
});

//making a new campground
app.post("/campgrounds", function(req,res)
{
   //get data from from and add to campfround array
   var name=req.body.name;
   var image=req.body.image;
   var dsc=req.body.description;
   var val={name: name,image: image,description: dsc};
   //create a new campground and save to a database 
   Campground.create(val,function(err,nval)
   {
       if(err)
       {
           console.log(err);
       }
       else
       {
           //redirect back to campground
           res.redirect("/campgrounds"); //default is a get request when redirecting so get method will run 
       }
   });
});

//a form to add new forms 
app.get("/campgrounds/new",function(req, res) 
{
    res.render("campgrounds/new");
});

//order is important
//shows more info about that campground
app.get("/campgrounds/:id",function(req, res) 
{
    //find the campground with id
    var id=req.params.id;
    //we use the populate function for this 
    Campground.findById(req.params.id).populate("comments").exec(function(err,val)
    {
        if(err)
        {
            console.log(err);
        }
        else
        {
            res.render("campgrounds/show",{val: val});
        }
    });
    //show template
});

//Comments route
app.get("/campgrounds/:id/comments/new",function(req,res)
{
    Campground.findById(req.params.id,function(err,val)
    {
       if (err)
       {
           console.log(err);
       }
       else
       {
               res.render("comments/new",{val: val});
       }
    });
});

//comments
app.post("/campgrounds/:id/comments",function(req,res)
{
    //lookup for campground
    Campground.findById(req.params.id,function(err, val) 
    {
        if(err)
        {
            res.redirect("/campgrounds");
        }
        else
        {
            //create a new comment
            Comment.create(req.body.comments,function(err1,val1)
            {
                if(err1)
                {
                    console.log(err1);
                }
                else
                {
                    val.comments.push(val1);
                    val.save();
                    res.redirect("/campgrounds/" + val._id);
                }
            });
        }
    });
});

app.listen(process.env.PORT,process.env.IP,function()
{
   console.log("Yelp Camp server started"); 
});