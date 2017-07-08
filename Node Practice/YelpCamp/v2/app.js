var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp");

//schema set up
var campgroundSchema = new mongoose.Schema(
    {
       name: String,
       image: String,
       description: String
    });
    
var Campground = mongoose.model("Campground",campgroundSchema);

// Campground.create(
//     {
//         name: "Rishikesh", 
//         image: "https://farm9.staticflickr.com/8367/8505320133_5fd9937312.jpg",
//         description: "A very nice Place"
//     },function(err,val)
//     {
//         if (err)
//         {
//             console.log(err);
//         }
//         else
//         {
//             console.log("Campground added");
//         }
//     });


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
            res.render("index",{data: allCampgrounds});
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
    res.render("new");
});

//order is important
//shows more info about that campground
app.get("/campgrounds/:id",function(req, res) 
{
    //find the campground with id
    var id=req.params.id;
    Campground.findById(id,function(err,val)
    {
        if(err)
        {
            console.log(err);
        }
        else
        {
            res.render("show",{val: val});
        }
    });
    //show template
});

app.listen(process.env.PORT,process.env.IP,function()
{
   console.log("Yelp Camp server started"); 
});