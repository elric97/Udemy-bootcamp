function isEven(num)
{
	if (num%2===0)
		return true;
	return false;
}

//factorial

function fact(num)
{
	if (num===0 || num===1)
		return 1;

	for (var i=num-1;i>0;i--)
	{
		num = num * i;
	}
	return num;
}

//snake to camel

function snakeToCamel(a)
{
	a=a.replace("-","_");
	return a;
}