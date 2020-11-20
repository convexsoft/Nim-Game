'use strict';
const axios = require('axios');

const lollipopStr = (num) => {
	return (new Array(num)).fill('🍭').join('');
};
const ranInt = (min, max) => {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min;
};

const start = (say, sendButton, userID) => {
	let gameWeight = {};
	let payload = {};
	axios ({
        method: 'get',
        baseURL: 'http://localhost:3032',
        url: '/getStatus',
        params: {
            gamerType: 1,
            algoType: 1
        }
    })
    .then((result) => {
		gameWeight = result.data;
		payload["gameWeight"] = gameWeight["weight"];
		payload["coins"] = 12;
		payload["gameBoard"] = [];
		payload["player"] = false;
		payload["playerID"] = userID;
		let payload_yes = JSON.parse(JSON.stringify(payload)); // Player Goes First
		payload_yes["first"] = false;
		payload_yes["player"] = true;

		let payload_no = JSON.parse(JSON.stringify(payload));
		payload_no["first"] = true;

		const str = lollipopStr(12);	
		say(str).then(() => {
			sendButton('would you like to pick first?', [{title: 'Yes', payload: JSON.stringify(payload_yes)}, {title: 'No', payload: JSON.stringify(payload_no)}]);
		});
    })
    .catch((err) => { say("Sorry, the server is down." )});
};

const state = (payload, say, sendButton) => {
	// say(payload);

	payload = JSON.parse(payload);

	const currentNum = payload["coins"];
	const playerTurn = payload["player"];

	if (playerTurn === true && currentNum > 0) {
		const str = lollipopStr(currentNum);
		const btnNums = [1, 2, 3].slice(0, currentNum);

		payload["player"] = false;

		let payloads = [];
		for(var i=0;i<btnNums.length;i++){
			payloads[i] = JSON.parse(JSON.stringify(payload));
			payloads[i]["coins"] = payload["coins"] - i - 1;
			if("gameBoard" in payloads[i]){
				payloads[i]["gameBoard"].push(i+1);
			} else {
				payloads[i]["gameBoard"] = [(i+1)];
			}
		}

		const buttons = btnNums.map(num => ({title: String(num), payload: JSON.stringify(payloads[num-1])}));
		say(str).then(() => {
			sendButton('It\'s your turn now! How many lollipops would you like to take?', buttons);
		});
	} 
	
	if(playerTurn === false && currentNum > 0) {
		payload["player"] = true;
			
		let coins = payload["coins"];
		let AI = 0;
		let weightRank = [payload["gameWeight"][coins-1][0],payload["gameWeight"][coins-1][1],payload["gameWeight"][coins-1][2]];
		let sum = Math.random() * (weightRank[0] + weightRank[1] + weightRank[2]);
		for(var i=0;i<3;i++){
			sum -= weightRank[i];
			if(sum <= 0){
				AI = i+1;
				break;
			}
		}
		
		if("gameBoard" in payload){
			payload["gameBoard"].push(AI);
		} else {
			payload["gameBoard"] = [AI];
		}
		payload["coins"] = payload["coins"] - AI;

		const pick = AI;

		const str = lollipopStr(currentNum);
		say(str).then(() => {				
			say(`It\'s my turn now, and I will pick ${pick} lollipops` ).then(() => {
				state(JSON.stringify(payload), say, sendButton);
			});
		});	
	}
	
	if(currentNum === 0){
		if(playerTurn === true){
			payload["win"] = false; // AI lose the game
		} else {
			payload["win"] = true;
		}
		axios ({
			method: 'get',
			baseURL: 'http://localhost:3032',
			url: '/passResults',
			params: {
				data: JSON.stringify(payload)
			}
		})
		.then((result) => {
			if(playerTurn === true){
				say("Congratulations! You have forced me to take the last lollipop! Thanks for training our AI. See all results at : http://algebragamification.com:3032/ ").then(() => {sendButton('Play again?', [{title: 'Yes!', payload: 'restart'},'No']);});
			} else {
				say("You\'ve taken the last lollipop and lose! Thanks for training our AI. See all results at : http://algebragamification.com:3032/ ").then(() => {sendButton('Play again?', [{title: 'Yes!', payload: 'restart'},'No']);});
			}
		})
		.catch((err) => { say("Sorry, the server is down." )});
	}
};

module.exports = {
	filename: 'lollipops',
	title: 'Fish-Flavored Lollipops',
	introduction: [
		'Fish-Flavored Lollipops is a variant of Nim, an ancient math puzzle.',
		'When the game starts, I will show you 12 lollipops, where the last one of them is fish-flavored. It tastes so disgusting that nobody wants to eat it.',
		'The lollipops will be placed in one line, and you and I will take turns to take lollipops from the row. You can\'t take more than 3 lollipops at a time, and you can\'t skip your turn. Whoever takes the last lollipop (the fish-flavored one) lose the game.'
	],
	start: start,
	state: state
};