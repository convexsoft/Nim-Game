import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Chart } from "react-google-charts";

class Game extends React.Component {
    // constructor(props) {
    //     super(props);
    //     this.winTimes = 0;
    //     this.loseTimes = 0;
    // }
    state = {
    }
    componentDidMount() {
        let win = 0, lose = 0, tmp = 0;
        let chartData = [];
        chartData[0] = ['x','winning times'];
        chartData[1] = [0,0];
<<<<<<< Updated upstream
        fetch("http://localhost:3032/getAllResults",{
=======
        fetch("http://104.199.174.234:3032/getAllResults",{
>>>>>>> Stashed changes
            method: 'POST'
        })
            .then(res => res.text())
            .then(text => {
                text = JSON.parse(text);
                for(var i=0;i<text.length;i++){
                    if(text[i]["status"] === true) win += 1;
                    else lose += 1;
                    tmp = text[i]["status"] === true ? 1 : -1;
                    chartData[i+2] = [i+1, chartData[i+1][1] + tmp];
                }
                console.log(win, lose, chartData);
                this.setState({winTimes: win, loseTimes: lose, chart: chartData})
            });

    }
    render() {
        return (
            <div className="game">
                <div className="container">
                    <div className="gameInfo">
                        <p> Rules: </p>
                    </div>
                </div>
                <div className="container">
                    <div className="game-board">
                        <p> AI wins: {this.state.winTimes} </p>
                        <p> Player wins: {this.state.loseTimes} </p>
                    </div>
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
                        />
                    </div>
                </div>
            </div>
        );
    }
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
      </header>
        <div className="container">
            <Game />
        </div>
    </div>
  );
}

export default App;
