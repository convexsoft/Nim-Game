var Game = require('./model');

var async = require('async');


exports.getStatus = (req,res) =>{
    console.log(req.query);
    Game.findOne(req.query,{},{sort:{'createdAt': -1}}, (err,results)=>{
        console.log(results);
        res.send({weight: results.weight});
    });
}

exports.storeGame = (req,res) =>{

}