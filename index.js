const id = "dbDarksoul";
const pass = "6WpwIgaQnOCtmM2r";

//database conn


const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://dbDarksoul:6WpwIgaQnOCtmM2r@cluster0.xga2q.mongodb.net/<dbname>?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("onlineStore").collection("products");
  // perform actions on the collection object
  collection.insertOne({
      name:"laptop",
      price:200,
      stock:10
  }, (err,res) => {
      console.log('chuckcess...')
  })
  console.log('database conn...');
  client.close();
});
