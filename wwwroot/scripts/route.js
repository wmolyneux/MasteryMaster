var app = angular.module('MasteryMaster', ['ngRoute']);

app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'champMasteries.html',
            controller: 'champMasteriesController',
            activeTab: 'champMasteries'
        })
        .when('/achievements', {
            templateUrl: 'achievements.html',
            controller: 'achievementsController',
            activeTab: 'achievements'           
        })
        .when('/about', {
            templateUrl: 'about.html',
            activeTab: 'about'
        });
});