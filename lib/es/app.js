var app = angular.module('app', ['onsen']);

// service
app.factory('ItemService', function($http){

    var name = 'a';
    var path = 'http://192.168.43.212:8080/MyShop/ajax';
    return{

      getItem : getItem,
      getItems : getItems,
      getNewItems : getNewItems,
      getCategory : getCategory,
      getCategories : getCategories,
      editItem : editItem
      

    }
    
    // functions 
    // get name
    function getItem(id) {
    	
        var request = $http({
            method: "get",
            url: path,
            params: {
                m: "getItem",
                id: id
            }
        });

        return(request.then(handleSuccess, handleError, handleNotification));
        
    }
    
    // get items
    function getItems(id) {

        var request = $http({
            method: "get",
            url: path,
            params: {
                m: "getItems",
                id: id
                	
            }
        });

        return(request.then(handleSuccess, handleError, handleNotification));

    }
    
    function getNewItems() {

        var request = $http({
            method: "get",
            url: path,
            params: {
                m: "getNewItems"
            }
        });

        return(request.then(handleSuccess, handleError, handleNotification));

    }
    
    function getCategory(id) {

        var request = $http({
            method: "get",
            url: path,
            params: {
                m: "getCategory",
                id: id
            }
        });

        return(request.then(handleSuccess, handleError, handleNotification));

    }
    
    function getCategories() {

        var request = $http({
            method: "get",
            url: path,
            params: {
                m: "getCategories"
            }
        });

        return(request.then(handleSuccess, handleError, handleNotification));

    }
    
    function editItem(item) {

        var request = $http({
            method: "post",
            url: path,
            params: {
                m: "editItem",
                item: item
            }
        });

        return(request.then(handleSuccess, handleError, handleNotification));

    }
    
    // call backs
    function handleSuccess( response ) {
    	console.log("success");
    	console.log(response.data);
        return( response.data );

    }
    function handleError( response ) {
    	console.log("fail");
    }
    
	function handleNotification(response) {
		console.log("notification");
	  	console.log(response);
	}
	
  });

// main controller
app.controller('AppController', function($scope, $http, $timeout, ItemService) {
	
	// public methods
	
	ItemService.getCategories().then(function (data) {$scope.categories = data;});
	
	// private methods
	// get items
	$scope.getItems = function (id) {
		categoriesNav.pushPage('items.html');
		ItemService.getCategory(id).then(function (data) {$scope.category = data;});
		ItemService.getItems(id).then(function (data) {$scope.items = data;});
	}
	// get new items
    $scope.getNewItems = function($done) {
        $timeout(function() {
        	ItemService.getNewItems().then(function (data) {$scope.newItems = data;});
        	$done();
        }, 1000);
    }
	// get item
	$scope.getItem = function (id) {
		categoriesNav.pushPage('item.html');
		ItemService.getItem(id).then(function (data) {$scope.item = data;});
	}

	// get item
	$scope.getNewItem = function (id) {
		itemsNav.pushPage('item.html');
		ItemService.getItem(id).then(function (data) {$scope.item = data;});
	}
	
	// edit item
	$scope.editItem = function (item) {
		ItemService.editItem(item);
	}
	
	// alert
	$scope.myAlert = function (message, title) {
		
		try {
			alert(navigator.notification);
			navigator.notification.alert(message + '!', null, title, 'OK');
		} catch (e) {
			alert(e.message);
			alert(e);
		}
	
	}
	
	// camera
	$scope.camera = function () {
		if (!navigator.camera) {
			alert("Camera API not supported", "Error");
	        return;
	    }
	    var options =   {   quality: 50,
	                        destinationType: Camera.DestinationType.DATA_URL,
	                        sourceType: 1,      // 0:Photo Library, 1=Camera, 2=Saved Photo Album
	                        encodingType: 0     // 0=JPG 1=PNG
	                    };
	 
	    navigator.camera.getPicture(
	        function(imageData) {
	        	 $scope.alert("Success taking picture", "yeppy");
	        },
	        function() {
	        	 $scope.alert('Error taking picture', 'Error');
	        },
	        options);
	}
	 
	 
	    
	
});


