var Game = require('./model');
var async = require('async');
var Bot = require('./gameBot');
const COIN_NUM = 13;

exports.getStatus = (req,res) =>{
    console.log(req.query);
    Game.findOne(req.query,{},{sort:{'createdAt': -1}}, (err,results)=>{
        if(results === null){
            let newWeight = [];
            newWeight.push([1,0,0]); // One stone left
            newWeight.push([1,1,0]); // Two stone left
            for(var i = 3;i <=COIN_NUM; i++){
                newWeight.push([1,1,1]);
            }
            res.send({weight: newWeight});
            return;
        }
        res.send({weight: results.weight});
    });
}

exports.storeGame = (req,res) =>{
    let tmp;
    for(var i=0;i<COIN_NUM;i++){
        tmp = req.query["weight"][i];
        tmp= tmp.slice(1,tmp.length-1).split(",");
        req.query["weight"][i] = tmp;
    }
    console.log(req.query["weight"]);

    var game = new Game(req.query);
    game.save((err)=>{
        if(err) console.log(err);
        res.send("Store Succeed");
    });
}

exports.getAllResults = (req, res) =>{
    const gameResult = [];
    Game.find({algoType:1, gamerType:1}).sort({createdAt: 1}).exec((err,docs) => {
        for(var i=0;i<docs.length;i++){
            gameResult[i] = {};
            gameResult[i].id = i;
            gameResult[i].status = docs[i]["win"];
        }
        res.json(gameResult);
    })
    // console.log(games);
}

exports.passResults = (req, res) => {
    let status = JSON.parse(req.query["data"]);
    // console.log(status);
    // console.log("test");
    let record = Bot.weightUpdate(status);
    Bot.storeGame(record);

    res.send("Update Succeed");
}