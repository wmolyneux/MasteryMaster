var app = angular.module('MasteryMaster');

app.controller('findSummonerController', function ($rootScope, $scope, findSummonerService, $location, summonerService, champMasteriesService, achievementsService) {
    // determines if the controller is active
    $scope.isActive = function(route) {
        return route === $location.path();
    }
    
    // whether data has been reloaded
    $rootScope.loaded = 1;
    
    // the selected region
    $scope.selectedRegion = null;
    
    // the available regions
    $scope.regions = ["BR", "EUNE", "EUW", "JP", "KR", "LAN", "LAS", "NA", "OCE", "RU", "TR"];
    
    // the summoner name entered into the form
    $scope.formSummonerName = null;
    
    // finds the summoner info
    $scope.findSummonerInfo = function(){
        findSummonerService.GetSummonerInfo($scope.formSummonerName, $scope.selectedRegion, function(summonerData){
            $rootScope.$apply(function(){
                
                var summonerMap = JSON.parse(summonerData);
                var output = Object.keys(summonerMap).map(function(key) {
                    return summonerMap[key];
                });
                
                $rootScope.summonerData = output[0];
                $rootScope.region = $scope.selectedRegion;
                summonerService.SetSummonerStats($rootScope.summonerData.id, $rootScope.region, function(){
                    champMasteriesService.loadMasteries($rootScope.summonerData, $rootScope.region, function(){
                        achievementsService.GetAchievements($rootScope.summonerData, summonerService.GetSummonerStats(), champMasteriesService.GetChampionMasteryData());
                        $rootScope.$apply(function(){
                            $rootScope.loaded = $rootScope.loaded + 1;
                        }) 
                    });
                });
            })
        });
    }
});

app.factory('findSummonerService', function () {
    return {
        GetSummonerInfo: function (summonerName, region, callback) {
            console.log(summonerName);
            console.log(region);
            if(summonerName != null && summonerName != "" && region != "" && region != null){
                var requestUrl = "/summoner/" + summonerName + "/region/" + region;
                var xhttp = new XMLHttpRequest();
                xhttp.onreadystatechange = function() {
                    if (xhttp.readyState == 4 && xhttp.status == 200) {
                        callback(xhttp.responseText);
                    }
                };
                xhttp.open("GET", requestUrl, true);
                xhttp.send();            
            }
        },
    };
});

app.controller('summonerController', function ($rootScope, $scope, summonerService) {
    // watches the summoner data for a change to then reload the statistics information
    $rootScope.$watch("summonerData", function(newVal, oldVal){
        if(JSON.stringify(newVal) != JSON.stringify(oldVal)){
            $scope.findSummonerStats();    
        }
    });
    
    // the summoner statistics
    $scope.summonerStats = summonerService.GetSummonerStats();
    
    // finds the summoner statistics
    $scope.findSummonerStats = function(){
        summonerService.SetSummonerStats($rootScope.summonerData.id, $rootScope.region, function(){
            $scope.$apply(function(){
                $scope.summonerStats = summonerService.GetSummonerStats();
            })
        });
    }
});

app.factory('summonerService', function () {
    // the summoner statistics
    var summonerStats = null;
    return {
        GetSummonerStats: function(){
            return summonerStats;
        },
        SetSummonerStats: function (summonerId, region, callback) {
            var requestUrl = "/summoner/summonerId/" + summonerId + "/region/" + region + "/stats";
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    summonerStats = JSON.parse(xhttp.responseText);
                    callback();
                }
            };
            xhttp.open("GET", requestUrl, true);
            xhttp.send();
        },
    };
})