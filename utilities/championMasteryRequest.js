var request = require("request");
var HttpClient = require("./HttpClient");

/**
 * Request handler for champion masteries
 */
function ChampionMasteryRequest(){
	this.baseUrl = "https://{region}.api.pvp.net/championmastery/location/{region}/player/{summonerId}/";
    this.HttpClient = new HttpClient();
}

/**
 * Request champion mastery data for a summoner by id
 * @param : summonerId - the summoners id
 * @param : region - the summoners region
 * @param : callback - the function to call once the operation is complete.
 */
ChampionMasteryRequest.prototype.GetChampionMastery = function(summonerId, region, callback){
	var requestUri = this.ModifyBaseURL(summonerId, region);
    requestUri += "champions";
    
    this.HttpClient.GetRequest(requestUri, callback);
}

/**
 * Request total champion mastery score for a summoner by id
 * @param : summonerId - the summoners id
 * @param : region - the summoners region
 * @param : callback - the function to call once the operation is complete.
 */
ChampionMasteryRequest.prototype.GetTotalChampionMasteryScore = function(summonerId, region, callback){
	var requestUri = this.ModifyBaseURL(summonerId, region);
    requestUri += "score";
    
    this.HttpClient.GetRequest(requestUri, callback);
}

/**
 * Modifies the base url
 * @param : summonerId - the summoners id
 * @param : region - the summoners region
 */
ChampionMasteryRequest.prototype.ModifyBaseURL = function(summonerId, region){
    var newBaseUrl = this.baseUrl.replace(/{summonerId}/g, summonerId);
    newBaseUrl = newBaseUrl.replace("{region}", region);
    newBaseUrl = newBaseUrl.replace("{region}", this.GetPlatformFromRegion(region));
    return newBaseUrl;
}

/**
 * Gets the platform from the region
 * @param : region - the summoners region
 */
ChampionMasteryRequest.prototype.GetPlatformFromRegion = function(region){
    if(region == "EUNE"){
        return "EUN1";
    }
    else if(region == "LAN"){
        return "LA1";
    }
    else if(region == "LAS"){
        return "LA2";
    }
    else if(region == "OCE"){
        return "OC1";
    }
    else {
        return region + "1";
    }
}

module.exports = new ChampionMasteryRequest;