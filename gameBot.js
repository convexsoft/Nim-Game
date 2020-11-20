const axios = require('axios');

// Using the algorithm in https://www.i-am.ai/build-your-own-ai.html
exports.weightUpdate = (gameStatus) => {
    let res = {};
    res["algoType"] = 1;
    res["gamerType"] = 1;
    res["gameBoard"] =  gameStatus["gameBoard"];
    res["win"] =  gameStatus["win"];
    res["first"] =  gameStatus["first"];
    res["weight"] = gameStatus["gameWeight"];
<<<<<<< Updated upstream

=======
    res["playerID"] = gameStatus["playerID"];
>>>>>>> Stashed changes
    let flag = true;
    let pos = res["gameBoard"].length - 1;
    let coins = [];
    coins[0] = 12;
    for(var i = 1;i<pos+1;i++)
        coins[i] = coins[i-1] - res["gameBoard"][i-1];
    while(res["win"]===false && flag && pos>0){
        if(res["weight"][coins[pos]-1][0] + res["weight"][coins[pos]-1][1] +  res["weight"][coins[pos]-1][2]  > 1){
            res["weight"][coins[pos]-1][gameStatus["gameBoard"][pos] - 1] -= 1;
            flag = false;
        }
        pos -= 2;
    }
    return res;
}

exports.storeGame = async (gameStatus) =>{
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