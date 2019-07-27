const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
var multer = require('multer')
const items = require('./routes/api/items');
const assert = require('assert');
const mongodb = require('mongodb');
const formidable = require('formidable')
// DB Config
const db = require('./config/keys').mongoURI;
const fs = require('fs');

var app = express();
// app.use(express.static(__dirname + '/client/public'));
var multer = require('multer');
var GridFsStorage = require('multer-gridfs-storage');
var Grid = require('gridfs-stream');

// Bodyparser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

var cors = require('cors');
app.use(cors())

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './public/uploads');
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
    console.log(file.originalname);
  }
})

var upload = multer({
  storage: storage
});

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://asrar:14191237soso@cluster0-mexlt.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true
});

app.post('/uploadDB', upload.single('file'), (req, res) => {
  console.log(req.file);
  var filePath = './public/uploads/' + req.file.originalname;
  client.connect(err => {
    const collection = client.db("test").collection("devices");
    const db = client.db("test");
    var bucket = new mongodb.GridFSBucket(db);
    fs.createReadStream(filePath).
    pipe(bucket.openUploadStream(req.file.originalname)).
    on('error', function(error) {
      console.log(error);
    }).
    on('finish', function() {
      console.log('done save the file!');
    });
  });
  return res.status(200).send(req.file)
});



app.post('/upload', function(req, res) {
  console.log("server accc");
  return res.status(200)
});

app.get('/fileName', (req, res) => {
  var fileName="lect5-Part 2_pagenumber.pdf";
  var filePath = "./public/uploads/" + fileName;
  client.connect(err => {
    const collection = client.db("test").collection("devices");
    const db = client.db("test");
    var file = fs.createWriteStream(filePath);
    var bucket = new mongodb.GridFSBucket(db);
    bucket.openDownloadStreamByName(fileName).
    pipe(file).
    on('error', function(error) {
      console.log(error);
      client.close();
    }).
    on('finish', function() {
      console.log('gettt it!');
      return res.status(200).send("done saving file");
    });
  });

});

// Connect to Mongo
mongoose
  .connect(db, {
    useNewUrlParser: true
  }) // Adding new mongo url parser
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

// Use Routes
app.use('/api/items', items);

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {

  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
