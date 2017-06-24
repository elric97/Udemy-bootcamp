console.log("Using While Loop");
var num = -10;
while(num<=19)
{
	console.log(num);
	num++;
}

var num2 = 10;
while (num2<=40)
{
	if (num2%2===0)
		console.log(num2);
	num2++;
}

var num3=300;
while (num3<=333)
{
	if (num3%2!==0)
		console.log(num3);
	num3++;
}

var num4=5;
while (num4<=50)
{
	if (num4%5===0 && num4%3===0)
		console.log(num4);
	num4++;
}
console.log("Using For Loop");
for (var x=-10;x<=19;x++)
{
	console.log(x);
}
for (var x=10;x<=40;x++)
{
	if (x%2===0)
		console.log(x);
}
for (var x=300;x<=333;x++)
{
	if (x%2!==0)
		console.log(x);
}
for (var x=5;x<=50;x++)
{
	if (x%5===0 && x%3===0)
		console.log(x);
}