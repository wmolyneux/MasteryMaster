var express = require("express");
var bodyParser = require("body-parser");
var summonerController = require("./controllers/summonerController");
var championMasteryController = require("./controllers/ChampionMasteryController");

var app = express();
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
  next();
});

app.use(bodyParser.json());

app.use("/summoner", summonerController);
app.use("/championmastery", championMasteryController);
app.use(express.static("wwwroot"));

app.listen(8080, function() {
	console.log("Server is running....");
});