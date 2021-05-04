import { Container, Row, Col} from 'react-bootstrap';
import React from "react";

import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';

// Table
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';

// Slider
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

// Chart
import {Chart} from "react-google-charts";

class AI extends React.Component {
    constructor(props){
        super(props);

        let weight = [[1,0,0],[1,1,0]];
        for(let i = 3;i<=13;i++){
            weight.push([1,1,1]);
        }

        let chart = [];
        chart[0] = ['x', 'winning times'];
        chart[1] = [0,0];

        this.state = {
            coins: 13,
            pickup: 3,
            algo: 1,
            weight: weight,
            addWeight: 0,
            minusWeight: -1,

            tmpcoins: 13,
            tmppickup: 3,
            tmpalgo: 1,
            tmpweightvalue: 1,
            tmpaddvalue: 0,
            tmpminusvalue: -1,

            coinstatus: 13,
            AI: false,
            start: false,
            win: 0,
            lose: 0,
            finished: false,
            speed: 1,
            randomPercentage: 5,
            gameBoard: [],
            chart: chart
        }
    };

    //Reset the whole game 
    reset(){
        let coins = this.state.tmpcoins;
        let pickup = this.state.tmppickup;
        let algo = this.state.tmpalgo;
        let weightvalue = this.state.tmpweightvalue;
        let addWeight = this.state.tmpaddvalue;
        let minusWeight = this.state.tmpminusvalue;
        let weight = []; 
        let tmp = [];
        let chart = [];
        chart[0] = ['x', 'winning times'];
        chart[1] = [0,0];
        var i;
        for(i = 0; i<pickup;i++){
            tmp.push(0);
        }
        for(i = 0; i<pickup;i++){
            tmp[i] = weightvalue;
            weight.push(Array.from(tmp));
        }
        for(i = pickup;i<coins;i++)
            weight.push(Array.from(tmp));
        
        this.setState({
            coins: coins,
            coinstatus: coins,
            pickup: pickup,
            algo: algo,
            weight: weight,
            addWeight: addWeight,
            minusWeight: minusWeight,
            chart: chart,
            gameBoard: [],
            AI: false,
            win: 0,
            lose: 0,
            finished: false,
            start: false
        })
    };

    updateWeight(){
        let gameBoard = this.state.gameBoard;
        let weight = this.state.weight;
        let pickup = this.state.pickup;
        let AI = this.state.AI;
        let algo = this.state.algo;
        let val = AI ? this.state.addWeight : this.state.minusWeight; //if AI wins, val is addWeight; otherwies, val is minusWeight.
        let coins = [];
        let pos = gameBoard.length - 1;
        coins[0] = this.state.coins;
        var i;
        for(i=1; i<=pos; i++)
            coins[i] = coins[i-1] - gameBoard[i-1];
        if(AI) pos -= 1; //Last step of AI.
        let tmpcount;

        console.log(gameBoard);
        console.log(coins);

        while(pos>0){
            tmpcount = 0;
            for(i = 0; i<pickup; i++){
                if(weight[coins[pos] - 1][i]>0){
                    tmpcount += 1;
                }
            }
            if(val<0){
                if(tmpcount === 1) {
                    pos -= 2;
                    continue;
                }
                weight[coins[pos] - 1][gameBoard[pos] - 1] += val;
                if(weight[coins[pos] - 1][gameBoard[pos] - 1]<0) weight[coins[pos] - 1][gameBoard[pos] - 1] = 0;
            }
            if(val>0){
                weight[coins[pos] - 1][gameBoard[pos] - 1] += val;
            }
            if(algo===1){
                break;
            }
            pos -= 2;
        }
        this.setState({weight:weight});
    }

    AIStep(){
        let coins = this.state.coinstatus;
        let weight = this.state.weight[coins - 1];
        let pickup = this.state.pickup;
        let weightsum = 0;
        var i;
        for(i=0;i<pickup;i++){
            weightsum += weight[i];
        }
        let rand = Math.random()*weightsum;
        let step = 0;
        for(i=0; i<pickup; i++){
            rand -= weight[i];
            if(rand<0){
                step = i + 1;
                break;
            }
        }
        return step;
    }

    playerStep(){
        let pickup = this.state.pickup;
        let coins = this.state.coinstatus;
        let mxpickup = Math.min(pickup, coins);
        let rand = this.state.randomPercentage;
        let tmprand = Math.floor(Math.random() * 10);
        let res = 1;
        if(tmprand < rand){ //random
            res = 1 + Math.floor(Math.random() * mxpickup);
            console.log('AI random pick: ',res);
        } else { //optimal 
            res = (coins - 1) % (pickup + 1);
            if(res === 0) res = 1; //the lost situation
            console.log('AI optimal pick: ',res);
        }
        return res;
    }

