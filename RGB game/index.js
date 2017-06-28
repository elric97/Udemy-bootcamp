var colors=genRandomColor(6);

var square=document.querySelectorAll(".square");
var picked=pickColor();
var val=document.getElementById("val");
val.textContent=picked;
var msg=document.getElementById("msg");
var h1=document.querySelector("h1");
var reset=document.getElementById("reset");
var buttons=document.getElementsByClassName("mode");
var numSq=6;

for (var i=0;i<buttons.length;i++)
{
	buttons[i].addEventListener("click",function()
	{
		buttons[0].classList.remove("selected")
		buttons[1].classList.remove("selected");
		this.classList.add("selected");
		if (this.textContent==="Easy")
			numSq=3;
		else
			numSq=6;

		resetf();
	});
}

function resetf()
{
	//generate random rgb value
 	colors = genRandomColor(numSq);
 	//change picked color
 	picked = pickColor();
 	//change rgb value in heading 
 	val.textContent=picked;
 	msg.textContent="";
 	reset.textContent="New Colors";
 	for(var i=0;i<square.length;i++)
 	{
 		square[i].classList.add("show");
 		if (colors[i])
 		{
 			square[i].style.backgroundColor=colors[i];
 		}
 		else
 		{
 			square[i].classList.remove("show");
 			square[i].classList.add("hide");
 		}
 		
 	}
 	h1.style.backgroundColor="steelblue";
}
// easy.addEventListener("click",function()
// {
// 	easy.classList.add("selected");
// 	hard.classList.remove("selected");
// 	numSq=3
// 	colors= genRandomColor(numSq);
// 	picked=pickColor();
// 	val.textContent=picked;	
// 	h1.style.backgroundColor="steelblue";
// 	for (var i=0;i<square.length;i++)
// 	{
// 		if (colors[i])
// 		{
// 			square[i].style.backgroundColor=colors[i];
// 		}
// 		else
// 		{
// 			square[i].classList.remove("show");
// 			square[i].classList.add("hide");
// 		}
// 	}
// });

// hard.addEventListener("click",function()
// {
// 	hard.classList.add("selected");
// 	easy.classList.remove("selected");
// 	numSq=6;
// 	colors= genRandomColor(numSq);
// 	picked=pickColor();
// 	val.textContent=picked;	
// 	h1.style.backgroundColor="steelblue";
// 	for (var i=0;i<square.length;i++)
// 	{
// 			square[i].classList.add("show");
// 			square[i].style.backgroundColor=colors[i];
// 	}
// });


for (var i=0;i<square.length;i++)
{
	square[i].style.backgroundColor=colors[i];
	//add click event to squares
	square[i].addEventListener("click",function()
	{
		//compare color to picked one
		if (this.style.backgroundColor===picked)
		{
			msg.textContent="Correct";
			changeColor(this.style.backgroundColor);
			h1.style.backgroundColor=picked;
			reset.textContent="Play Again?";

		}
		else
		{
			this.style.background="#232323";
			msg.textContent="Try Again";
		}
	});
}

function changeColor(color)
{
	for (var i=0;i<square.length;i++)
	{
		square[i].style.backgroundColor=color;
	}
}

function pickColor()
{
	var num=Math.floor(Math.random()*colors.length);
	return colors[num];
}

function genRandomColor(val)
{
	arr=[];
	var r,g,b;
	for (var i=0;i<val;i++)
	{
		r=Math.floor(Math.random()*256);
		g=Math.floor(Math.random()*256);
		b=Math.floor(Math.random()*256);
		arr[i]="rgb(" + r +", " + g + ", " + b +")";
	}
	// alert(arr);
	return arr;
}

 reset.addEventListener("click",function()
 {
 	//generate random rgb value
 	colors = genRandomColor(numSq);
 	//change picked color
 	picked = pickColor();
 	//change rgb value in heading 
 	val.textContent=picked;
 	msg.textContent="";
 	reset.textContent="New Colors";
 	for(var i=0;i<square.length;i++)
 	{
 		square[i].style.backgroundColor=colors[i];
 	}
 	h1.style.backgroundColor="steelblue";
 });