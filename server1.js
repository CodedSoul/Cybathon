const express=require("express");
const bodyParser=require("body-parser");
const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.get("/calc",function(request,response){
    response.sendFile(__dirname+"/index.html");
});
app.post("/calc",function(request,response)
{
    var n1=Number(request.body.num1);
    var n2=Number(request.body.num2);
    var n3=n1+n2;
    response.send(n3.toString());
});
app.listen(3000,function(){
    console.log("Server started on port 3000");
});