var express = require("express");
var ChampionMasteryService = require("../services/ChampionMasteryService");

var router = express.Router();

/**
 * Gets a summoners champion mastery information using a summoner id and a region
 * @param : summonerId - The summoners unique id number
 * @param : region - the Region of the summoner
 */
router.get('/summonerId/:summonerId/region/:region', function(req, res) {
	var region = req.params.region;
	var summonerId = req.params.summonerId;
	ChampionMasteryService.Get(summonerId, region, function(err, result){
		if(err == null){
			res.status(200).send(result);
		}
		else{
			res.status(404).end();
		}
	});	
});

/**
 * Gets the summoners total champion mastery score.
 * @param : summonerId - The summoners unique id number
 * @param : region - the Region of the summoner
 */
router.get('/summonerId/:summonerId/region/:region/total', function(req, res) {
	var region = req.params.region;
	var summonerId = req.params.summonerId;
	
	ChampionMasteryService.GetTotalScore(summonerId, region, function(err, result){
		if(err == null){
			res.status(200).send(result.toString());
		}
		else{
			res.status(404).end();
		}
	});	
});

module.exports = router;