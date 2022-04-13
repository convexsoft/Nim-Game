import React from "react";
import {Chart} from "react-google-charts";
import {Box, Grid} from "@material-ui/core";

class gameStatus extends React.Component {
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
        chartData[0] = ["x","Ai's Training Outcome"];
        chartData[1] = [0,0];
        fetch("http://104.199.174.234:3032/getAllResults",{
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

    options = {
        hAxis: {
            title: "Number of Game Played",
        },
        vAxis: {
            title: "Number of Game Won by AI",
        },
    }

    render() {
        return (
            <div className="game">
                <Box maxWidth="100" style={{margin:"40px"}}>
                    <div className="container">
                        <h1 align="center" style={{padding:"20px"}}> NemoBot Training Method </h1>
                        <div className="container-fluid">
                            <div className="row">
                                <div class="col-sm" align="center">
                                    <img src="/img/train3.png" style={{maxHeight: "300px"}} />
                                    <h3> Crowdsourcing </h3>
                                    <h3> Trained AI </h3>
                                </div>
                                <div class="col-sm" align="center">
                                    <img src="/img/train1.png" style={{maxHeight: "300px"}}/>
                                    <h3> One Player </h3>
                                    <h3> Trained AI </h3>
                                </div>
                                <div class="col-sm" align="center">
                                    <img src="/img/train2.png" style={{maxHeight: "300px"}}/>
                                    <h3> AI Trained AI  </h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </Box>
                <Box maxWidth="100%" style={{margin:"40px"}}>
                    <div className="container">
                        <div className="gameInfo" >
                            <h1 align="center"  style={{padding:"40px"}}> Crowdsourcing Trained AI </h1>
                            <h3> Real-Time Game Status</h3>
                            <p> The line graph below shows the real-time result of Nemobot game AI. This game AI was trained by all players who played the game after 2021.
                                You can also play this game and train the game AI through Nemobot on Facebook Messenger.</p>
                        </div>
                        {/*<div className="container">*/}
                        {/*    <div className="game-board">*/}
                        {/*        <p> AI wins: {this.state.winTimes} </p>*/}
                        {/*        <p> Player wins: {this.state.loseTimes} </p>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                        <div className="container">
                            <div className={"AI-online-chart"}>
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
                        <div className="container">
                            <div className="AI-demo1">
                                <h3> Previous Result</h3>
                                <p>The line graph below shows the previous game result from Nemobot. Ninety-eight students trained this game AI in a course.</p>
                                <Chart
                                    chartType="LineChart"
                                    loader={<div>Loading Chart</div>}
                                    data={data_previous}
                                    width="100%"
                                    height="400px"
                                    legendToggle
                                    options={this.options}
                                />
                            </div>
                        </div>
                    </div>
                </Box>
                <Box maxWidth="100%" style={{margin:"40px"}}>
                    <div className="container">
                        <h1 align="center" style={{padding:"40px"}}>One Player Trained AI</h1>
                        <p>The line graph below shows the game result where the game AI trained by a single player. A demo webpage can be found <a href="/play"> here </a>. </p>
                        <Chart
                            chartType="LineChart"
                            loader={<div>Loading Chart</div>}
                            data={data_h1}
                            width="100%"
                            height="400px"
                            legendToggle
                            options={this.options}
                        />
                    </div>
                </Box>
                <Box maxWidth="100%" style={{margin:"40px"}}>
                    <div className="container">
                        <h1 align="center" style={{padding:"40px"}}> AI Trained AI </h1>
                        <p>The line graph below shows the game result where the game AI trained by other game AIs. A demo webpage can be found <a href="/AI"> here </a>.</p>
                        <Chart
                            chartType="LineChart"
                            loader={<div>Loading Chart</div>}
                            data={data_A1}
                            width="100%"
                            height="400px"
                            legendToggle
                            options={this.options}
                        />
                    </div>
                </Box>
            </div>
        );
    }
}

export default gameStatus;

// export const data1 = [
//     ["x", "Sales", "Expenses"],
//     ["2004", 1000, 400],
//     ["2005", 1170, 460],
//     ["2006", 660, 1120],
//     ["2007", 1030, 540]]

// previous dataset
export const data_previous = [["x", "Ai's Training Outcome"],[0,0],[1,-1],[2,-2],[3,-1],[4,-2],[5,-3],[6,-4],[7,-5],[8,-4],[9,-5],[10,-4],[11,-3],[12,-4],[13,-5],[14,-6],[15,-5],[16,-4],[17,-5],[18,-6],[19,-5],[20,-4],[21,-3],[22,-4],[23,-5],[24,-4],[25,-5],[26,-6],[27,-7],[28,-8],[29,-7],[30,-8],[31,-9],[32,-8],[33,-7],[34,-8],[35,-7],[36,-6],[37,-5],[38,-4],[39,-3],[40,-2],[41,-1],[42,0],[43,1],[44,2],[45,3],[46,4],[47,5],[48,6],[49,7],[50,8],[51,9],[52,10],[53,11],[54,12],[55,13],[56,14],[57,15],[58,16],[59,17],[60,18],[61,17],[62,18],[63,19],[64,20],[65,19],[66,20],[67,19],[68,20],[69,21],[70,22],[71,23],[72,24],[73,25],[74,26],[75,27],[76,28],[77,29],[78,30],[79,31],[80,32],[81,33],[82,34],[83,35],[84,36],[85,37],[86,38],[87,39],[88,40],[89,41],[90,42],[91,43],[92,44],[93,45],[94,46],[95,47],[96,48],[97,49],[98,50]]

//with one human
export const data_h1 = [["x","Ai's Training Outcome"],[0,0],[1,-1],[2,-2],[3,-3],[4,-2],[5,-3],[6,-4],[7,-5],[8,-6],[9,-7],[10,-8],[11,-9],[12,-8],[13,-9],[14,-10],[15,-9],[16,-8],[17,-7],[18,-8],[19,-7],[20,-6],[21,-5],[22,-4],[23,-3],[24,-2],[25,-1],[26,0],[27,1],[28,2],[29,3],[30,4],[31,5],[32,4],[33,5],[34,4],[35,3],[36,4],[37,5],[38,6],[39,7],[40,8],[41,9],[42,10],[43,11],[44,12],[45,13],[46,14],[47,15],[48,16],[49,17],[50,18],[51,19]]
//with AI
export const data_A1 = [["x","Ai's Training Outcome"],[0,0],[1,1],[2,0],[3,1],[4,2],[5,1],[6,0],[7,1],[8,0],[9,-1],[10,-2],[11,-3],[12,-2],[13,-1],[14,0],[15,-1],[16,-2],[17,-1],[18,0],[19,-1],[20,-2],[21,-1],[22,0],[23,1],[24,2],[25,1],[26,0],[27,1],[28,2],[29,3],[30,4],[31,5],[32,6],[33,7],[34,8],[35,9],[36,10],[37,9],[38,10],[39,9],[40,8],[41,9],[42,8],[43,7],[44,8],[45,9],[46,10],[47,9],[48,8],[49,9],[50,10],[51,11],[52,12],[53,13],[54,14],[55,15],[56,16],[57,17],[58,18],[59,19],[60,20],[61,21],[62,22],[63,23],[64,24],[65,23],[66,24],[67,25],[68,26],[69,27],[70,28],[71,29],[72,30],[73,31],[74,32],[75,33],[76,34],[77,35],[78,36],[79,37],[80,38],[81,39],[82,40],[83,41],[84,42],[85,43],[86,44],[87,45],[88,46],[89,47],[90,48],[91,49],[92,50],[93,51],[94,52],[95,53],[96,54],[97,55],[98,56],[99,57],[100,58],[101,59],[102,60]]


