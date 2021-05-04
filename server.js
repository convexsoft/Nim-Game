const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const game = require('./model');
const game_controller = require('./controller');

const mongoose = require('mongoose');

// Set up mongoose connection
mongoose.connect('mongodb://localhost:27017/nimgame', {useNewUrlParser: true,  useUnifiedTopology: true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


app.use(cors());
// Router
app.get('/getStatus',game_controller.getStatus);
app.get('/storeGame',game_controller.storeGame);
app.get('/passResults', game_controller.passResults);
app.post('/getAllResults', game_controller.getAllResults);
app.post('/saveResults',game_controller.saveResults);

app.listen(3032);