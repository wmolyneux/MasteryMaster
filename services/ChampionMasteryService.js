var ChampionMasteryRequest = require("../utilities/ChampionMasteryRequest");
var ChampCache = require("./ChampionCacheService"); 

/**
 * A service for managing champion masteries
 */
function ChampionMasteryService() {	
}

/**
 * Gets champion masteries for a summoner
 * @param : summonerId - The summoners unique id
 * @param : region - The region of the summoner
 * @param : callback - the function to call once the operation is complete.
 */
ChampionMasteryService.prototype.Get = function(summonerId, region, callback) 
{
	var self = this;
	
	ChampionMasteryRequest.GetChampionMastery(summonerId, region, function(err, champMasteries){
		if(err == null){
			ChampCache.LinkMasteriesToChampions(champMasteries, callback);
		}
		else{
			callback(err, null);
		}
	});
};

/**
 * Gets the total mastery score for a summoner
 * @param : summonerId - the summoners unique id
 * @param : region - the summoners region
 * @param : callback - the function to call once the operation is complete.
 */
ChampionMasteryService.prototype.GetTotalScore = function(summonerId, region, callback){
	ChampionMasteryRequest.GetTotalChampionMasteryScore(summonerId, region, callback);
}

module.exports = new ChampionMasteryService;