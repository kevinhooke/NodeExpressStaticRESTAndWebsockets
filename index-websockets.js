const SocketServer = require('ws').Server;
var express = require('express');
var path = require('path');
var connectedUsers = [];

//init Express
var app = express();

//init Express Router
var router = express.Router();
var port = process.env.PORT || 80;

//return static page with websocket client
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/static/index-with-websockets.html'));
});

var server = app.listen(port, function () {
    console.log('node.js static server listening on port: ' + port + ", with websockets listener")
})

const wss = new SocketServer({ server });

//init Websocket ws and handle incoming connect requests
wss.on('connection', function connection(ws) {
    console.log("connection ...");

    //on connect message
    ws.on('message', function incoming(message) {
        console.log('received: %s', message);
        connectedUsers.push(message);
    });

    ws.send('message from server at: ' + new Date());
});