    autoRunOneStep(){
        let coinstatus = this.state.coinstatus;
        let finished = this.state.finished;
        let win = this.state.win;
        let lose = this.state.lose;
        let AI = this.state.AI;
        let gameBoard = this.state.gameBoard;
        let chart = this.state.chart;
        let tmpcoin;
        let flag = true;
        // One normal play step
        if(flag && finished===false && coinstatus > 0){
            flag = false;
            if(AI){
                tmpcoin = this.AIStep();
            } else {
                tmpcoin = this.playerStep();
            }
            gameBoard.push(tmpcoin);
            coinstatus -= tmpcoin;
            AI = !AI;
        }

        // Identify whether the game is finished
        if(flag && finished===false && coinstatus === 0){
            flag = false;
            finished = true;
        }

        // Finished one round and restart
        if(flag && finished===true && coinstatus === 0){
            flag = false;
            if(AI) win += 1;
            else lose += 1;
            console.log("One Round Finished");
            console.log(AI, "True means AI wins");
            let previd = chart[chart.length - 1][0] + 1;
            let prevval = chart[chart.length - 1][1];
            if(AI) prevval += 1;
            else prevval -= 1;
            chart.push([previd, prevval]);
            this.updateWeight();
            coinstatus = this.state.coins;
            finished = false;
            AI = false; //Each game should always let player goes first
            gameBoard = [];
        }

        this.setState({
            coinstatus: coinstatus,
            finished: finished,
            win: win,
            lose: lose,
            AI: AI,
            gameBoard: gameBoard,
            chart: chart
        });
    };
    
    start(){
        let speed = 1000/this.state.speed;
        this.intervalId = setInterval(() => {
            this.autoRunOneStep();
        }, speed);
    };
    
    stop(){
        if(this.intervalId !== undefined){
            clearInterval(this.intervalId);
        }
    };

    changeStatus(){
        let start = !this.state.start;
        if(start === true){
            this.start();
        } else {
            this.stop();
        }
        this.setState({start:start});
    };

    handleChange = (event, value) => {
        this.setState({speed:value});
        if(this.state.start === true){
            this.stop();
            this.start();
        }
      };

    handleClick = (event, val) =>{
        if(val==="val1"){
            this.reset();
        }
        if(val==="val2"){
            this.changeStatus();
        }
    }

