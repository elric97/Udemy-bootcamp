var mongoose=require("mongoose");
mongoose.connect("mongodb://localhost/cat_app");

var catSchema = new mongoose.Schema(
{
	name: String,
	age: Number,

});

var Cat = mongoose.model("Cat",catSchema);

//adding a new cat

// var george = new Cat(
// {
// 	name: "george",
// 	age: "6"
// });

// george.save(function(err,item)
// {
// 	if(err)
// 	{
// 		console.log("some error");
// 	}
// 	else
// 	{
// 		console.log(item);
// 	}
// });

Cat.create(
{
	name: "snow white",
	age: 15
},function(err,cat)
{
	if(err)
	{
		console.log(err);
	}
	else
	{
		console.log(cat);
	}
});

// retrieve all data 

Cat.find({},function(err,cat)
{
    if(err)
    {
        console.log("oh no " + err);
    }
    else
    {
        console.log("All the cats");
        console.log(cat);
    }
});