var express = require('express');
var app = express();
var game = require('./model');
var game_controller = require('./controller');

const mongoose = require('mongoose');

// Set up mongoose connection
mongoose.connect('mongodb://localhost:27017/nimgame', {useNewUrlParser: true,  useUnifiedTopology: true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Router
app.get('/getStatus',game_controller.getStatus);
app.get('/storeGame',game_controller.storeGame);

app.listen(3000);