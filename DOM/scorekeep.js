var player1=document.getElementById("p1");
var player2=document.getElementById("p2");
var reset=document.getElementById("reset");
var p1s=0;
var p2s=0;
var gameOver=false;
var winScore=5;
var numInput=document.querySelector("input");
player1.addEventListener("click",function()
{
	if (!gameOver)
	{
		p1s++;
		if (p1s===winScore)
		{
			document.querySelector("#sp1").classList.add("winner");
			gameOver=true;
		}
		document.querySelector("#sp1").textContent=p1s;
	}
});

player2.addEventListener("click",function()
{
	if (!gameOver)
	{
		p2s++;
		if (p2s===winScore)
		{
			document.querySelector("#sp2").classList.add("winner");
			gameOver=true;
		}
		document.querySelector("#sp2").textContent=p2s;
	}	
});

reset.addEventListener("click",function()
{
	p1s=0;
	p2s=0;
	document.querySelector("#sp2").textContent=p2s;
	document.querySelector("#sp1").textContent=p1s;
	gameOver=false;
	document.querySelector("#sp2").classList.remove("winner");
	document.querySelector("#sp1").classList.remove("winner");
});
//change is run whenever something change no matter what 

numInput.addEventListener("change",function()
{
	document.querySelector("#limit").textContent=numInput.value;
	winScore=Number(numInput.value);
	rst();

});
function rst()
{
	p1s=0;
	p2s=0;
	document.querySelector("#sp2").textContent=p2s;
	document.querySelector("#sp1").textContent=p1s;
	gameOver=false;
	document.querySelector("#sp2").classList.remove("winner");
	document.querySelector("#sp1").classList.remove("winner");
}