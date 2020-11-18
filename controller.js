var Game = require('./model');

var async = require('async');


exports.getStatus = (req,res) =>{
    console.log(req.query);
    Game.findOne(req.query,{},{sort:{'createdAt': -1}}, (err,results)=>{
        console.log(results);
        if(results === null){
            let newWeight = [];
            for(var i = 3;i <12; i++){
                newWeight.push([1,1,1]);
            }
            newWeight.push([1,1,0]);
            newWeight.push([1,0,0]);
            res.send({weight: newWeight});
            return;
        }
        res.send({weight: results.weight});
    });
}

exports.storeGame = (req,res) =>{
    // var game = new Game({
    //     first: false,
    //     gameBoard: [0.1,0.1,0.1,1,1,1,1,1,1],
    //     weight: [[1,2,3],[4,5,6],[7,8,9]],
    //     gamerType: 1,
    //     algoType: 1
    // });
    // game.save((err)=>{
    //    console.log("Store Succeed");
    // });
}