var express = require('express');

//init Express
var app = express();

//init Express Router
var router = express.Router();
var port = process.env.PORT || 8080;

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
