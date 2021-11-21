//Start Web Server
const express = require('express')
const app = express()
app.listen(3000)

//Connect to MongoDB
const uri = process.env['uri'];
const MongoClient = require('mongodb').MongoClient;
const client = new MongoClient(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});
client.connect();
global.mclient = client;


app.get('/', (req, res) => {
  res.send('Endpoints<br><br>/players/:id to get a players simulator profile<br><br>/stats for general information')
})

//Different Route Constants
const playerRoute = require('./routes/players')
const statRouter = require('./routes/stats')


//Initializing the Routes
app.use('/players', playerRoute)
app.use('/stats', statRouter)