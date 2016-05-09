var SummonerRequest = require("../utilities/SummonerRequest");

/**
 * A services for managing summoner information
 */
function SummonerService() {
}

/**
 * Loads a summoner by name and region
 * @param : summonerName - the summoners name
 * @param : region - the summoners region
 * @param : callback - the function to call once the operation is complete.
 */
SummonerService.prototype.LoadSummoner = function(summonerName, region, callback){
	SummonerRequest.GetSummonerByName(summonerName, region, callback);	
};

/**
 * Loads a summoners season statistics
 * @param : summonerId - the summoners unique id
 * @param : region - the summoners region
 * @param : callback - the function to call once the operation is complete.
 */
SummonerService.prototype.LoadSummonerStats = function(summonerId, region, callback){
    SummonerRequest.GetSummonerStats(summonerId, region, function(err, res){
        if(err == null){
            var stats = { totalWins: 0, totalChampionKills: 0, totalMinionKills: 0, totalNeutralMinionsKilled: 0, totalAssists: 0, totalTurretsKilled: 0};
            if(res.playerStatSummaries != null){
                for(var i = 0; i < res.playerStatSummaries.length; i++){
                    var tCK = res.playerStatSummaries[i].aggregatedStats["totalChampionKills"];
                    if(tCK != null){
                        stats.totalChampionKills += tCK
                    }
                    
                    var tA = res.playerStatSummaries[i].aggregatedStats["totalAssists"];
                    if(tA != null){
                        stats.totalAssists += tA
                    }
                    
                    var tTK = res.playerStatSummaries[i].aggregatedStats["totalTurretsKilled"];
                    if(tTK != null){
                        stats.totalTurretsKilled += tTK
                    }
                    
                    var tMK = res.playerStatSummaries[i].aggregatedStats["totalMinionKills"];
                    if(tMK != null){
                        stats.totalMinionKills += tMK
                    }
                    
                    var tNMK = res.playerStatSummaries[i].aggregatedStats["totalNeutralMinionsKilled"];
                    if(tNMK != null){
                        stats.totalNeutralMinionsKilled += tNMK
                    }
                    
                    var tW = res.playerStatSummaries[i].wins;
                    if(tW != null){
                        stats.totalWins += tW
                    }
                }            
           }
           
           callback(null, stats);  
       }
       else{
           callback(err, null);
       } 
    });
};

module.exports = new SummonerService;