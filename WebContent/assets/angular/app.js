/**
 * 
 */

var myApp = angular.module('erpApp', ['ui.router']);

myApp.service('loadService', ['$http',  function($http) {
    
	this.usersPage = function() {
		return $http.get('admin/createUsers.html');
	};
	
    this.applicationPage = function() {
        return $http.get('admin/masters/applicationForm.jsp');
    };
    
    this.registerPage = function() {
        return $http.get('admin/masters/registration.jsp');
    };
    
    this.assignmentPage = function() {
        return $http.get('academic/assignment.jsp');
    };
    
    this.settingsPage = function() {
    	return $http.get('settings.html');
    };
    
    this.allStopsPage = function() {
    	return $http.get('admin/transport/allStops.html');
    };
    
}]);


myApp.config(function($stateProvider, $urlRouterProvider) {
    
	/*cfpLoadingBarProvider.includeSpinner = true;*/
    $urlRouterProvider.otherwise('/');
    
    $stateProvider
        
        
        .state('application', {
            url: '/application',
            
            resolve: {
                home: ['loadService',
                    function(loadService) {
                		
                    return loadService.applicationPage();
                }],
                
            },
            templateUrl : 'admin/masters/applicationForm.jsp',
           /* controller: 'loadCtrl',*/
        })
        
        .state('createUsers', {
            url: '/createUsers',
            
            resolve: {
                home: ['loadService',
                    function(loadService) {
                		
                    return loadService.usersPage();
                }],
                
            },
            templateUrl : 'admin/createUsers.html'
           /* controller: 'loadCtrl',*/
        })
        
        .state('registration', {
            url: '/registration',
            
            resolve: {
                about: ['loadService',
                    function(loadService) {
                		
                    return loadService.registerPage();
                }],
                
            },
            templateUrl : 'admin/masters/registration.jsp',
      /*      controller: 'loadCtrl',*/
        })
        
        .state('settings', {
            url: '/settings',
            
            resolve: {
                about: ['loadService',
                    function(loadService) {
                		
                    return loadService.settingsPage();
                }],
                
            },
            templateUrl : 'settings.html',
      /*      controller: 'loadCtrl',*/
        })
        
        // paste here
        
        
        .state('assignment', {
            url: '/assignment',
            
            resolve: {
                home: ['loadService',
                    function(loadService) {
                		
                    return loadService.assignmentPage();
                }],
                
            },
            templateUrl : 'academic/assignment.jsp',
           /* controller: 'loadCtrl',*/
        })
        
       .state('allVehicles', {
            url: '/allVehicles',
            
            resolve: {
                home: ['loadService',
                    function(loadService) {
                		
                    return loadService.vehiclesPage();
                }],
                
            },
            templateUrl : 'admin/transport/allVehicles.html',
           /* controller: 'loadCtrl',*/
        })
        
       .state('vehicleDetails', {
            url: '/vehicleDetails',
            
            resolve: {
                home: ['loadService',
                    function(loadService) {
                		
                    return loadService.vehicleDetailsPage();
                }],
                
            },
            templateUrl : 'admin/transport/vehicleDetails.html',
           /* controller: 'loadCtrl',*/
        })
        .state('stops', {
            url: '/stops',
            
            resolve: {
                home: ['loadService',
                    function(loadService) {
                		
                    return loadService.allStopsPage();
                }],
                
            },
            templateUrl : 'admin/transport/allStops.html',
           /* controller: 'loadCtrl',*/
        })  
       
        .state('assignSubjects', {
            url: '/assignSubjects',
            
            resolve: {
                about: ['loadService',
                    function(loadService) {
                		
                    return loadService.registerPage();
                }],
                
            },
            templateUrl : 'admin/masters/assignSubjects.jsp',
      /*      controller: 'loadCtrl',*/
        })
        .state('manageClass', {
            url: '/manageClass',
            
            
            templateUrl : 'admin/masters/manageClass.html',
      /*      controller: 'loadCtrl',*/
        })
        .state('manageDivisions', {
            url: '/manageDivisions',
            
            
            templateUrl : 'admin/masters/manageDivisions.html',
      /*      controller: 'loadCtrl',*/
        })
         .state('manageDesignation', {
            url: '/manageDesignation',
            
            
            templateUrl : 'admin/masters/manageDesignations.html',
      /*      controller: 'loadCtrl',*/
        })
        .state('manageNationality', {
            url: '/manageNationality',
            
            
            templateUrl : 'admin/masters/manageNationality.html',
      /*      controller: 'loadCtrl',*/
        })
        .state('manageReligion', {
            url: '/manageReligion',
            
            
            templateUrl : 'admin/masters/manageReligion.html',
      /*      controller: 'loadCtrl',*/
        })
        .state('manageSubjects', {
            url: '/manageSubjects',
            
            
            templateUrl : 'admin/masters/manageSubjects.html',
      /*      controller: 'loadCtrl',*/
        })
        .state('manageTransport', {
            url: '/manageTransport',
            
            
            templateUrl : 'admin/masters/manageTransport.html',
      /*      controller: 'loadCtrl',*/
        })
       
});


/*myApp.controller('classDataCtrl', function ($scope, $http) {
    //$scope.gridheader = ['Name','City','Country']
		var parameters = {
            section : 'class',
            action : 'listAll'
        };
        var config = {
            params: parameters
        };
	
        $http.get('adminCRUD', config).success(function (data) {
        		console.log("The data obtained is  : "+data);
                $scope.classData = data;
        })
});*/

/*
myApp.controller('loadCtrl', ['$state', 'loadService', 'home', 'about',
    function($state, loadService, home, about) {

    this.home = home.data;

    
    
    this.about = about.data;
    
    
}]);*/