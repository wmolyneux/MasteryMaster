var app = angular.module('MasteryMaster');

app.controller('champMasteriesController', function ($rootScope, $scope, champMasteriesService) {   
    // The available orders for champion mastery data 
    $scope.orders = champMasteriesService.GetOrders();
    
    // The selected order for champion mastery data
    $scope.selectedOrder = champMasteriesService.GetSelectedOrder();
    
    // The available filters for champion mastery data
    $scope.filterValues = champMasteriesService.GetFilterValues();
    
    // The selected filters for champion mastery data
    $scope.filters = {};
    
    // The champion mastery data for a summoner
    $scope.championMasteries = champMasteriesService.GetChampionMasteries();
    
    // Watches the filters variable for a change to refresh the displayed mastery data 
    $scope.$watch("filters", function(){
        champMasteriesService.SetFilters($scope.filters);
    });
    
    $rootScope.$watch("loaded", function(newVal, oldVal){
        $scope.reCalculateDisplayedMasteries();
    });
    
    // Loads mastery data for a summoner
    $scope.loadMasteries = function(){
        if($rootScope.summonerData != undefined){
            champMasteriesService.loadMasteries($rootScope.summonerData, $rootScope.region, function(){
                $scope.$apply(function(){
                    $scope.reCalculateDisplayedMasteries();
                });   
            });
        }
    }
    
    // re-calculates the data and displays masteries
    $scope.reCalculateDisplayedMasteries = function(){
        champMasteriesService.SetSelectedOrder($scope.selectedOrder);
        champMasteriesService.ReCalculateDisplayedMasteries();
        $scope.championMasteries = champMasteriesService.GetChampionMasteries();
    }
    
    // initial drawing of the champion masteries
    $scope.reCalculateDisplayedMasteries();
});

app.factory('champMasteriesService', function ($rootScope) {
    // the available orders for champion mastery data
    var orders = ["Alphabetically", "Highest Level", "Lowest Level", "Nearest To Level Up", "Furthest From Level Up"];
    
    // the selected order for mastery data
    var selectedOrder = orders[0];
    
    // The available filters for mastery data
    var filterValues = [{ name : "Tank" },{ name : "Mage" },{ name : "Assassin"},{ name : "Fighter" },{ name : "Support" },{ name : "Marksman" }];
    
    // The full mastery data before filtering
    var masteryData = null;
    
    // the current filters
    var filters = {};
    
    var self = this;
    
    // The champion mastery data to be displayed
    var championMasteries = null;
    
    // filters the masteries based on selected filters
    FilterMasteries = function(){
        var filters = FindFilters();
        var filteredMasteries = [];
        for(var i = 0; i < masteryData.length; i++){
            var filterCount = filters.length;
            for(var k = 0; k < filters.length; k++){
                for(var j = 0; j < masteryData[i].Champion.tags.length; j++){
                    if(masteryData[i].Champion.tags[j] == filters[k]){
                        filterCount -= 1;
                        break;
                    }
                }
                
            }
            
            if(filterCount == 0){
                filteredMasteries.push(masteryData[i]);
            }
        }
        
        return filteredMasteries;
    };
    
    // orders masteries based on selected order
    OrderMasteries = function(masteriesToOrder, callback){
        var orderedMasteries = [];
        if(selectedOrder == "Alphabetically"){
            masteriesToOrder.sort(function(a, b) {
                return a.Champion.name.localeCompare(b.Champion.name);
            });
            return masteriesToOrder;
        }
        else if(selectedOrder == "Highest Level"){
            return masteriesToOrder;
        }
        else if(selectedOrder == "Lowest Level"){
            masteriesToOrder.sort(function(a, b) {
                return a.Mastery.championPoints - b.Mastery.championPoints;
            });
            return masteriesToOrder;
        }
        else if(selectedOrder == "Nearest To Level Up"){
            masteriesToOrder.sort(function(a, b) {
                return a.Mastery.championPointsUntilNextLevel - b.Mastery.championPointsUntilNextLevel;
            });
            return masteriesToOrder;
        }
        else if(selectedOrder == "Furthest From Level Up"){
            masteriesToOrder.sort(function(a, b) {
                return b.Mastery.championPointsUntilNextLevel - a.Mastery.championPointsUntilNextLevel;
            });
            return masteriesToOrder;
        }
    }
    
    // finds which filters are selected
    FindFilters = function(){
        var trueFilters = [];
        for(var f in filters){
            if(filters.hasOwnProperty(f) && filters[f] == true){
                trueFilters.push(f);
            }
        }
        
        return trueFilters;
    }
    
    return {
        GetOrders: function(){
            return orders;
        },
        GetSelectedOrder: function(){
            return selectedOrder;
        },
        SetSelectedOrder: function(newOrder){
            selectedOrder = newOrder;
        },
        GetFilterValues: function(){
            return filterValues;  
        },
        GetMasteryData: function(){
            return masteryData;
        },
        GetFilters: function(){
            return filters;
        },
        SetFilters: function(newFilters){
            filters = newFilters;  
        },
        GetChampionMasteries: function(){
            return championMasteries;
        }, 
        GetChampionMasteryData: function(){
            return masteryData;  
        },
        loadMasteries: function(summonerData, region, callback) {
            var requestUrl = "/championmastery/summonerId/" + summonerData.id + "/region/" + region;
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    masteryData = JSON.parse(xhttp.responseText);
                    callback();
                }
            };
            xhttp.open("GET", requestUrl, true);
            xhttp.send();            
        },
        ReCalculateDisplayedMasteries: function(){
            if($rootScope.summonerData != undefined){
                var refinedMasteries = FilterMasteries();
                
                refinedMasteries = OrderMasteries(refinedMasteries);
                championMasteries = refinedMasteries;
            }
        }
    };
})