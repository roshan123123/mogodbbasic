//using mongoose to coneect to our database and interact with it mongodb .js has pure mongodb code withourt mongoose
const mongoose =require('mongoose');
mongoose.connect("mongodb://localhost:27017/fruitsDB") ; //this will crete if fruitDB is not there if there then will connect to the db directly

//craeting a schema
const fruitSchema=new mongoose.Schema(
  {
    name: String,//Note s is capital
    rating: Number, //N is capital
    review: String

  }
);


//how we validate things
// const fruitSchema=new mongoose.Schema(
//   {
//     name:
//{
  // type: String,
  // required :[true,"why name is not there"]
//},//Note s is capital
//we can also set a field required that simply ensures that while pushing the data to database there is a check if this field is there or not
//     rating: //to ensure that the rating is between 1 to 10
//     {
//       type :Number,
//       min:1,
//       max:10,
//
//     },
//     review: String,
//
//   }
// );

const Fruit= mongoose.model("Fruit",fruitSchema);//cretaing a collection model named fruits and schema of fruitSchema see the Fruit passed in the parameter in our collection willl be passed as fruits

const fruit=new Fruit(      //craeting a new document to push to our collection
  {
    name: "apple",//Note s is capital
    rating:7, //N is capital
    review: "pretty good",
  }
);

const mango=new Fruit(      //craeting a new document to push to our collection
  {
    name: "mango",//Note s is capital
    rating:7, //N is capital
    review: "king of fruits",
  }
);

const banana=new Fruit(      //craeting a new document to push to our collection
  {
    name: "banana",//Note s is capital
    rating:8, //N is capital
    review: "kela h bhai",
  }
);
fruit.save();//saving to respective database  one by one  coneect (only one wiil be saved)

// saving may items at the same time in a database
Fruit.insertMany([mango,banana],function(err)
{
  if(err)
  {
    console.log("error while loading the data to database");
  }
  else{
    console.log("loaded data successfully");
  }
});

//reading the values from our database
Fruit.find(function(err,anyThing)//before function we can put some condn
{
  if(err)
  {
    console.log("some error ocuured while reading");
    console.log(err);
  }
  else{
    //we can access now by concept of arrays also a sanything is an arrays

//anything now holds the complet table
    anyThing.forEach(function(anyel)//js function can also be looped
  {
    console.log(anyel.name);
  });
    // closing the connnection so that we do not need to run ^c agaiin and again
    //add this to last function used
       // mongoose.connection.close();


  }
});
// closing the connnection so that we do not need to run ^c agaiin and again
// mongoose.connection.close();

// updating the data it takes three things filter, update, callback function
Fruit.updateOne({name:"apple"},{name:"bsdkaapple"},function(err)
{
  //console.log(err);
      // mongoose.connection.close();//closing server hhere
});
//deleting documents from database
Fruit.deleteMany({name:"bsdkaapple"},function(err){
   mongoose.connection.close();
})
