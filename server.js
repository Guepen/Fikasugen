// modules =================================================
var express        = require('express');
var app            = express();
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');

// configuration ===========================================


var port = 8888; // set our port
//var debugPort =process.debugPort.PORT || 8000;


// get all data/stuff of the body (POST) parameters
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded

app.use(express.static(__dirname + '/app'));
app.use(express.static(__dirname + '/app/components/navbar'));
app.use(express.static(__dirname + '/app/components/coffeehouses'));
app.use(express.static(__dirname + '/app/components/session'));
app.use(express.static(__dirname + '/app/components/authentication'));


app.get('*', function(req, res, err) {
    res.sendFile(__dirname + '/app/index.html');

});
// start apå
app.listen(port);
console.log(port);
exports = module.exports = app;