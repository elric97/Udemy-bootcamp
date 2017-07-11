var mongoose = require("mongoose");

var commentSchmea = mongoose.Schema(
    {
        text: String,
        author: String
    });
    
module.exports = mongoose.model("Comment",commentSchmea);