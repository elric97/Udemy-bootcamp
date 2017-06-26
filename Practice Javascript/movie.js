var db=
[
	{
		name: "In Bruges",
		status: "watched",
		rating: 5
	},
	{
		name: "Frozen",
		status: "not seen",
		rating: 4.5
	},
	{
		name: "Mad Max Fury Road",
		status: "seen",
		rating: 5
	},
	{
		name: "Les Miserables",
		status: "not seen",
		rating: 3.5
	}
];

for (var i=0;i<db.length;i++)
{
	console.log("You have " + db[i].status + " \"" + db[i].name + "\" - " + db[i].rating + " stars")
}