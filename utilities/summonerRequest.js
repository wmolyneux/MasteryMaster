var request = require("request");
var HttpClient = require("./HttpClient");

/**
 * Handles requests for summoner data
 */
function SummonerRequest(){
	this.baseUrl = "https://{region}.api.pvp.net/api/lol/{region}/v1.4/summoner/";
    this.HttpClient = new HttpClient();
}

/**
 * Requests summoner information by name
 * @param : name - the summoners name
 * @param : region - the summoners region
 * @param : callback - a function to execute once the operation has complate
 */
SummonerRequest.prototype.GetSummonerByName = function(name, region, callback){
	var requestUri = this.ModifyBaseURL(region);
    requestUri += "by-name/" + encodeURIComponent(name);
    
    this.HttpClient.GetRequest(requestUri, callback);
}

/**
 * Requests summoners statistics by id
 * @param : summonerId - the summoners id
 * @param : region - the summoners region
 * @param : callback - a function to execute once the operation has complate
 */
SummonerRequest.prototype.GetSummonerStats = function(summonerId, region, callback){
    var requestUri = "https://" + region +".api.pvp.net/api/lol/" + region + "/v1.3/stats/by-summoner/" + summonerId + "/summary";
    this.HttpClient.GetRequest(requestUri, callback);
}

/**
 * modifies the base url
 * @param : region - the summoners region
 */
SummonerRequest.prototype.ModifyBaseURL = function(region){
    var newBaseUrl = this.baseUrl.replace(/{region}/g, region);
    return newBaseUrl;
}

module.exports = new SummonerRequest;