var app = angular.module('MasteryMaster');

app.controller('achievementsController', function ($rootScope, $scope, achievementsService, summonerService, champMasteriesService) {
    // Loads the achievements for the current summoner
    $scope.achievements = achievementsService.GetAchievements(
        $rootScope.summonerData, 
        summonerService.GetSummonerStats(), 
        champMasteriesService.GetChampionMasteries());
    
    // Calculates the summoner achievement statistics        
    $scope.achievementStats = achievementsService.GetAchievementStats();
    
    // finds achievements
    $scope.findAchievements = function(min, max) {
        var input = [];
        if($scope.achievements.length >= max){
            for (var i = min; i < max; i++) {
                input.push($scope.achievements[i]);
            }
        }
        
        return input;
    };
    
    // calculates the achievements opacity based on if the achievement has been earned
    $scope.getOpacity = function(earned){
        if(earned == true){
            return 1.0;
        }
        else{
            return 0.3;
        }
    }
});

app.factory('achievementsService', function () {
    // The list of achievements and their information
    var achievements = [
        { id : 1, title : "Challenger of the rift", desc : "Get a champion to level 5.", score : 150, earned : false },
        { id : 2, title : "Scrub lord 9000", desc : "All owned champions level 1 or above", score : 5, earned : false },
        { id : 3, title : "Baby steps", desc : "All owned champions level 2 or above", score : 10, earned : false },
        { id : 4, title : "Three musketeers", desc : "All owned champions level 3 or above", score : 30, earned : false },
        { id : 5, title : "Four calling birds", desc : "All owned champions level 4 or above", score : 100, earned : false },
        { id : 6, title : "Master of the rift", desc : "All owned champions level 5", score : 200, earned : false },
        { id : 7, title : "Chicken dinner..", desc : "Over 100 total wins (current season)", score : 15, earned : false },
        { id : 8, title : "True Spartan", desc : "Over 300 total wins (current season)", score : 30, earned : false },
        { id : 28, title : "Hope you're not support", desc : "Over 1000 total champion kills (current season)", score : 20, earned : false },
        { id : 10, title : "Not quite 9000", desc : "Over 5000 total champion kills (current season)", score : 40, earned : false },
        { id : 11, title : "Time to KS!", desc : "Over 1000 assists", score : 15, earned : false },
        { id : 12, title : "JCB", desc : "Over 100 turrets killed", score : 15, earned : false },
        { id : 13, title : "More farm, less afk", desc : "Over 10000 minions killed", score : 25, earned : false },
        { id : 14, title : "Less farm, more teamwork!", desc : "Over 100000 minions killed", score : 90, earned : false },
        { id : 15, title : "Welcome to the jungle", desc : "Over 1000 neutral minions killed", score : 20, earned : false },
        { id : 16, title : "Tank and spank", desc : "All owned tanks over level 2", score : 30, earned : false },
        { id : 17, title : "Bruce Lee", desc : "All owned fighters over level 2", score : 30, earned : false },
        { id : 18, title : "Legolas in the making", desc : "All owned marksman over level 2", score : 30, earned : false },
        { id : 19, title : "Yer a wizard harry", desc : "All owned mages over level 2", score : 30, earned : false },
        { id : 20, title : "The NHS could use you", desc : "All owned supports over level 2", score : 30, earned : false },
        { id : 21, title : "Shhhh sneak", desc : "All owned assassins over level 2", score : 30, earned : false },
        { id : 22, title : "Enjoying it?", desc : "Reach level 10", score : 10, earned : false },
        { id : 23, title : "Wishing you had flash", desc : "Reach level 20", score : 20, earned : false },
        { id : 24, title : "Yaaay! Flash!", desc : "Reach level 30", score : 40, earned : false },
        { id : 25, title : "Training wheels", desc : "Get total champion mastery score of 10", score : 5, earned : false },
        { id : 26, title : "Chump-ion", desc : "Get total champion mastery score of 25", score : 20, earned : false },
        { id : 27, title : "Stop spending RP!", desc : "Get total champion mastery score of 50", score : 55, earned : false },
        { id : 9, title : "Everyone hates you...", desc : "Master MasterYi", score : 100, earned : false },
        ];
    
    // The achievement statistics
    var achievementStats = { earnedScore: 0, earnedCount: 0 };
    
    // Sets the achievements from a list of earned achievements
    SetAchievements = function(earnedAchievements){
        if(earnedAchievements == null){
            earnedAchievements = [];    
        }
        
        var earnedCount = earnedAchievements.length;
        achievementStats.earnedScore = 0;
        for(var i = 0; i < achievements.length; i++){
            var earned = false;
            for(var j = 0; j < earnedAchievements.length; j++){
                if(earnedAchievements[j] == achievements[i].id){
                    earned = true;
                    achievementStats.earnedScore += achievements[i].score;
                    break;
                }
            }
            
            achievements[i].earned = earned;
        }
        
        achievementStats.earnedCount = earnedCount;
    }
    
    // calculates all achievements regarding champion level
    CalcAllOwnedOverLevel = function(champMasteries){
        var lowestLvl = 999;
        var champLevelFive = false;
        var masteryYiLevelFive = false;
        var masteryScore = 0;
        
        for(var i = 0; i < champMasteries.length; i++){
            if(champMasteries[i].Mastery.championLevel < lowestLvl){
                lowestLvl = champMasteries[i].Mastery.championLevel;
            }
            if(champMasteries[i].Mastery.championLevel == 5){
                champLevelFive = true;
            }
            if(champMasteries[i].Champion.name == "Master Yi" &&
                champMasteries[i].Mastery.championLevel == 5){
                    masteryYiLevelFive = true;
            }
            
            masteryScore += champMasteries[i].Mastery.championLevel;
        }
        
        var earnedAchievements = [];
        if(masteryScore >= 10){
            earnedAchievements.push(25);
        }
        if(masteryScore >= 25){
            earnedAchievements.push(26);
        }
        if(masteryScore >= 50){
            earnedAchievements.push(27);
        }
        if(masteryYiLevelFive){
            earnedAchievements.push(9);
        }
        if(champLevelFive){
            earnedAchievements.push(1);
        }
        if(lowestLvl >= 1){
            earnedAchievements.push(2);
        }
        if(lowestLvl >= 2){
            earnedAchievements.push(3);
        }
        if(lowestLvl >= 3){
            earnedAchievements.push(4);
        }
        if(lowestLvl >= 4){
            earnedAchievements.push(5);
        }
        if(lowestLvl >= 5){
            earnedAchievements.push(6);
        }
        
        return earnedAchievements;
    }
    
    // calculates all achievements regarding summoner data
    CalcSummonerAchievements = function(summonerData, summonerStats){
        var summonerLevel = summonerData.summonerLevel;
        var earnedAchievements = [];
        if(summonerLevel >= 10){
            earnedAchievements.push(22);
        }
        if(summonerLevel >= 20){
            earnedAchievements.push(23);
        }
        if(summonerLevel == 30){
            earnedAchievements.push(24);
        }
        if(summonerStats.totalWins >= 100){
            earnedAchievements.push(7);
        }
        if(summonerStats.totalWins >= 300){
            earnedAchievements.push(8);
        }
        if(summonerStats.totalChampionKills >= 1000){
            earnedAchievements.push(28);
        }
        if(summonerStats.totalChampionKills >= 5000){
            earnedAchievements.push(10);
        }
        if(summonerStats.totalAssists >= 1000){
            earnedAchievements.push(11);
        }
        if(summonerStats.totalTurretsKilled >= 100){
            earnedAchievements.push(12);
        }
        if(summonerStats.totalMinionKills >= 10000){
            earnedAchievements.push(13);
        }
        if(summonerStats.totalMinionKills >= 100000){
            earnedAchievements.push(14);
        }
        if(summonerStats.totalNeutralMinionsKilled >= 1000){
            earnedAchievements.push(15);
        }
        
        return earnedAchievements;
    }
    
    // calculates all achievements for champion tags
    CalcChampionTagsOverLevel = function(championMasteries){
        var tanksLevelTwo = true;
        var assassinsLevelTwo = true;
        var fightersLevelTwo = true;
        var marksmanLevelTwo = true;
        var supportsLevelTwo = true;
        var magesLevelTwo = true;
        
        for(var i = 0; i < championMasteries.length; i++){
            if(championMasteries[i].Mastery.championLevel < 2){
                for(var j = 0; j < championMasteries[i].Champion.tags.length; j++){
                    if(championMasteries[i].Champion.tags[j] == "Tank"){
                        tanksLevelTwo = false;
                    }       
                    else if(championMasteries[i].Champion.tags[j] == "Mage"){
                        magesLevelTwo = false;
                    }    
                    else if(championMasteries[i].Champion.tags[j] == "Assassin"){
                        assassinsLevelTwo = false;
                    }
                    else if(championMasteries[i].Champion.tags[j] == "Marksman"){
                        marksmanLevelTwo = false;
                    }
                    else if(championMasteries[i].Champion.tags[j] == "Support"){
                        supportsLevelTwo = false;
                    }
                    else if(championMasteries[i].Champion.tags[j] == "Fighter"){
                        fightersLevelTwo = false;
                    }  
                }
            }
        }
        
        var earnedAchievements = [];
        if(tanksLevelTwo){
            earnedAchievements.push(16);
        }
        if(fightersLevelTwo){
            earnedAchievements.push(17);
        }
        if(marksmanLevelTwo){
            earnedAchievements.push(18);
        }
        if(magesLevelTwo){
            earnedAchievements.push(19);
        }
        if(supportsLevelTwo){
            earnedAchievements.push(20);
        }
        if(assassinsLevelTwo){
            earnedAchievements.push(21);
        }
        
        return earnedAchievements;
    }
    
    return {
        GetAchievements: function(summonerData, summonerStats, champMasteries){
            if(summonerData != null && summonerStats != null && champMasteries != null){      
                var summonerAchievements = CalcSummonerAchievements(summonerData, summonerStats);
                var champTagAchievements = CalcChampionTagsOverLevel(champMasteries);
                var levelAchievements = CalcAllOwnedOverLevel(champMasteries);
                
                var allAchievements = summonerAchievements.concat(champTagAchievements, levelAchievements);
                SetAchievements(allAchievements);
                return achievements;
            }
            else{
                return [];
            }
        },
        ReadAchievements: function(){
            return achievements;
        },
        GetAchievementStats: function(){
            return achievementStats;
        }
    };
})