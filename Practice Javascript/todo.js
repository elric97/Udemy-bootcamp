var ans=prompt("enter your choice").toLowerCase();
var todo=[];
while (true)
{
	if (ans==="new")
	{
		var item=prompt("enter the task");
		todo.push(item);
	}
	else if (ans==="list")
	{
		console.log("**************")
		todo.forEach(function(val,index)
		{
			console.log(index + ": " + val);
		})
		console.log("**************");
	}
	else if (ans==="delete")
	{
		var ind=prompt("enter the index to be deleted");
		todo.splice(ind,1);
	}
	else if(ans==="quit")
		break;

	var ans=prompt("enter your choice").toLowerCase();
}