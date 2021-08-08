const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const eventSchema = new mongoose.Schema({
  id: Number,
  taskName: String,
  img: String,
  color: String,
  date: String,
});

const userSchema = new mongoose.Schema({
  task: String,
  success: Boolean,
  error: String,
  email: String,
  name: String,
  events: Array,
});

const Event = mongoose.model('Event', eventSchema);
const User = mongoose.model('User', userSchema);

app.get('/', (req, res) => {
  res.send('Hello, world');
});

app.post('/addEvent', (req, res) => {
  const event = req.body;
  const newEvent = new Event(event);
  newEvent.save((err, doc) => {
    if (err) {
      console.log(err);
    } else {
      res.send(doc);
    }
  });
});

app.get('/getEvent', (req, res) => {
  Event.find({}, (err, docs) => {
    if (err) {
      console.log(err);
    } else {
      res.send(docs);
    }
  });
});

app.get('/eventById/:id', (req, res) => {
  console.log(req.params.id);
  Event.findOne({ id: req.params.id }, (err, docs) => {
    if (err) {
      console.log(err);
    } else {
      res.send(docs);
      console.log(docs);
    }
  });
});

app.post('/addUser', (req, res) => {
  const user = req.body;
  const newUser = new User(user);
  newUser.save((err, doc) => {
    if (err) {
      console.log(err);
    } else {
      res.send(doc);
    }
  });
});

app.get('/addedUser', (req, res) => {
  User.find({}, (err, docs) => {
    if (err) {
      console.log(err);
    } else {
      res.send(docs);
    }
  });
});

app.delete('/removeByEmail/:_id', (req, res) => {
  console.log(req.params._id);
  User.deleteOne({ _id: req.params._id }, (err, doc) => {
    if (err) {
      console.log(err);
    } else {
      res.send(doc);
    }
  });
});

app.listen(3001, () => {
  console.log('Server is running on PORT-3001');
});
