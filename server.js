const bodyParser = require('body-parser');
const express = require('express');

const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

const app = express();
const jsonParser = bodyParser.json();

app.use(express.static('public'));

let db = null;
async function main() {
  const DATABASE_NAME = 'cs193x-db';
  const MONGO_URL = `mongodb://localhost:27017/${DATABASE_NAME}`;

  // The "process.env.MONGODB_URI" is needed to work with Heroku.
    db = await MongoClient.connect(process.env.MONGODB_URI || MONGO_URL);
  // The "process.env.PORT" is needed to work with Heroku.
  const port = process.env.PORT || 3000;
  await app.listen(port);
  //console.log(db);
  console.log(`Server listening on port ${port}!`);
  
};

main();

async function onGet(req, res) {
  console.log(`Get data!`);
  const day = req.params.day;
  
  var query = { day: day };
  const collection = db.collection('diary');
  const options = {'_id' : -1};
  //const result = await collection.findOne({$query:query,$orderby:options});
  const result = await collection.find({day:day}).sort({_id:-1}).limit(1).toArray();
  console.log(result);
  console.log(result[0].content);
  const response = {
    day: day,
    //content: result ? result[0].content : ''
    content:result[0].content
  };
  console.log(response);
  res.json(response);
}
app.get('/get/:day', onGet);

async function onPost(req, res) {
    console.log("post!");
  const day = req.body.day;
  const content = req.body.content;
  const data = {
      day: day,
      content: content
  }
  console.log(data);
  const collection = db.collection('diary');
  const response = await collection.insertOne(data);
  res.json({response :  content});
}
app.post('/save', jsonParser, onPost);
////////////////////////////////////////////////////////////////////////////////

// TODO(you): Add at least 1 GET route and 1 POST route.
