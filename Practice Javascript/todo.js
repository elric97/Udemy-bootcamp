var ans=prompt("enter your choice").toLowerCase();
var todo=[];
while (true)
{
	if (ans==="new")
	{
		var item=prompt("enter the task");
		todo.push("item");
	}
	else if (ans==="list")
		console.log(todo);
	else
		break;

	var ans=prompt("enter your choice").toLowerCase();
}