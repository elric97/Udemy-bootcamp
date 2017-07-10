var mongoose=require("mongoose");
mongoose.connect("mongodb://localhost/blog_demo_2");


//post schema
var postSchema=new mongoose.Schema(
    {
        title: String,
        content: String
    });

var Post = mongoose.model("post",postSchema);

//user schema
var userSchema=new mongoose.Schema(
    {
        email: String,
        name: String,
        posts: 
        [
            {
                type: mongoose.Schema.Types.ObjectId, //writing object id 
                ref: "post"
            }
        ]
    });

var User = mongoose.model("user",userSchema);

User.create(
    {
      name: "bob felcher",
      email: "bob@gmail.com"
    },function(err,val)
    {
        console.log(val);
    });
//create a post and assign it to the user
//comment out the code below this one for the first pass
Post.create(
    {
        title: "How to blah blah",
        content: "just blah blah blah"
    },function(err,val)
    {
        //find bob
        User.findOne({email: "bob@gmail.com"},function(err1,val1)
        {
          if(err1)
          {
              console.log(err);
          }
          else
          {
              //add the post id to the user which is found 
              val1.posts.push(val);
              //then save that user info
              val1.save(function(err2,val2)
              {
                  if(err2)
                  {
                      console.log(err2);
                  }
                  else
                  {
                      console.log(val2);
                  }
              });
          }
        });
    });

//first find the user, then use populate method to get all the posts from the id present in the posts array
//comment out the above code before using this one
User.findOne({email: "bob@gmail.com"}).populate("posts").exec(function(err,val)
{
   if(err)
   {
       console.log(err);
   }
   else
   {
       console.log(val);
   }
});