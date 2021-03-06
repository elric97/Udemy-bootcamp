var express = require("express");
var router = express.Router(); //used for exporting the routes
var Campground = require("../models/campground");

//index campground
router.get("/",function(req,res)
{
    //get all campgrounds from db
    //req.user gives current user
    
    Campground.find({},function(err,allCampgrounds)
    {
        if(err)
        {
            console.log(err);
        }
        else
        {
            res.render("campgrounds/index",{data: allCampgrounds,currentUser: req.user});
        }
    });
    // res.render("campgrounds",{data: campgrounds});
});

//making a new campground
router.post("/",isLoggedIn, function(req,res)
{
   //get data from from and add to campfround array
   var name=req.body.name;
   var image=req.body.image;
   var dsc=req.body.description;
   var author = {
       id: req.user._id,
       username: req.user.username
   };
   var val={name: name,image: image,description: dsc,author: author};
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
router.get("/new",isLoggedIn, function(req, res) 
{
    res.render("campgrounds/new");
});

//order is important
//shows more info about that campground
router.get("/:id",function(req, res) 
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

function isLoggedIn(req,res,next)
{
    if(req.isAuthenticated()) //checks if user is authenticated or not 
    {
        return next();
    }
    res.redirect("/login");
}

module.exports = router;