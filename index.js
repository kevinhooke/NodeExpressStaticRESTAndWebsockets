const SocketServer = require('ws').Server;
var express = require('express');
var connectedUsers = [];

//init Express REST apis
var app = express();

//init Express Router
var router = express.Router();
var port = process.env.PORT || 80;

//default/test route
router.get('/status', function(req, res) {
    res.json({ status: 'App is running!' });
});

//connect path to router
app.use("/", router);
app.use(express.static('static'))
var server = app.listen(port, function () {
    console.log('node.js static, REST server and websockets listening on port: ' + port)
})

//if serving static app from another server/port, send CORS headers in response
//{ headers: {
//"Access-Control-Allow-Origin": "*",
//    "Access-Control-Allow-Headers": "http://localhost:3000",
//    "Access-Control-Allow-Methods": "PUT, GET, POST, DELETE, OPTIONS"
//} }
const wss = new SocketServer({ server });

//init Websocket ws and handle incoming connect requests
wss.on('connection', function connection(ws) {
    console.log("connection ...");

    //on connect message
    ws.on('message', function incoming(message) {
        console.log('received: %s', message);
        connectedUsers.push(message);
    });

    ws.send('something');
});