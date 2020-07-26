//database conn


const MongoClient = require('mongodb').MongoClient;
const uri = process.env.DB_PATH;
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
