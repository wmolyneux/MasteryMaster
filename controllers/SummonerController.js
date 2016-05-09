var express = require("express");
var SummonerService = require("../services/SummonerService");

var router = express.Router();

/**
 * Gets the summoners information from the provided name and region
 * @param : summonerName - The summoners name
 * @param : region - the Region of the summoner
 */
router.get('/:summonerName/region/:region', function(req, res) {
	var region = req.params.region;
	var summonerName = req.params.summonerName;
	
	SummonerService.LoadSummoner(summonerName, region, function(err, result){
		if(err == null){
			res.status(200).send(result);
		}
		else{
			res.status(404).end();
		}
	});	
});

/**
 * Gets the summoners season statistics from the summoner id and region
 * @param : summonerId - The summoners unique id number
 * @param : region - the Region of the summoner
 */
router.get('/summonerId/:summonerId/region/:region/stats', function(req, res) {
	var region = req.params.region;
	var summonerId = req.params.summonerId;
	
	SummonerService.LoadSummonerStats(summonerId, region, function(err, result){
		if(err == null){
			res.status(200).send(result);
		}
		else{
			res.status(404).end();
		}
	});	
});

module.exports = router;