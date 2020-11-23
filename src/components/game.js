import React from "react";

class game extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            win: 0,
            lose: 0,
            weight: [],
            coins: 13,
            player: true
        }
    }
    render() {
        let status = "";
        let coins = this.state.coins;
        for(let i=0;i<coins;i++)
            status += ("🍭");
        const desc = this.state.player ? 'Now is your turn, please make your choice: ' : 'The AI\'s choice is: ';

        return (
            <div className="game">
               <h1> You can play Nim game here </h1>
                <h1> {status} </h1>
                <h3> {desc} </h3>
                <button class="btn btn-primary"> Next </button>
            </div>
        );
    }
}

export default game;