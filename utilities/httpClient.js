var request = require("request");
var config = require("./Config");

//var apiKey = "5c72e03c-99f4-4135-8044-7d1c157188a8";

/**
 * Handles http requests for the application
 */
function HttpClient(){
}

/**
 * Sends an HTTP Get request
 * @param : requestUri - The request uri
 * @param : callback - the function to call once the operation is complete.
 */
HttpClient.prototype.GetRequest = function(requestUri, callback){
    requestUri = this.AddApiKey(requestUri);
	request(requestUri, function(err, res, body){
        if (!err && res.statusCode == 200) {
            callback(null, JSON.parse(body)); 
        }
        else if(res.statusCode == 403){
            callback("Forbidden!", null);
        }
        else if(res.statusCode == 404){
            callback("Not Found!", null);
        }
    });  
}

/**
 * Adds the api key to the request uri
 * @param : requestUri - The request uri
 */
HttpClient.prototype.AddApiKey =function(requestUri){
    if(requestUri.indexOf('?') == -1)
    {
        requestUri += "?";
    }
    else{
        requestUri += "&";
    }
    
    requestUri += "api_key=" + config.APIKey;
    return requestUri;
}

module.exports = HttpClient;