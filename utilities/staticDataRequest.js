var request = require("request");
var HttpClient = require("./HttpClient");

/**
 * Handles requests to the static data apis
 */
function StaticDataRequest(){
	this.baseUrl = "https://global.api.pvp.net/api/lol/static-data/{region}/v1.2/";
    this.HttpClient = new HttpClient();
}

/**
 * modifies the base uri
 * @param : region - the summoners region
 */
StaticDataRequest.prototype.ModifyBaseURL = function(region){
    var newBaseUrl = this.baseUrl.replace("{region}", region);
    return newBaseUrl;
}

/**
 * Requests the champion data
 * @param : region - the summoners region
 * @param : callback - a function to execute once the operation has complate
 */
StaticDataRequest.prototype.GetChampions = function(region, callback){
	var requestUri = this.ModifyBaseURL(region);
    requestUri += "champion";
    requestUri += "?champData=tags";
    
    this.HttpClient.GetRequest(requestUri, callback);
}

/**
 * Requests a champions data by id
 * @param : championId - the champion id
 * @param : region - the summoners region
 * @param : callback - a function to execute once the operation has complate
 */
StaticDataRequest.prototype.GetChampionById = function(championId, region, callback){
	var requestUri = this.ModifyBaseURL(summonerId, region);
    requestUri += "champion/" + championId;
    requestUri += "?champData=tags";
    
    this.HttpClient.GetRequest(requestUri, callback);
}

module.exports = new StaticDataRequest;