    render() {
        let status = "";
        let coins = this.state.coinstatus;
        for(let i=0;i<coins;i++)
            status += ("🍭");
        let gameStatus = this.state.start ? "Stop" : "Start";
        let weight = this.state.weight;
        return (
            <Container>
                <Container>
                <h3> You can try Nim game AI here </h3>
                <h5> Rules: </h5>
                <p>Fish-Flavored Lollipops is a variant of Nim, an ancient math puzzle.</p>
                <p>When the game starts, I will show you 13 lollipops, where the last one of them is fish-flavored. It tastes so disgusting that nobody wants to eat it.</p>
                <p>The lollipops will be placed in one line, and you and I will take turns to take lollipops from the row. You can't take more than 3 lollipops at a time, and you can't skip your turn. Whoever takes the last lollipop (the fish-flavored one) lose the game.</p>
                <h1 style={{height:"40px"}}> {status} </h1>
                </Container>
                <Container>
                <Row>
                    <Col md={4}>
                        <h5> Data: </h5>

                        {/* TODO: change to for loop */}
                        {/* TODO: pickup should be smaller than lollipops */}
                        <FormControl style={{minWidth: 180}}>
                            {/* <p>Number of Lollipops: </p> */}
                            <InputLabel htmlFor="lollipopsNo">Number of Lollipops</InputLabel>
                            <Select
                            native
                            value={this.state.tmpcoins}
                            onChange={(e)=>{this.setState({tmpcoins:parseInt(e.target.value)});}}
                            inputProps={{
                                name: 'LollipopsNo:  ',
                                id: 'lollipopsNo',
                            }}
                            >
                            <option value={9}>9</option>
                            <option value={10}>10</option>
                            <option value={11}>11</option>
                            <option value={12}>12</option>
                            <option value={13}>13</option>
                            </Select>
                        </FormControl>

                        <FormControl style={{minWidth: 180}}>
                            <InputLabel htmlFor="pickupSelect">Maxmal Pickup Number</InputLabel>
                            <Select
                            native
                            value={this.state.tmppickup}
                            onChange={(e)=>{this.setState({tmppickup:parseInt(e.target.value)});}}
                            inputProps={{
                                name: 'pickupSelect:  ',
                                id: 'pickupSelect',
                            }}
                            >
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                            </Select>
                        </FormControl>

                        <FormControl style={{minWidth: 180}}>
                            <InputLabel htmlFor="pickupAlgorithm">Algorithm</InputLabel>
                            <Select
                            native
                            value={this.state.tmpalgo}
                            onChange={(e)=>{this.setState({tmpalgo:parseInt(e.target.value)});}}
                            inputProps={{
                                name: 'pickupAlgorithm',
                                id: 'pickupAlgorithm',
                            }}
                            >
                            <option value={1}>Traditional Boxing Algorithm</option>
                            <option value={2}>Back Propagation Algorithm</option>
                            </Select>
                        </FormControl>

                        <FormControl style={{minWidth: 180}}>
                            <InputLabel htmlFor="AddWeight">Initial Weight:</InputLabel>
                            <Select
                                native
                                value={this.state.tmpweight}
                                onChange={(e)=>{this.setState({tmpweightvalue:parseInt(e.target.value)});}}
                                inputProps={{
                                    name:'weight',
                                    id: 'weight'
                                }}
                            >
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                            </Select>
                        </FormControl>

                        <FormControl style={{minWidth: 180}}>
                            <InputLabel htmlFor="AddWeight">Add Reward Weight:</InputLabel>
                            <Select
                                native
                                value={this.state.tmpaddvalue}
                                onChange={(e)=>{this.setState({tmpaddvalue:parseInt(e.target.value)});}}
                                inputProps={{
                                    name:'addWeight',
                                    id: 'addWeight'
                                }}
                            >
                                <option value={0}>0</option>
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                            </Select>
                        </FormControl>

                        <FormControl style={{minWidth: 180}}>
                            <InputLabel htmlFor="AddWeight">Add Punish Weight:</InputLabel>
                            <Select
                                native
                                value={this.state.tmpminusvalue}
                                onChange={(e)=>{this.setState({tmpminusvalue:parseInt(e.target.value)});}}
                                inputProps={{
                                    name:'minusWeight',
                                    id: 'minusWeight'
                                }}
                            >
                                <option value={0}>0</option>
                                <option value={-1}>-1</option>
                                <option value={-2}>-2</option>
                                <option value={-3}>-3</option>
                            </Select>
                        </FormControl>

                        <div>
                        <Button variant="contained" color="primary" onClick={(event) => this.handleClick(event,"val1")}> SetValue </Button>
                        </div>

                        <Typography id="discrete-slider-random" gutterBottom>
                            Random Percentage (AI: Optimal -> Random)
                        </Typography>
                        <Slider
                            onChange={(e,val)=>{
                                this.setState({
                                    randomPercentage: val
                                });
                            }}
                            defaultValue={5}
                            getAriaValueText={this.valuetext1}
                            aria-labelledby="discrete-slider"
                            valueLabelDisplay="auto"
                            step={1}
                            marks
                            min={0}
                            max={10}
                        />
                    <Typography id="discrete-slider-speed" gutterBottom>
                        Speed (No. of operations per second)
                    </Typography>
                    <Slider onChange ={(e, val)=>this.handleChange(e, val)}
                        defaultValue={1}
                        getAriaValueText={this.valuetext}
                        aria-labelledby="discrete-slider"
                        valueLabelDisplay="auto"
                        step={1}
                        marks
                        min={1}
                        max={30}
                    />

                    <div>
                    <Button variant="contained" color="primary" onClick={(event) => this.handleClick(event,"val2")}> {gameStatus} </Button>
                    </div>

                    </Col>
                    <Col md={4}>
                    <h5> Matrix Weight:</h5>
                    <TableContainer>
                        <Table aria-label="simple table">                            
                            <TableHead>
                                <TableRow>
                                <TableCell align="center">BoxID</TableCell>
                                {weight[0].map((item, idx)=>{
                                    return(<TableCell key={idx} align="center">
                                        {idx+1}🍭
                                    </TableCell>
                                )})}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {weight.map((item, idx)=>{
                                    var entry = item.map((ele, j)=>{
                                        return (
                                            <TableCell key={j} align="center">
                                            {ele}
                                            </TableCell>
                                        )})
                                    return (
                                        <TableRow key={idx}>
                                            <TableCell key={idx} align="center">
                                            {idx+1}
                                            </TableCell>
                                            {entry}
                                        </TableRow>
                                    )})}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    </Col>
                    <Col md={4}>
                    <h5>Game Results: </h5>
                    <div className="game-board">
                        <p> AI wins: {this.state.win} </p>
                        <p> Player wins: {this.state.lose} </p>
                    </div>
                    <div className="container">
                        <div className={"my-pretty-chart-container"}>
                            <Chart
                                chartType="LineChart"
                                loader={<div>Loading Chart</div>}
                                data={this.state.chart}
                                width="100%"
                                height="400px"
                                options={{
                                    legend: 'none'
                                }}
                            />
                        </div>
                    </div>
                    </Col>
                </Row>
                </Container>
            </Container>
        );
    }
}

export default AI;