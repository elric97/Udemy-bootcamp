var button=document.querySelector("button");
var box=document.querySelector(".box");
var col= true;
button.addEventListener("click",function()
{
	if (col===true)
	{
		box.style.backgroundColor= "purple";
	}
	else
	{
		box.style.backgroundColor= "white";
	}
	col=!col;
});