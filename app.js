// jshint esversion: 6

//######################## mongoose setup with dbName ########################
const mongoose = require('mongoose');

// connection URL
const url = "mongodb://localhost:27017";

// Database Name
const dbName = 'fruitsDB';

// mongoose.connect("mongodb://localhost:27017/fruitsDB");
mongoose.connect(url + "/" + dbName, {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

// Example 1 👉

//######################## setting a schema and collection ########################
const fruitSchema = new mongoose.Schema({
  // mongoose validation
  name: {
    type: String,
    required: [true, "Please check your data entry, no name is specified!"]
  },
  rating: {
    type: Number,
    min: 1,
    max: 10
  },
  review: String
});
// mongoose will pluralise this 'Fruit' in the DB.
const Fruit = mongoose.model('Fruit', fruitSchema);

//######################## saving a collection ########################

// const fruit = new Fruit({
//   rating: 10,
//   review: "peech Awesome Fruit"
// });
// // each time you call this save() method, it will create DB.
// fruit.save();

//######################## insert many in DB ########################
/*
const kiwi = new Fruit({
  name: "Kiwi",
  rating: 10,
  review: "The best Fruit"
});

const orange = new Fruit({
  name: "Orange",
  rating: 4,
  review: "Too sour"
});

const banana = new Fruit({
  name: "Banana",
  rating: 3,
  review: "Healthy"
});
// each time you call this insertMany() callback, it will insertMany DB.
Fruit.insertMany([kiwi, orange, banana], function(err){
  if (err) {
    console.log(err);
  } else {
    console.log('successfully saved all the fruits to fruitsDB');
  }
});
*/

//######################## reading data from DB ########################
Fruit.find(function(err, fruits) {
  if (err) {
    console.log(err);
  } else {
    // 👉 closing connection
    mongoose.connection.close();
    //
    fruits.forEach(function(fruit) {
      console.log(fruit.name);
    });
  }
});

//######################## updating data in DB ########################
// Fruit.updateOne({_id: "5f4fd95e8445ed089c6ce4e8"}, {name: "Peach"}, function(err) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("successfully updated Fruit.");
//   }
// });

//######################## delete data from DB ########################
// One
// Fruit.deleteOne({_id: "5f4fd95e8445ed089c6ce4e8"}, function(err) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("deleted successfully.");
//   }
// });

// Many
// Fruit.deleteMany({name: "Apple"}, function(err) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("deleted successfully.");
//   }
// });

// Example 2 👉
//######################## setting a schema and collection ########################
// const personSchema = new mongoose.Schema({
//   name: String,
//   age: Number
// });
//
// // mongoose will pluralise this 'Person' into 'People' in the DB.
// const Person = mongoose.model('Person', personSchema);

//######################## saving a collection ########################
// const person = new Person({
//   name: 'Himanshu',
//   age: 12
// });
//
// person.save();

//➡️######################## Establishing Relationship and embedding documents ########################
const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favouriteFruit: fruitSchema
});

// mongoose will pluralise this 'Person' into 'People' in the DB.
const Person = mongoose.model('Person', personSchema);

//########################
// Creating a new fruit and saving in person and fruit as well.
// const pineapple = new Fruit({
//   name: 'Pineapple',
//   score: 9,
//   review: 'Great fruit'
// });
//
// pineapple.save();
//
// const person = new Person({
//   name: 'Aman',
//   age: 20,
//   favouriteFruit: pineapple
// });
//
// person.save();

//########################
// inserting a new fruit in person.
const blackberry = new Fruit({
  name: 'blackberry',
  score: 9,
  review: 'Great fruit'
});
Person.updateOne({name: "Himanshu"}, {favouriteFruit: blackberry}, function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log("successfully updated documents.");
  }
});
