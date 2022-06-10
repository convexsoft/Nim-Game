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

        let AIweight = JSON.parse(JSON.stringify(weight));

        let chart = [];
        chart[0] = ['x', 'Ai\'s Training Outcome'];
        chart[1] = [0,0];

        this.state = {
            coins: 13,
            pickup: 3,
            algo: 1,
            weight: weight,
            addWeight: 0,
            minusWeight: -1,
            opponent: 0,

            tmpcoins: 13,
            tmppickup: 3,
            tmpalgo: 1,
            tmpweightvalue: 1,
            tmpaddvalue: 0,
            tmpminusvalue: -1,
            tmpopponent: 0,

            coinstatus: 13,
            AI: false,
            start: false,
            win: 0,
            lose: 0,
            finished: false,
            flag: false,  // flag for the first time
            AIweight: AIweight,
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
        let opponent = this.state.tmpopponentvalue;

        let weight = []; 
        let tmp = [];
        let chart = [];
        // let AIweight = [];

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

        let AIweight = JSON.parse(JSON.stringify(weight));

        if(this.state.start === true){
            this.stop();
        }

        this.setState({
            coins: coins,
            coinstatus: coins,
            pickup: pickup,
            algo: algo,
            weight: weight,
            addWeight: addWeight,
            minusWeight: minusWeight,
            opponent: opponent,
            chart: chart,
            gameBoard: [],
            AI: false,
            AIweight: AIweight,
            win: 0,
            lose: 0,
            finished: false,
            flag: false,
            start: false
        })

    };

    update(pos, gameBoard, coins, weight, pickup, val, algo){
        let tmpcount;
        var i;
        while(pos>0){ //no need to train the first step of the player; otherwise, change it to >=
            tmpcount = 0;
            for(i = 0; i<pickup; i++){
                if(weight[coins[pos] - 1][i]>0){
                    tmpcount += 1;
                }
            }
            if(val<0){ //AI lose the game
                if(tmpcount === 1) {
                    pos -= 2;
                    continue;
                }
                weight[coins[pos] - 1][gameBoard[pos] - 1] += val;
                if(weight[coins[pos] - 1][gameBoard[pos] - 1]<0) weight[coins[pos] - 1][gameBoard[pos] - 1] = 0;
            }
            if(val>0){ //AI wins the game
                weight[coins[pos] - 1][gameBoard[pos] - 1] += val;
            }
            if(algo===1){
                break;
            }
            pos -= 2;
        }
        return weight;
    }

    updateWeight(){
        let gameBoard = this.state.gameBoard;
        let weight = this.state.weight;
        let pickup = this.state.pickup;
        let AI = this.state.AI;
        let algo = this.state.algo;
        let val = AI ? this.state.addWeight : this.state.minusWeight; //if AI wins, val is addWeight; otherwise, val is minusWeight.
        let AIval = AI ? this.state.minusWeight : this.state.addWeight; //Opposite AI's val
        let opposite = this.state.opponent;
        let AIweight = this.state.AIweight;
        let coins = [];
        let pos = gameBoard.length - 1;
        coins[0] = this.state.coins;
        var i;
        for(i=1; i<=pos; i++)
            coins[i] = coins[i-1] - gameBoard[i-1];

        console.log(gameBoard);
        console.log(coins);

        if(AI) {//AI wins == the opposite take the last lollipop.
           weight = this.update(pos-1, gameBoard, coins, weight, pickup, val, algo);
             if(opposite) AIweight = this.update(pos, gameBoard, coins, AIweight, pickup, AIval, algo);
        } else {
           weight = this.update(pos, gameBoard, coins, weight, pickup, val, algo);
             if(opposite) AIweight = this.update(pos-1, gameBoard, coins, AIweight, pickup, AIval, algo);
        }
        this.setState({weight:weight, AIweight:AIweight});
    }

    step(weight, coins, pickup){
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
        console.log("This step: ", step);
        return step;
    }

    AIStep(){
        let coins = this.state.coinstatus;
        let weight = this.state.weight[coins - 1];
        let pickup = this.state.pickup;
        return this.step(weight, coins, pickup);
    }

    playerStep(){
        let pickup = this.state.pickup;
        let coins = this.state.coinstatus;
        let mxpickup = Math.min(pickup, coins);
        let tmprand = Math.floor(Math.random() * 10);
        if(this.state.opponent){ //similar AI player
            return this.step(this.state.AIweight[coins - 1], coins, pickup);
        }
        let res = (coins - 1) % (pickup + 1); // optimal solution
        if(res === 0) {
            res = 1 + Math.floor(Math.random() * mxpickup);
        }
        console.log('AI optimal pick: ',res);
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
        this.setState({start:start, flag:true});
    };

    handleChange = (event, value) => {
        this.setState({speed:value});
        if(this.state.start === true){
            this.stop();
            this.start();
        }
      };

    handleClick = (event, val) =>{
        // Click the Set Value button
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
        let gameStatus = this.state.start ? "Pause" : "Resume";
        if(this.state.flag === false){
            gameStatus = "Start";
        }
        let weight = this.state.weight;
        const opponent = this.state.opponent;

        let lollypopsNo = [];
        for(let i=9; i<=26; i++){
            lollypopsNo.push(<option value={i}>{i}</option>);
        }
        let pickUpNo = [];
        for(let i=2; i<=8; i++){
            pickUpNo.push(<option value={i}>{i}</option>);
        }
        return (
            <Container>
                <Container>
                <h3> Teach AI to play Nim </h3>
                    <h5>Notes:</h5>
                    <ul>
                        <li key="n1">Remember to press SETVALUE after configuration.</li>
                        <li key="n2">Press PAUSE to freeze simulation.</li>
                    </ul>
                <h5> Rules: </h5>
                <p>Fish-Flavored Lollipops is a variant of Nim, an ancient math puzzle.</p>
                <p>When the game starts, I will show you N lollipops, where the last one of them is fish-flavored. It tastes so disgusting that nobody wants to eat it.</p>
                <p>The lollipops will be placed in one line, and you and I will take turns to take lollipops from the row. You can't take more than X lollipops at a time, and you can't skip your turn. Whoever takes the last lollipop (the fish-flavored one) lose the game.</p>
                <h1 style={{height:"40px"}}> {status} </h1>
                </Container>
                <Container>
                <Row>
                    <Col md={4}>
                        <h5> Data: </h5>
                        <FormControl style={{minWidth: 180, marginBottom: "5px"}}>
                            <InputLabel htmlFor="lollipopsNo">Number of Lollipops (N)</InputLabel>
                            <Select
                            native
                            value={this.state.tmpcoins}
                            onChange={(e)=>{this.setState({tmpcoins:parseInt(e.target.value)});}}
                            inputProps={{
                                name: 'LollipopsNo:  ',
                                id: 'lollipopsNo',
                            }}
                            >
                                {lollypopsNo}
                            </Select>
                        </FormControl>

                        <FormControl style={{minWidth: 180, marginBottom: "5px"}}>
                            <InputLabel htmlFor="pickupSelect">Maximal Pickup (X)</InputLabel>
                            <Select
                            native
                            value={this.state.tmppickup}
                            onChange={(e)=>{this.setState({tmppickup:parseInt(e.target.value)});}}
                            inputProps={{
                                name: 'pickupSelect:  ',
                                id: 'pickupSelect',
                            }}
                            >
                                {pickUpNo}
                            </Select>
                        </FormControl>

                        <FormControl style={{minWidth: 180, marginBottom: "5px"}}>
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
                            <option value={1}>Donald Michie's Box Algorithm</option>
                            <option value={2}>Back Propagation Algorithm</option>
                            </Select>
                        </FormControl>

                        <FormControl style={{minWidth: 180, marginBottom: "5px"}}>
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

                        <FormControl style={{minWidth: 180, marginBottom: "5px"}}>
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

                        <FormControl style={{minWidth: 180, marginBottom: "5px"}}>
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

                        <FormControl style={{minWidth: 180, marginBottom: "5px"}}>
                            <InputLabel htmlFor="AddWeight">Opponent</InputLabel>
                            <Select
                                native
                                value={this.state.tmpopponentvalue}
                                onChange={(e)=>{this.setState({tmpopponentvalue:parseInt(e.target.value)});}}
                                inputProps={{
                                    name:'opponent',
                                    id: 'opponent'
                                }}
                            >
                                <option value={0}>Optimal Strategic Player</option>
                                <option value={1}>Similar AI Player</option>
                            </Select>
                        </FormControl>

                        <div>
                        <Button variant="contained" color="primary" onClick={(event) => this.handleClick(event,"val1")} style={{marginTop:"10px", marginBottom:"30px"}}> SetValue </Button>
                        </div>

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