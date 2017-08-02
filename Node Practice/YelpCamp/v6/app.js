var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    Campground = require("./models/campground"),
    Comment = require("./models/comment"),
    seedDB = require("./seeds"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    localStrategy=require("passport-local"),
    User=require("./models/user");

seedDB();
mongoose.connect("mongodb://localhost/yelp_camp_v6");

app.use(bodyParser.urlencoded({extended: true})); // to set body parser to get data 
app.set("view engine","ejs");
app.use(express.static(__dirname + "/public")); // __dirname gives the current directory we are working in

//setup express session
app.use(require("express-session")(
    {
        secret: "Yo hoe",
        resave: false,
        saveUninitialized: false
    }));

//passport config
app.use(passport.initialize());
app.use(passport.session());
//functions coming from user model
passport.use(new localStrategy(User.authenticate())); //local strategy use that verion of authenticate coming from user model
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//we have to pass req.user to every route so we use a middleware for this
app.use(function(req,res,next)
{
    // whatever we put in res.locals is available in our templates 
    res.locals.currentUser = req.user;
    next(); //required next
});

app.get("/",function(req,res)
{
    res.render("landing");
});

//index campground
app.get("/campgrounds",function(req,res)
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
app.get("/campgrounds/:id/comments/new",isLoggedIn,function(req,res)
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
app.post("/campgrounds/:id/comments",isLoggedIn,function(req,res)
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

//Auth routes
//show register
app.get("/register",function(req, res) 
{
    res.render("register");
});
//handle sign up 
app.post("/register",function(req,res)
{
    //now we have to register the user 
    //we don't store password directly in database rather we pass it as an argument so that it is hashed
    // and stored in database- salt used to retrieve the password from hashed value 
    User.register(new User({username: req.body.username}), req.body.password, function(err,user)
    {
        if(err)
        {
            console.log(err);
            return res.render("register");
        }
        //if no error then authenticate the user 
        passport.authenticate("local")(req,res,function()
        {
            res.redirect("/campgrounds");
        });
    });
});
//show login form
app.get("/login",function(req, res) 
{
    res.render("login");    
});
//use middleware
app.post("/login",passport.authenticate("local",
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }),function(req,res)
    {
        
    });
    
//logout route
app.get("/logout",function(req, res) {
    req.logout();
    res.redirect("/campgrounds");
});

function isLoggedIn(req,res,next)
{
    if(req.isAuthenticated()) //checks if user is authenticated or not 
    {
        return next;
    }
    res.redirect("/login");
}
app.listen(process.env.PORT,process.env.IP,function()
{
   console.log("Yelp Camp server started"); 
});