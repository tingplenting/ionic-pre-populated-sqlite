(function() {

'use strict';

var db;

angular
	.module('starter',['ionic','ngCordova'])
	.run(appRun)
	.config(appConfig)
	.controller('ConfigController',configController)
	.controller('FrontController',frontController);

appRun.$inject = ['$ionicPlatform'];

function appRun($ionicPlatform) {
	$ionicPlatform.ready(function() {
		if(window.cordova && window.cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

			cordova.plugins.Keyboard.disableScroll(true);
		}
		if(window.StatusBar) {
			StatusBar.styleDefault();
		}
	});
}

appConfig.$inject = ['$stateProvider','$urlRouterProvider'];

function appConfig($stateProvider,$urlRouterProvider) {

	$stateProvider
	.state('config',{
		url: '/config',
		templateUrl: 'templates/config.html',
		controller: 'ConfigController'
	})

	.state('front',{
		url: '/front',
		templateUrl: 'templates/front.html',
		controller: 'FrontController'
	});

	$urlRouterProvider.otherwise('/config');

}

configController.$inject = ['$ionicPlatform','$state','$cordovaSQLite']; 

function configController ($ionicPlatform,$state,$cordovaSQLite) {

	$ionicPlatform.ready(function() {
		window.plugins.sqlDB.copy("populated.db", 0, function() {
			db = $cordovaSQLite.openDB({
						name:'populated.db',
						location:'default'
					});
			$state.go("front");
		}, function(error) {
			db = $cordovaSQLite.openDB({
						name:'populated.db',
						location:'default'
					});
			$state.go("front");
		});
	});

}

frontController.$inject = ['$scope','$cordovaSQLite','$ionicHistory'];

function frontController ($scope,$cordovaSQLite,$ionicHistory) {

	$ionicHistory.clearHistory();
	console.log(" ||| this FrontController DB >>>>> " + JSON.stringify(db));

	$scope.listr = [];

	var query = "SELECT * FROM people ORDER BY id DESC";
	$cordovaSQLite.execute(db, query, []).then(function(res) {
		if(res.rows.length > 0) {
			for(var i = 0; i < res.rows.length; i++) {
				console.log("SELECTED -> " + res.rows.item(i).firstname + " "
					+ res.rows.item(i).lastname);
				// harus di describe semua
				$scope.listr.push({
					id: res.rows.item(i).id, 
					firstname: res.rows.item(i).firstname, 
					lastname: res.rows.item(i).lastname
				});
			}
		}
	}, function (err) {
		console.error(err);
	});

}

})();
