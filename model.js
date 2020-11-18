const mongoose = require('mongoose');
const { Schema } = mongoose;

const gameSchema = new Schema({
    first: Boolean,
    gameBoard: [{type:Number}],
    weight: [[{type:Number}]],
    createdAt: {type: Date, default: Date.now},
    gamerType: Number,
    algoType: Number
});

module.exports = mongoose.model('Game', gameSchema);