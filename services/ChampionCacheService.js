var ChampionCacheRepository = require("../repositories/ChampionCacheRepository");

/**
 * The service for managing champion data
 */
function ChampionCacheService() {	
}

/**
 * Caches all the champions
 * @param : callback - the function to call once the operation is complete.
 */
ChampionCacheService.prototype.CacheChampions = function(callback) 
{
	ChampionCacheRepository.InvalidateCache(callback);
};

/**
 * Gets all champion data from the cache
 * @param : callback - the function to call once the operation is complete.
 */
ChampionCacheService.prototype.GetAll = function(callback) 
{
	ChampionCacheRepository.ReadAll(callback);
};

/**
 * Gets a champions data from the cache by id
 * @param : id - the champions unique id
 * @param : callback - the function to call once the operation is complete.
 */
ChampionCacheService.prototype.GetById = function(id, callback)
{
	ChampionCacheRepository.ReadById(id, callback);	
};

/**
 * Links the champion data with the mastery data of a summoner
 * @param : masteries - A summoners champion masteries to be linked with the champion data
 * @param : callback - the function to call once the operation is complete.
 */
ChampionCacheService.prototype.LinkMasteriesToChampions = function(masteries, callback)
{
	var self = this;
	ChampionCacheRepository.ReadAll(function(err, champions){
		var linkedChamps = [];
		for(var i = 0; i < masteries.length; i++){
			for(var j = 0; j < champions.length; j++){
				if(champions[j].id == masteries[i].championId){
					var object = {"Champion": champions[j], "Mastery": masteries[i]};
					linkedChamps.push(object);
					break;
				}
			}
		}
		
		callback(null, linkedChamps);
	});
};

module.exports = new ChampionCacheService;