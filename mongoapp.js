const mongoose=require("mongoose");
mongoose.connect("mongodb://0.0.0.0:27017/newshopDB");
const shopSchema=new mongoose.Schema({
name: String,
rating: {
  type: Number,
  min: 1,
  max:10,
  required: [true, 'Why no rating?']
},
review: String
});
const Shop=mongoose.model("Shop",shopSchema);
/*const shop1=new Shop({
  name: "Eraser",
  rating: 6,
  review: "Good"
});
const shop2=new Shop({
  name: "Book",
  rating: 9,
  review: "Excellent"
});
const shop3=new Shop({
  name: "Copy",
  rating: 10,
  review: "Perfect"
});
Shop.insertMany([shop1,shop2,shop3]);*/
async function mystore() {
  const store= await Shop.find({});
  store.forEach(function(shop2){
      console.log(shop2.name);
  });
}

// Load the document
/*async function storenew()
{
const doc = await Shop.findOne({ name: "Copy" });

const update = { rating: 8 };
await doc.updateOne(update);

const updatedDoc = await Shop.findOne({ name: 'Copy' });
console.log(updatedDoc.rating);
}
storenew();*/
/*Shop.deleteOne({ name: "Copy"}).then(function(){
  console.log("Data deleted"); // Success
}).catch(function(error){
  console.log(error); // Failure
});*/
const personSchema=new mongoose.Schema({
name: String,
itemname: shopSchema
});
const Person=mongoose.model("Person",personSchema);
const person1=new Person({
name: "tushar",
itemname: {name: "Printer",rating: 6,review: "Good product"}
});
person1.save();
