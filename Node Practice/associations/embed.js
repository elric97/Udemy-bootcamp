var mongoose=require("mongoose");
mongoose.connect("mongodb://localhost/blog_demo");


//post schema
var postSchema=new mongoose.Schema(
    {
        title: String,
        content: String
    });

var Post = mongoose.model("post",postSchema);

var userSchema=new mongoose.Schema(
    {
        email: String,
        name: String,
        posts: [postSchema] //adding a postSchema array it should be name of Schema
    });

var User = mongoose.model("user",userSchema);


// var newUser = new User(
//     {
//         email: "hermoine@gmail.com",
//         name: "hermoine Granger",
//     });
// newUser.posts.push(
//     {
//         title: "blhah ahsa ",
//         content: "lorem ipsum baha balsa s"
//     });
// newUser.save(function(err,val)
// {
//     if (err)
//     {
//         console.log(err);
//     }
// });

// var newPost = new Post(
//     {
//       title: 'Reflections of apple',
//       content: 'they are delicious'
//     });

// newPost.save(function(err,val)
// {
//     if(err)
//     {
//         console.log(err);
//     }
// });

//to find a user
User.findOne({name: "hermoine Granger"},function(err,val)
{
  if (err)
  {
      console.log(err);
  }
  else
  {
      val.posts.push(
          {
              title: '3 mistakes of my life',
              content: 'firstly marrying ron, do I need to say the rest'
          });
  
      val.save(function(err,val)
      {
         if (err)
         {
             console.log(err);
         }
         else
         {
             console.log(val);
         }
      });
  }
});