var StaticDataRequest = require("../utilities/StaticDataRequest");

/**
 * A repository to store the list of cached champions
 */
function ChampionCacheRepository() {
	this.champions;
	var self = this;
	this.InvalidateCache(function(){});
}

/**
 * Invalidates the cache causing it to refresh with a new list of champions
 * @param : callback -  the function to call once the operation is complete.
 */
ChampionCacheRepository.prototype.InvalidateCache = function(callback) 
{
	var _self = this;
	StaticDataRequest.GetChampions("euw", function(err, res){
		if(err == null)
		{
			var champsMap = res.data;
			var output = Object.keys(champsMap).map(function(key) {
				return champsMap[key];
			});
			
			_self.champions = output;
			callback(null, true);
		}
		else{
			callback(err, false);
		}
	});
};

/**
 * Reads all champion data from the cache
 * @param : callback - the function to call once the operation is complete.
 */
ChampionCacheRepository.prototype.ReadAll = function(callback) 
{
	callback(null, this.champions);
};

/**
 * Reads a champion by id
 * @param : id - the unique id of the champion.
 * @param : callback - the function to call once the operation is complete.
 */
ChampionCacheRepository.prototype.ReadById = function(id, callback){
	for(var i =0; i < this.champions.length; i++)
	{
		if(this.champions[i].id == id)
		{
			callback(null, this.champions[i]);
			return;
		}
	}	
	
	callback("Could not find champion with the id: " + id, null);
};

module.exports = new ChampionCacheRepository;