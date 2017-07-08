var mongoose=require("mongoose");
mongoose.connect("mongodb://localhost/cat_app");

var catSchema = new mongoose.Schema(
{
	name: String,
	age: Number,
	
});

var Cat = mongoose.model("Cat",catSchema);

//adding a new cat

var george = new Cat(
{
	name: "george",
	age: "6"
});

george.save(function(err,item)
{
	if(err)
	{
		console.log("some error");
	}
	else
	{
		console.log(item);
	}
});