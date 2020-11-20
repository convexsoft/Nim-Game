const axios = require('axios');
const BASE_URL = '';
const COIN_NUM = 13;

async function getStatus(gamerType, algoType){
    let gameWeight = [];
    await axios ({
        method: 'get',
        baseURL: 'http://localhost:3032',
        url: '/getStatus',
        'Content-Type': 'application/json',
        params: {
            gamerType: gamerType,
            algoType: algoType
        }
    })
    .then((result) => {
        gameWeight = result.data;
    })
    .catch((err) => { console.error(err) });
    return gameWeight;
}

async function storeGame(gameStatus){
    let res;
    await axios ({
        method: 'get',
        baseURL: 'http://localhost:3032',
        url: '/storeGame',
        'Content-Type': 'application/json',
        params: gameStatus
    })
        .then((result) => {
            res = result.data;
        })
        .catch((err) => { console.error(err) });
    return res;
}

function gamePlay(gameWeight){
    let coins = COIN_NUM;
    let gameBoard = [];
    let first = Math.random()< 0.5? true : false;
    let player = 0, AI = 0;
    let gameStatus = {};
    gameStatus["first"] = first;

    while(coins>0){
        if(!first) {
            player = Math.floor(Math.random() * 3) + 1; // Randomly take 1 to 3.
            player = Math.min(player, coins); // Take the last one lose
            coins -= player;
            gameBoard.push(player);
        } else {
            let weightRank = [gameWeight[coins-1][0],gameWeight[coins-1][1],gameWeight[coins-1][2]];
            let sum = Math.random() * (gameWeight[coins-1][0]+gameWeight[coins-1][1]+gameWeight[coins-1][2]);
            for(var i=0;i<3;i++){
                sum -= weightRank[i];
                if(sum <= 0){
                    AI = i+1;
                    break;
                }
            }
            coins -= AI;
            gameBoard.push(AI);
        }
        first = !first;
        // console.log(coins);
        if(coins == 0){
            if(first) gameStatus["win"] = true;
            else gameStatus["win"] = false;
        }
    }
    gameStatus["gameBoard"] = gameBoard;
    gameStatus["gamerType"] = 2;
    return gameStatus;
}

function weightUpdate(gameStatus, gameWeight){
    // console.log(gameStatus);
    // console.log("OldGameWeight", gameWeight);
    gameStatus["algoType"] = 1;

    // Back Prop Algorithm ?
    // let weight = gameStatus["win"]? 0 : -1;
    // let coins = COIN_NUM;
    // let first = gameStatus["first"];
    // let pos = 0;
    // while(coins>0){
    //     if(first){ // Only updates when game AI plays
    //         if((gameWeight[coins-1][0] + gameWeight[coins-1][1] + gameWeight[coins-1][2]) > 1) { // Don't change the last one
    //             gameWeight[coins - 1][gameStatus["gameBoard"][pos] - 1] += weight;
    //         }
    //         console.log(pos," ",coins," ",gameStatus["gameBoard"][pos]);
    //     }
    //     coins -= gameStatus["gameBoard"][pos];
    //     first = !first;
    //     pos = pos + 1;
    // }

    let flag = true;
    let pos = gameStatus["gameBoard"].length - 1;
    let coins = [];
    coins[0] = COIN_NUM;
    for(var i = 1;i<pos+1;i++)
        coins[i] = coins[i-1] - gameStatus["gameBoard"][i-1];
    while(!gameStatus["win"] && flag && pos>0){
        // console.log(flag,coins[pos], gameWeight[coins[pos]-1][0], gameWeight[coins[pos]-1][1], gameWeight[coins[pos]-1][2]);
        if(gameWeight[coins[pos]-1][0] + gameWeight[coins[pos]-1][1] +  gameWeight[coins[pos]-1][2]  > 1){
            gameWeight[coins[pos]-1][gameStatus["gameBoard"][pos] - 1] -= 1;
            flag = false;
        }
        pos -= 2;
    }

    gameStatus["weight"] = gameWeight;
    return gameStatus;
}

async function randomPlayer(){
    let gameWeight = await getStatus(2,1);
    gameWeight = gameWeight["weight"];
    let gameStatus = gamePlay(gameWeight);
    gameStatus = weightUpdate(gameStatus, gameWeight);
    let res = await storeGame(gameStatus);
    console.log(gameStatus["win"]);
}
async function test(){
    for(var i=0;i<50;i++){
        await randomPlayer();
        console.log("Training :", i, "finished");
    }
}

// test();
randomPlayer();