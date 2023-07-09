const express=require("express");
const bodyParser=require("body-parser");
const mongoose=require("mongoose");
const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname+"/public/css"));
mongoose.connect("mongodb://0.0.0.0:27017/wikiDB");
const articleSchema=new mongoose.Schema({
title: String,
content: String
});
const Article=mongoose.model("Article",articleSchema);
app.route("/articles")

.get(function(request,response){
    function getItem(){
        var query = Article.find({}).exec();
        return query;
     }
     query1=getItem();
     query1.then(function (foundItem) {
        const Items = foundItem.map(function (found) {
          return found;
        });
        response.send(foundItem);
    });
})

.post(function(request,response){
    const title1=request.body.title;
    const content1=request.body.content;
    const newitem=new Article({
        title: title1,
        content: content1
 }); 
    newitem.save();
 response.send("Successfully added new article");
})

.delete(function(request,response){
    const delitem=request.body.title;
    async function del1(){
        await Article.deleteOne({ title: delitem });
    }
    del1();
    response.send("Record deleted successfully");
});

/*app.get("/articles",function(request,response){
    function getItem(){
        var query = Article.find({}).exec();
        return query;
     }
     query1=getItem();
     query1.then(function (foundItem) {
        const Items = foundItem.map(function (found) {
          return found;
        });
        response.send(foundItem);
    });
});
app.post("/articles",function(request,response){
    const title1=request.body.title;
    const content1=request.body.content;
    const newitem=new Article({
        title: title1,
        content: content1
 }); 
    newitem.save();
 response.send("Successfully added new article");
});
app.delete("/articles",function(request,response){
    const delitem=request.body.title;
    async function del1(){
        await Article.deleteOne({ title: delitem });
    }
    del1();
    response.send("Record deleted successfully");
});*/
app.route("/articles/:customPath")
.get(function(request,response){
    function getItem(){
        var query = Article.findOne({title: request.params.customPath}).exec();
        return query;
     }
     query1=getItem();
     query1.then(function (foundItem) {
        response.send(foundItem);
    });
})
.patch(function(request,response){
    async function updatenew()
    {
        await Article.updateOne({title: request.params.customPath}, { $set: { title: request.body.title } });
    }
    updatenew();
    response.send("Data updated successfully");
});

app.listen(3000,function(request,response){
    console.log("Server started on port 3000")
});