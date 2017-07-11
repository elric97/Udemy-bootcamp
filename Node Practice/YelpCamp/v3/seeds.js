var mongoose = require("mongoose"),
    Comment = require("./models/comment"),
    Campground = require("./models/campground");
    
var data=
[
    {
        name: "Rishikesh", 
        image: "https://farm9.staticflickr.com/8367/8505320133_5fd9937312.jpg",
        description: "A very nice Place"
    },
    {
        name: "Desert mesa", 
        image: "https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg",
        description: "blah blah"
    },
    {
        name: "Cloud's rest", 
        image: "https://farm4.staticflickr.com/3282/2770447094_2c64348643.jpg",
        description: "blah blah"
    }
];

function seedDB()
{
    //remove all cmapground
    Campground.remove({},function(err)
    {
       if (err)
       {
           console.log(err);
       }
       else
       {
           console.log("removed");
       }
       //wait for it to remove and then add the campgrounds
       //add some campground
       data.forEach(function(camp)
       {
           Campground.create(camp,function(err,val)
           {
               if (err)
               {
                   console.log(err);
               }
               else
               {
                   console.log("added");
                   //create a comment for each post
                   Comment.create(
                       {
                            text: "This place is great, but I wish there was internet",
                            author: "Homer"
                       },function(err1,val1)
                       {
                           if(err1)
                           {
                               console.log(err1);
                           }
                           else
                           {
                               console.log(val1);
                               val.comments.push(val1);
                               val.save();
                           }
                       });
               }
           });
        });
    });
        
    
}
module.exports = seedDB;