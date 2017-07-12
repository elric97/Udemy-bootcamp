var express               = require("express"),
    mongoose              = require("mongoose"),
    bodyParser            = require("body-parser"),
    passport              = require("passport"),
    localstrategy         = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose"),
    User                  = require("./models/user");
    
mongoose.connect("mongodb://localhost/demo_auth");
var app = express();
app.set("view engine","ejs");

app.use(require("express-session")({
    secret: "Yo hoe",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({extended: true}));

//reading the session and decoding it, we have already included these method in user model 
passport.use(new localstrategy(User.authenticate())); //local stratefy use that verion of authenticate coming from user model
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/",function(req,res)
{
   res.render("home");
});

//secret route
app.get("/secret",isLoggedIn,function(req,res)
{
    res.render("secret");
});

//auth routes
app.get("/register",function(req, res) 
{
    res.render("register");
});
//handling sign up
app.post("/register",function(req,res)
{
    //now we have to register the user 
    //we don't store password directly in database rather we paas it as an argument so that it is hashed
    // and stored in database- salt used to retrieve the password from hashed value 
    User.register(new User({username: req.body.username}), req.body.password, function(err,user)
    {
        if(err)
        {
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req,res,function()
        {
            res.redirect("/secret");
        });
    });
});

//login routes
app.get("/login",function(req, res) 
    {
        res.render("login");
    });

//using middleware b/w route and function
app.post("/login",passport.authenticate("local",
    {
        successRedirect: "/secret",
        failureRedirect: "/login"
    }),function(req,res)
    {
        
    });
//logout
app.get("/logout",function(req, res) 
{
    req.logout();
    res.redirect("/");
});

//middleware
function isLoggedIn(req,res,next)
{
    if(req.isAuthenticated())
    {
        return next(); //next just refers to the next function after the use of middleware
    }
    res.redirect("/login");
}
app.listen(process.env.PORT,process.env.IP,function()
{
    console.log("Server started");
});