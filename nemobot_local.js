
const axios = require('axios')
const input_ary = 'Hello World';

axios ({
    method: 'get',
    baseURL: 'http://0.0.0.0:3032', //our server url
    url: '/passResults',
    'Content-Type': 'application/json',
    params: {
        data: '{"gameWeight":[[1,0,0],[1,1,0],[1,1,1],[1,1,1],[1,1,1],[1,1,1],[1,1,1],[1,1,1],[1,1,1],[1,1,1],[1,1,1],[1,1,1]],"coins":0,"gameBoard":[2,3,2,1,2,1,1],"player":true,"first":true,"win":false}'
    }
})
    .then((result) => {
        // console.log(result.status);
        console.log(result.data);
    })
    .catch((err) => { console.error(err) })