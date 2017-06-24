var num=Math.floor(Math.random()*100);

var guess=prompt("Guess a number");

if (Number(guess)>num)
{
	console.log("Too high");
} 
else if (Number(guess)<num)
{
	console.log("Too low");
}
else
{
	console.log("Right Guess");
}
alert(num);