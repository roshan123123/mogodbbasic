// here is hoe =w if app.js was in simple mongo db// basic implemention of how we connect our database to the server using node.js and native modulue of mongodb
//this is equvalent to making  a database and integrating to server in hyper in mongo
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');//to validate

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'myproject';

// Create a new MongoClient
const client = new MongoClient(url);

// Use connect method to connect to the Server
client.connect(function(err) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  const db = client.db(dbName);
//insert document mentioned below
      insertDocuments(db, function() {
        findDocuments(db, function() {
          client.close();
        });
      });
});

// insert a document in a database created above
const insertDocuments = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('documents');//documents is a variable which can be changed to what database we want
  // Insert some documents
  collection.insertMany([
    {a : 1}, {a : 2}, {a : 3}
  ], function(err, result) {
    assert.equal(err, null);//to validate there are no errors
    assert.equal(3, result.result.n);//these two are two check we have three results inserted even if we inser less than 3 than it will get inserted but give warning
    assert.equal(3, result.ops.length);
    // The insert command returns an object with the following fields:

// result Contains the result document from MongoDB
// ops Contains the documents inserted with added _id fields
// connection Contains the connection used to perform the insert
    console.log("Inserted 3 documents into the collection");
    callback(result);
  });
}

// to show all the documents this is bascically implementation of find in hyper
const findDocuments = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('documents');
  // Find some documents
  collection.find({}).toArray(function(err, docs) {//docs here is an output object which can be changed
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(docs)
    callback(docs);
  });
}

// there are more functionalities out there we can check from there
