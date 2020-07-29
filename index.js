const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
require('dotenv').config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

const uri = process.env.DB_PATH;

let client = new MongoClient(uri, { useNewUrlParser: true });

app.get('/foods', (req, res) =>{
    client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
        const collection = client.db("redOnion").collection("foods");
        collection.find().toArray((err, documents)=>{
            if(err){
                console.log(err)
                res.status(500).send({message:err});
            }
            else{
                res.send(documents);
            }
            client.close();
            //console.log("closed");
        });
      });
});

app.get('/features', (req, res) =>{
    client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
        const collection = client.db("redOnion").collection("features");
        collection.find().toArray((err, documents)=>{
            if(err){
                console.log(err)
                res.status(500).send({message:err});
            }
            else{
                res.send(documents);
            }   
        });
        //client.close();
      });
});

app.get('/food/:id', (req, res) =>{
    const id = req.params.id;    
    
    client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
        const collection = client.db("redOnion").collection("foods");
        collection.find({id}).toArray((err, documents)=>{
            if(err){
                console.log(err)
                res.status(500).send({message:err});
            }
            else{
                res.send(documents[0]);
            }
            client.close();
            //console.log("closed");
        });      
      });
});


app.get('/orders', (req, res) =>{
    client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
        const collection = client.db("redOnion").collection("orders");
        collection.find().toArray((err, documents)=>{
            if(err){
                console.log(err)
                res.status(500).send({message:err});
            }
            else{
                res.send(documents);
            }
        });
        client.close();
      });
});



app.post('/getFoodsById', (req, res) =>{
    const id = req.params.id;
    const foodIds = req.body;
    
    client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
        const collection = client.db("redOnion").collection("foods");
        collection.find({id: { $in: foodIds }}).toArray((err, documents)=>{
            if(err){
                console.log(err)
                res.status(500).send({message:err});
            }
            else{
                res.send(documents);
                //console.log(documents);
            }
        });
        client.close();
      });
});

app.get('/order/:id', (req, res) =>{
    const id = req.params.id;
    //console.log(_id);    
    
    client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
        const collection = client.db("redOnion").collection("orders");
        collection.findOne({"_id":ObjectId(id)} ,(err, documents)=>{
            if(err){
                console.log(err)
                res.status(500).send({message:err});
            }
            else{
                res.send(documents);
                console.log(documents);
            }
        });
        client.close();
      });
});


app.post('/addFoods', (req, res) => {
    const food = req.body;
    client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
        const collection = client.db("redOnion").collection("foods");
        collection.insert(food, (err, result)=>{
            if(err){
                console.log(err)
                res.status(500).send({message:err});
            }
            else{
                res.send(result.ops[0]);
            }
        });
        client.close();
      });
});

app.post('/addFeatures', (req, res) => {
    const food = req.body;
    client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
        const collection = client.db("redOnion").collection("features");
        collection.insert(food, (err, result)=>{
            if(err){
                console.log(err)
                res.status(500).send({message:err});
            }
            else{
                res.send(result.ops[0]);
            }
        });
        client.close();
      });
});

app.post('/placeOrder', (req, res) => {
    const orderDetails = req.body;
    orderDetails.orderTime = new Date();
    client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
        const collection = client.db("redOnion").collection("orders");
        collection.insertOne(orderDetails, (err, result)=>{
            if(err){
                console.log(err)
                res.status(500).send({message:err});
            }
            else{
                res.send(result.ops[0]);
            }
        });
        client.close();
      });
});

const port = process.env.PORT || 4200;
app.listen(port, () => console.log('Listenting to port 4200'));