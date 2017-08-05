var mongoose = require("mongoose");

//created a author object 
var commentSchmea = mongoose.Schema(
    {
        text: String,
        author: 
        {
            id: 
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User" //refers to the model
            },
            username: String
        }
    });
    
module.exports = mongoose.model("Comment",commentSchmea);