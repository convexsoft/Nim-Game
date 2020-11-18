const axios = require('axios');
const BASE_URL = '';

function getStatus(){
    axios ({
        method: 'get',
        baseURL: 'http://0.0.0.0:3000', //our server url
        url: '/getStatus',
        'Content-Type': 'application/json',
        params: {
            gamerType: 1,
            algoType: 1
        }
    })
    .then((result) => {
        // console.log(result.status);
        console.log(result.data);
    })
    .catch((err) => { console.error(err) });
}

function randomPlayer(){
    getStatus();
}

randomPlayer();