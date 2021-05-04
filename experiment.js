// Find the relation between node N and K
// 2021.03.07

function gamePlay(gameWeight, COIN_NUM, PICK_NUM){
    let coins = COIN_NUM;
    let gameBoard = [];
    // let first = Math.random()< 0.5? true : false;
    let first = false; // Players goes first
    let player = 0, AI = -1;
    let gameStatus = {};
    gameStatus["first"] = first;
    gameStatus["weight"] = gameWeight;
    while(coins>0){
        if(!first) {
            // Random Player
            if(Math.random()<0.5) {
                player = Math.floor(Math.random() * PICK_NUM) + 1; // Randomly take 1 to 3.
                player = Math.min(player, coins); // Take the last one lose
            }else {
                //Optimal Player
                player = (coins - 1) % (PICK_NUM + 1);
                if (player == 0) player = PICK_NUM;
                player = Math.min(player, coins);
            }
            coins -= player;
            gameBoard.push(player);
        } else {
            let weightRank = [];
            for(var i=0;i<PICK_NUM;i++)
                weightRank.push(gameWeight[coins-1][i]);
            // console.log(weightRank);
            let sum = 0.0;
            let jud =  Math.random();
            for(var i=0;i<PICK_NUM;i++)
                sum += jud * gameWeight[coins-1][i];
            // console.log(jud, sum, weightRank);
            for(var i=0;i<PICK_NUM;i++){
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
        if(coins == 0){
            if(first) gameStatus["win"] = true;
            else gameStatus["win"] = false;
        }
    }
    gameStatus["gameBoard"] = gameBoard;
    return gameStatus;
}

function weightUpdate(gameStatus, COIN_NUM, PICK_NUM){
    let flag = true;
    let pos = gameStatus["gameBoard"].length - 1;
    let gameWeight = gameStatus['weight'];
    let coins = [];
    coins[0] = COIN_NUM;
    for(var i = 1;i<pos+1;i++)
        coins[i] = coins[i-1] - gameStatus["gameBoard"][i-1];

    // console.log(gameWeight);
    while(!gameStatus["win"] && flag && pos>0){
        let jud = 0;
        for(var i=0;i<PICK_NUM;i++)
            jud += gameWeight[coins[pos]-1][i];
        // console.log(gameWeight[coins[pos]-1],coins[pos],pos,jud);
        if(jud > 1){
            gameWeight[coins[pos]-1][gameStatus["gameBoard"][pos] - 1] -= 1;
            flag = false;
        }
        pos -= 2;
    }

    gameStatus["weight"] = gameWeight;
    return gameStatus;
}

function oneRound(N,K){
   let COIN_NUM = N;
   let PICK_NUM = K;
   let gameWeight = [];
   let tmp;
   for(var i=0;i<COIN_NUM;i++){
        tmp = [];
       for(var j=0;j<PICK_NUM;j++)
           tmp.push(1);
       gameWeight.push(tmp);
   }
   for(var i=0;i<PICK_NUM;i++){
       for(var j=(i+1);j<PICK_NUM;j++){
           gameWeight[i][j] = 0;
       }
   }
   let gameStatus;
   for(var i=0;i<100;i++){
       gameStatus = gamePlay(gameWeight,COIN_NUM,PICK_NUM);
       gameStatus = weightUpdate(gameStatus, COIN_NUM, PICK_NUM);
       console.log("Round ",i," :\n",gameStatus);
       gameWeight = gameStatus['weight'];
   }
}

oneRound(9,3);