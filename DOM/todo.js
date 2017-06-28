var first = document.querySelectorAll("li");

for (var i=0;i<first.length;i++)
{
	first[i].addEventListener("mouseover",function()
	{
		this.style.color="green";
	});
	first[i].addEventListener("mouseout",function()
	{
		this.style.color="black";
	});
	first[i].addEventListener("click",function()
	{
		this.classList.toggle("done");
	});
}

