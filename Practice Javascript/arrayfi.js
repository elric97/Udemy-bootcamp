function printRev(arr)
{
	var p=[];
	var j=0;
	for (var i=arr.length-1;i>=0;i--)
	{
		p[j]=a[i];
		j++;
	}
	return p;
}

function uniform(arr)
{
	for (var i=0;i<arr.length-1;i++)
	{
		if (arr[i]!==arr[i+1])
			return false;
	}
	return true;
}

function sumArray(arr)
{
	var sum=0;
	arr.forEach(function(val){
		sum+=val;
	});
	return sum;
}

function max(arr)
{
	var mx=arr[0];
	arr.forEach(function(val){
		if (mx<val)
			mx=val;
	});
	return mx;
}