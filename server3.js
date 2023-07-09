const express=require("express");
const bodyParser=require("body-parser");
const date=require(__dirname+"/date.js");
const mongoose=require("mongoose");
mongoose.connect("mongodb://0.0.0.0:27017/todo");
const app=express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
const itemSchema=new mongoose.Schema({
    name: String
    });
    const Item=mongoose.model("Item",itemSchema);
    const item1=new Item({
        name: "Welcome to your to-do list"
    });
    const item2=new Item({
        name: "Click submit to enter to-do item"
    });
    const defaultItems=[item1,item2];
    //Item.insertMany(defaultItems);
    /*function getItemQuery(){
        var query = Item.find({});
        return query;
     }
     var query =  getItemQuery();
     query.exec(function(err,listitems){
        if(err)
           return console.log(err);
        listitems.forEach(function(listitems){
           console.log(listitems.name);
        });
     });*/
    app.get("/",function(request,response){
        function getItem(){
            var query = Item.find({}).exec();
            return query;
         }
         query1=getItem();
         query1.then(function (foundItem) {
            const listItems = foundItem.map(function (found) {
              return found.name;
            });
            console.log(listItems);
            if(listItems.length===0)
            {
                Item.insertMany(defaultItems);
            }
            response.render("index1", { listname: "Casual", viewitem: foundItem, Day: day, Date: date1 });
          }).catch(function (err) {
            console.log(err);
            // Handle the error appropriately
          });
        });
        //response.render("index1",{listname:"Casual",viewitem:listitem,Day:day,Date:date1})
    
var day=date.getDay();
var date1=date.getDate();
/*app.get("/",function(request,response){
response.render("index1",{listname:"Casual",viewitem:items,Day:day,Date:date1});
});*/
app.get("/work",function(request,response){
 response.render("index1",{listname:"Work",viewitem:workitem,Day:day,Date:date1});
});
var items=[];
var workitem=[];
app.post("/",function(req,res){
var lname=req.body.list;
var newitem=req.body.item;
if(lname==="Work")
{
    workitem.push(newitem);
    res.redirect("/work");
}
else{
    const itemadded=new Item({
        name: newitem    
    });
    itemadded.save();
    res.redirect("/");
}
});
app.post("/delete",async function(request,response){
const checkeditem=request.body.checkbox;
//const citem=mongoose.Types.ObjectId((checkeditem).trim());
const validId = new mongoose.Types.ObjectId(checkeditem);

/*Item.findByIdAndRemove({_id: validId})
.then(() => {
    response.redirect("/");
  })
  .catch(error => {
    console.log(error);
  });*/
});
app.get("/:customListName",function(request,response){
const customListName=request.params.customListName;
console.log(customListName);
});
app.listen(3000,function(){
    console.log("Server started on port 3000");
});