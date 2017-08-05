var express = require("express");
var router = express.Router({mergeParams: true}); //for sending the id to the cooments
var Campground = require("../models/campground"),
    Comment = require("../models/comment");
    
//new comments
router.get("/comments/new",isLoggedIn,function(req,res)
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

//when comments come here 
router.post("/comments",isLoggedIn,function(req,res)
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
                    //add username and id to the comment
                    //save comment
                    val1.author.id = req.user._id;
                    val1.author.username = req.user.username;
                    val1.save();
                    
                    val.comments.push(val1);
                    val.save();
                    res.redirect("/campgrounds/" + val._id);
                }
            });
        }
    });
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