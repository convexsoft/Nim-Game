import React from "react";
import {Chart} from "react-google-charts";
const COINS = 13;

class game extends React.Component {
    constructor(props){
        super(props);
        let weight = [[1,0,0],[1,1,0]];
        for(let i = 3;i<=COINS;i++){
            weight.push([1,1,1]);
        }
        let chart = [];
        chart[0] = ['x','Ai\'s Training Outcome'];
        chart[1] = [0,0];

        this.state = {
            win: 0,
            lose: 0,
            weight: weight,
            coins: COINS,
            player: true,
            gameBoard: [],
            AI: 0,
            finished: false,
            result: false,
            chart: chart
        }
    }
    handleClick(i){
        let player = !this.state.player;
        let coins = this.state.coins;
        let result = this.state.result;
        let finished = false;
        let win = this.state.win;
        let lose = this.state.lose;
        let chart = this.state.chart;
        if(i===0) { //AI win the game
            coins -= this.state.AI;
            if(coins === 0){
                finished = true;
                result = false;
                lose += 1;
                chart.push([chart[chart.length-1][0]+1, chart[chart.length-1][1]-1]);
            }
            this.setState({
                player: player,
                coins: coins,
                finished: finished,
                result: result,
                lose: lose,
                chart: chart
            })
            return;
        }
        let weight = this.state.weight;
        let gameBoard = this.state.gameBoard;
        let step = i;

        coins -= step;
        gameBoard.push(step);
        if(coins===0){//AI lose the game
            win += 1;
            finished = true;
            result = true;
            chart.push([chart[chart.length-1][0]+1, chart[chart.length-1][1]+1]);
        } else {
            let weightRank = [weight[coins - 1][0], weight[coins - 1][1], weight[coins - 1][2]];
            let sum = Math.random() * (weightRank[0] + weightRank[1] + weightRank[2]);
            for (var j = 0; j < 3; j++) {
                sum -= weightRank[j];
                if (sum <= 0) {
                    step = j + 1;
                    break;
                }
            }
            gameBoard.push(step);
        }
        this.setState({
            coins: coins,
            gameBoard: gameBoard,
            player: player,
            AI: step,
            finished: finished,
            result: result,
            win: win
        })
    }

    restartGame(){
        //upload from weight
        let gameBoard = this.state.gameBoard;
        let weight = this.state.weight;
        let pos = gameBoard.length - 1;
        let coins = [];
        coins[0] = COINS;
        for(var i = 1;i<pos+1;i++)
            coins[i] = coins[i-1] - gameBoard[i-1];
        let flag = true;
        while(this.state.result === false && flag && pos>=0){
            if(weight[coins[pos]-1][0] + weight[coins[pos]-1][1] + weight[coins[pos]-1][2]>1){
                weight[coins[pos]-1][gameBoard[pos]-1] -= 1;
                flag = false;
            }
            pos -= 2;
        }
        this.setState({
            coins: 13,
            finished: false,
            player: true,
            weight: weight,
            gameBoard: [],
            AI: 0
        })
    }

    options = {
        hAxis: {
            title: "Number of Games Played",
        },
        vAxis: {
            title: "Number of Games Won by AI",
        },
    }

    render() {
        let status = "";
        let coins = this.state.coins;
        let AI = this.state.AI;
        let finished = this.state.finished;
        console.log(AI);
        for(let i=0;i<coins;i++)
            status += ("🍭");
        let desc = "";
        if(coins > 0){
            desc = this.state.player ? 'Now is your turn, please make your choice: ' : 'The AI\'s choice is: ' + AI;
        }else {
            desc = this.state.result ? 'You lose this game': 'Congrats, you win this game. ';
        }
        let select = Math.min(coins,3);
        let test = [];
        if(!finished){
            if(this.state.player) {
                for(let i=0;i<select;i++){
                    test.push(<button className="btn btn-outline-primary mr-2" value={i+1} onClick={() => this.handleClick(i+1)}> Take {i+1} </button>);
                }
            } else {
                test.push(<button className="btn btn-primary" onClick={() => this.handleClick(0)}> Next </button>);
            }
        } else {
            test.push(<button className="btn btn-primary" onClick={() => this.restartGame()}> Try Again? </button>);
        }
        return (
            <div className="container">
                <div className="game">
                   <h3> You can play Nim game here </h3>
                    <h5> Rules: </h5>
                    <p>Fish-Flavored Lollipops is a variant of Nim, an ancient math puzzle.</p>
                    <p>When the game starts, I will show you 13 lollipops, where the last one of them is fish-flavored. It tastes so disgusting that nobody wants to eat it.</p>
                    <p>The lollipops will be placed in one line, and you and I will take turns to take lollipops from the row. You can't take more than 3 lollipops at a time, and you can't skip your turn. Whoever takes the last lollipop (the fish-flavored one) lose the game.</p>
                    <h1> {status} &nbsp; </h1>
                    <h5> {desc} </h5>
                    <h5> {test} </h5>
                    <h3>Game Results: </h3>
                    <div className="game-board">
                        <h5> AI wins: {this.state.win}</h5>
                        <h5> Player wins: {this.state.lose} </h5>
                    </div>
                    <div className="container">
                        <div className={"my-pretty-chart-container"}>
                            <Chart
                                chartType="LineChart"
                                loader={<div>Loading Chart</div>}
                                data={this.state.chart}
                                width="100%"
                                height="400px"
                                legendToggle
                                options={this.options}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default game;