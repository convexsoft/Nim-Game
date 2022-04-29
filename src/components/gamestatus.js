import React from "react";
import {Chart} from "react-google-charts";
import {Box} from "@material-ui/core";

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
            title: "Number of Games Played",
        },
        vAxis: {
            title: "Number of Games Won by AI",
        },
    }

    render() {
        return (
            <div className="game">
                <Box maxWidth="100" style={{margin:"40px"}}>
                    <div className="container">
                        <h1 align="center" style={{padding:"20px"}}> AI Game Learning </h1>
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-sm" align="center">
                                    <img src="/img/train3.png" style={{maxHeight: "300px"}} />
                                    <h3> Learning by </h3>
                                    <h3> Crowdsourcing </h3>
                                </div>
                                <div className="col-sm" align="center">
                                    <img src="/img/train1.png" style={{maxHeight: "300px"}}/>
                                    <h3> One Human Player </h3>
                                    <h3> Training AI </h3>
                                </div>
                                <div className="col-sm" align="center">
                                    <img src="/img/train2.png" style={{maxHeight: "300px"}}/>
                                    <h3> AI Training AI  </h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </Box>
                <Box maxWidth="100%" style={{margin:"40px"}}>
                    <div className="container">
                        <div className="gameInfo" >
                            <h1 align="center"  style={{padding:"40px"}}> Learning by Crowdsourcing </h1>
                        </div>
                            {/*<h3> Real-Time Game Status</h3>*/}
                            {/*<p> The line graph below shows the real-time result of Nemobot game AI. This game AI was trained by all players who played the game after 2021.*/}
                            {/*    You can also play this game and train the game AI through Nemobot on Facebook Messenger.</p>*/}

                        {/*<div className="container">*/}
                        {/*    <div className="game-board">*/}
                        {/*        <p> AI wins: {this.state.winTimes} </p>*/}
                        {/*        <p> Player wins: {this.state.loseTimes} </p>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                        {/*<div className="container">*/}
                        {/*    <div className={"AI-online-chart"}>*/}
                        {/*        <Chart*/}
                        {/*            chartType="LineChart"*/}
                        {/*            loader={<div>Loading Chart</div>}*/}
                        {/*            data={this.state.chart}*/}
                        {/*            width="100%"*/}
                        {/*            height="400px"*/}
                        {/*            legendToggle*/}
                        {/*            options={this.options}*/}
                        {/*        />*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                        <div className="container">
                            <div className="AI-demo1">
                                {/*<h3> Previous Result</h3>*/}
                                <p>The line graph below shows the previous game result from Nemobot. Crowdsourced from ninety-eight students during the period 2020.10 - 2021.12.</p>
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
                        <p>The line graphs below show the game results where the game AI trained by one human player who used the optimal play strategy. </p>
                        <Chart
                            chartType="LineChart"
                            loader={<div>Loading Chart</div>}
                            data={data_h1}
                            width="100%"
                            height="400px"
                            legendToggle
                            options={this.options}
                        />

                        <Chart
                            chartType="LineChart"
                            loader={<div>Loading Chart</div>}
                            data={data_h2}
                            width="100%"
                            height="400px"
                            legendToggle
                            options={this.options}
                        />

                        <Chart
                            chartType="LineChart"
                            loader={<div>Loading Chart</div>}
                            data={data_h3}
                            width="100%"
                            height="400px"
                            legendToggle
                            options={this.options}
                        />

                        <Chart
                            chartType="LineChart"
                            loader={<div>Loading Chart</div>}
                            data={data_h4}
                            width="100%"
                            height="400px"
                            legendToggle
                            options={this.options}
                        />

                        <Chart
                            chartType="LineChart"
                            loader={<div>Loading Chart</div>}
                            data={data_h5}
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
                        <p>The line graph below shows the game result where the game AI trained by other game AIs. </p>
                        <Chart
                            chartType="LineChart"
                            loader={<div>Loading Chart</div>}
                            data={data_A1}
                            width="100%"
                            height="400px"
                            legendToggle
                            options={this.options}
                        />
                        <Chart
                            chartType="LineChart"
                            loader={<div>Loading Chart</div>}
                            data={data_A2}
                            width="100%"
                            height="400px"
                            legendToggle
                            options={this.options}
                        />
                        <Chart
                            chartType="LineChart"
                            loader={<div>Loading Chart</div>}
                            data={data_A3}
                            width="100%"
                            height="400px"
                            legendToggle
                            options={this.options}
                        />
                        <Chart
                            chartType="LineChart"
                            loader={<div>Loading Chart</div>}
                            data={data_A4}
                            width="100%"
                            height="400px"
                            legendToggle
                            options={this.options}
                        />
                        <Chart
                            chartType="LineChart"
                            loader={<div>Loading Chart</div>}
                            data={data_A5}
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
export const data_h1 = [["x","Ai's Training Outcome"],[0,0],[1,-1],[2,-2],[3,-3],[4,-4],[5,-5],[6,-6],[7,-7],[8,-8],[9,-9],[10,-10],[11,-9],[12,-10],[13,-11],[14,-12],[15,-11],[16,-12],[17,-13],[18,-12],[19,-11],[20,-10],[21,-11],[22,-12],[23,-13],[24,-12],[25,-11],[26,-12],[27,-11],[28,-12],[29,-13],[30,-12],[31,-11],[32,-10],[33,-9],[34,-8],[35,-7],[36,-6],[37,-5],[38,-4],[39,-3],[40,-2],[41,-1],[42,0],[43,1],[44,2],[45,3],[46,4],[47,5],[48,6],[49,7],[50,8],[51,9],[52,10]]
export const data_h2 = [["x","Ai's Training Outcome"],[0,0],[1,-1],[2,-2],[3,-3],[4,-4],[5,-5],[6,-6],[7,-7],[8,-8],[9,-9],[10,-10],[11,-11],[12,-10],[13,-9],[14,-10],[15,-11],[16,-10],[17,-11],[18,-12],[19,-13],[20,-14],[21,-15],[22,-16],[23,-15],[24,-14],[25,-13],[26,-12],[27,-11],[28,-10],[29,-11],[30,-10],[31,-9],[32,-10],[33,-9],[34,-8],[35,-7],[36,-6],[37,-5],[38,-4],[39,-3],[40,-2],[41,-1],[42,0],[43,1],[44,2],[45,3],[46,4],[47,5],[48,6],[49,7],[50,8],[51,9],[52,10]]
export const data_h3 = [["x","Ai's Training Outcome"],[0,0],[1,-1],[2,-2],[3,-3],[4,-4],[5,-5],[6,-6],[7,-7],[8,-8],[9,-9],[10,-10],[11,-9],[12,-10],[13,-11],[14,-12],[15,-13],[16,-14],[17,-15],[18,-16],[19,-15],[20,-14],[21,-15],[22,-16],[23,-15],[24,-16],[25,-15],[26,-14],[27,-13],[28,-14],[29,-13],[30,-12],[31,-11],[32,-10],[33,-9],[34,-8],[35,-7],[36,-6],[37,-5],[38,-4],[39,-3],[40,-2],[41,-1],[42,0],[43,1],[44,2],[45,3],[46,4],[47,5],[48,6],[49,7],[50,8],[51,9],[52,10]]
export const data_h4 = [["x","Ai's Training Outcome"],[0,0],[1,-1],[2,-2],[3,-3],[4,-4],[5,-5],[6,-6],[7,-7],[8,-8],[9,-9],[10,-10],[11,-11],[12,-12],[13,-13],[14,-14],[15,-15],[16,-16],[17,-15],[18,-16],[19,-17],[20,-18],[21,-17],[22,-16],[23,-15],[24,-14],[25,-13],[26,-12],[27,-11],[28,-10],[29,-9],[30,-10],[31,-9],[32,-8],[33,-7],[34,-6],[35,-7],[36,-6],[37,-5],[38,-4],[39,-3],[40,-2],[41,-1],[42,0],[43,1],[44,2],[45,3],[46,4],[47,5],[48,6],[49,7],[50,8],[51,9],[52,10]]
export const data_h5 = [["x","Ai's Training Outcome"],[0,0],[1,-1],[2,-2],[3,-3],[4,-4],[5,-5],[6,-6],[7,-7],[8,-8],[9,-9],[10,-10],[11,-11],[12,-12],[13,-13],[14,-14],[15,-15],[16,-14],[17,-15],[18,-16],[19,-17],[20,-16],[21,-15],[22,-14],[23,-15],[24,-16],[25,-15],[26,-14],[27,-13],[28,-14],[29,-13],[30,-12],[31,-11],[32,-10],[33,-9],[34,-8],[35,-7],[36,-6],[37,-5],[38,-4],[39,-3],[40,-2],[41,-1],[42,0],[43,1],[44,2],[45,3],[46,4],[47,5],[48,6],[49,7],[50,8],[51,9],[52,10]]

//with AI
export const data_A1 = [["x","Ai's Training Outcome"],[0,0],[1,1],[2,0],[3,1],[4,0],[5,-1],[6,0],[7,-1],[8,-2],[9,-1],[10,0],[11,-1],[12,0],[13,1],[14,0],[15,1],[16,0],[17,1],[18,0],[19,-1],[20,0],[21,1],[22,0],[23,1],[24,2],[25,3],[26,2],[27,1],[28,2],[29,3],[30,2],[31,3],[32,4],[33,5],[34,6],[35,5],[36,6],[37,7],[38,8],[39,7],[40,8],[41,7],[42,8],[43,9],[44,8],[45,7],[46,8],[47,9],[48,10],[49,11],[50,12],[51,13],[52,14],[53,15],[54,16],[55,17],[56,18],[57,19],[58,20],[59,21],[60,22]]
export const data_A2 = [["x","Ai's Training Outcome"],[0,0],[1,1],[2,2],[3,1],[4,0],[5,1],[6,0],[7,-1],[8,0],[9,1],[10,2],[11,3],[12,2],[13,1],[14,2],[15,3],[16,2],[17,1],[18,0],[19,-1],[20,-2],[21,-1],[22,-2],[23,-1],[24,-2],[25,-1],[26,0],[27,1],[28,0],[29,-1],[30,-2],[31,-3],[32,-2],[33,-3],[34,-2],[35,-1],[36,-2],[37,-1],[38,0],[39,1],[40,2],[41,3],[42,2],[43,3],[44,4],[45,5],[46,6],[47,7],[48,8],[49,9],[50,10],[51,11],[52,12],[53,13],[54,14],[55,15],[56,16],[57,17],[58,18],[59,19],[60,20]]
export const data_A3 = [["x","Ai's Training Outcome"],[0,0],[1,1],[2,2],[3,1],[4,2],[5,1],[6,2],[7,3],[8,2],[9,1],[10,0],[11,1],[12,2],[13,3],[14,2],[15,1],[16,0],[17,-1],[18,0],[19,-1],[20,-2],[21,-1],[22,-2],[23,-3],[24,-2],[25,-1],[26,-2],[27,-1],[28,0],[29,-1],[30,-2],[31,-3],[32,-2],[33,-1],[34,0],[35,-1],[36,0],[37,1],[38,2],[39,1],[40,2],[41,3],[42,4],[43,5],[44,6],[45,5],[46,6],[47,7],[48,6],[49,7],[50,8],[51,9],[52,10],[53,11],[54,12],[55,13],[56,14],[57,15],[58,16],[59,17],[60,18]]
export const data_A4 = [["x","Ai's Training Outcome"],[0,0],[1,-1],[2,-2],[3,-1],[4,-2],[5,-1],[6,-2],[7,-1],[8,-2],[9,-1],[10,0],[11,1],[12,2],[13,1],[14,0],[15,-1],[16,0],[17,-1],[18,-2],[19,-3],[20,-2],[21,-3],[22,-2],[23,-1],[24,-2],[25,-3],[26,-4],[27,-3],[28,-4],[29,-3],[30,-2],[31,-3],[32,-2],[33,-3],[34,-2],[35,-1],[36,0],[37,1],[38,2],[39,3],[40,4],[41,5],[42,6],[43,7],[44,8],[45,9],[46,10],[47,11],[48,12],[49,13],[50,12],[51,13],[52,14],[53,15],[54,16],[55,17],[56,18],[57,19],[58,20],[59,21],[60,22]]
export const data_A5 = [["x","Ai's Training Outcome"],[0,0],[1,-1],[2,0],[3,-1],[4,-2],[5,-1],[6,-2],[7,-3],[8,-4],[9,-5],[10,-4],[11,-3],[12,-2],[13,-1],[14,-2],[15,-3],[16,-4],[17,-3],[18,-2],[19,-1],[20,0],[21,1],[22,0],[23,1],[24,0],[25,1],[26,0],[27,1],[28,2],[29,3],[30,2],[31,1],[32,2],[33,1],[34,2],[35,3],[36,4],[37,5],[38,6],[39,7],[40,8],[41,9],[42,10],[43,9],[44,8],[45,7],[46,8],[47,9],[48,10],[49,11],[50,12],[51,13],[52,14],[53,15],[54,14],[55,15],[56,16],[57,17],[58,18],[59,19],[60,20]]