var answer=prompt("are we there yet");

while (true)
{
	answer = answer.toLowerCase();
	if(answer.indexOf("yes")!==-1 || answer.indexOf("Yeah")!==-1)
		break;
	var answer=prompt("are we there yet");
}

alert("Yay! we made it");