var express=require("express");
var app=express();

app.get("/",function(req,res)
{
    res.send("Hi there, Welcome to my assignment"); 
});
//creating route params
app.get("/speak/:animal",function(req,res)
{
   var animal=req.params.animal.toLowerCase();
   if (animal==="cow")
   {
       res.send("The cow says 'MOO'");
   }
   else if (animal==="pig")
   {
       res.send("The pig says 'OINK'");
   }
   else if (animal==="dog")
   {
       res.send("The cow says 'WOOF WOOF'");
   }
   else
   {
       res.send("Animal not present");
   }
});
//more route param
app.get("/repeat/:term/:times",function(req, res) 
{
    var num=Number(req.params.times);
    var term=req.params.term;
    var msg='';
    for (var i=0;i<num;i++)
    {
        msg=msg + " " + term;
    }
    res.send(msg);
});
//no route exist
app.get("*",function(req, res) 
{
   res.send("Sorry page not found..... What are you doing in life"); 
});
//listen
app.listen(3000);