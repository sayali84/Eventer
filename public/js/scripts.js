var app = angular.module('rootApp',['ngAnimate'])

    .controller('rootController',["$scope", "$http", function($scope, $http){
	   $scope.cards = ['Cake','Decorations','Invitations','Catering','Games', 'Return Gifts'];	
	   $scope.showResults = false;
	   $scope.showBoard = true;
	   $scope.boardHTML = "partials/planning_board.html";
	   $scope.resultsHTML = "partials/search_results.html"; 
	   $scope.resultSet = {};
	   
	   // change the css of button when clicked  
	   $scope.isSelected = function(type){ 
		   return $scope.selected_type === type;
	   }
	   
	   $scope.search = function($event, type){
		   $scope.animeClass = "slideRight"; // add animation with slideRight class 
		   $scope.selected_type = type;
		   
		   var location = 'Sunnyvale CA'; // TODO: set location manually or by google api
		   var term = 'party ' + type; // appending party to improve yelp search results
		   
		   $http.get('/MakeMyEvent/search/yelp/' + location + '/' + term)
		   .success(function(data, status, headers, config){
			   $scope.resultSet = data;
			   $scope.showResults = true;
		   })
		   .error(function(data, status, headers, config){
			  $scope.status = status; 
		   });
	   };
    }])
	 .directive('dragit', function($document, $window) {
		   function makeDraggable(scope, element, attr) {
		     angular.element(element).attr("draggable", "true");
		     element.on('dragstart', function(event) {
		        element.addClass('dragItem');
		        event.originalEvent.dataTransfer.setData('Text', element.find("span").html());
		     });
		     
		     element.on('drag', function(event) {
		     });
		     element.on('dragend', function(event) {
		       event.preventDefault();
		       element.removeClass('dragItem');		    
		     });
		   }
		   return {
		     link: makeDraggable
		   };
 })
    .directive('dropit', function($document, $window) {
    return {
	     restrict: 'A',
	     link: function makeDroppable(scope, element, attr){
	       element.on('dragover', function(event) {
	         event.preventDefault();
	         element.addClass('dropItem');
	       });
	       element.on('dragleave', function(event) {
	         event.preventDefault();
	         element.removeClass('dropItem');
	       });
	       element.on('dragenter', function(event) {
	         event.preventDefault();
	         element.addClass('dropItem');
	       });
	       element.on('drop', function(event) {
	         event.preventDefault();
	         element.removeClass('dropItem');
	         scope.$apply(function(){
	        	 if(scope.$parent.selected_type == element.parent().children(".heading").html().trim())
	        		 {
	        		 	element.append('<li>' + 
	        		 			event.originalEvent.dataTransfer.getData('Text')  + '</li>');
	        		 	$('.dragItem').hide("slow");
	        		 	
	        		 }
	        	 else{
	        		  
	        		  shake_effect(element.parent());
	        		  
	        	 }
	         });
	       });
	     }
   };
 });

	app.animation('.slideRight', function() {
		return {
			     enter : function(element, parentElement, afterElement, doneCallback) {},
			     leave : function(element, doneCallback) {},
			     move : function(element, parentElement, afterElement, doneCallback) {},
			     addClass : function(element, className, done) {
			       element.animate({ right: 10}, 1000);
			     },
			     removeClass : function(element, className, done) {
			       element.animate({ left: 0}, 1000);
			     }
			 };
	});
	
	function shake_effect(elm){
		for(var i=0; i<4; i++){
			var sign_1 = '+';
			var sign_2 = '-';
			
			if (i % 2 == 0){
				sign_1 = '-';
				sign_2 = '+';
			}
			else{
				sign_1 = '+';
				sign_2 = '-';
			}
		  elm.animate({
		        'margin-left': sign_1 + '5px',
		        'margin-right': sign_2 + '5px'
		    }, 50);
		  
		}
	}
	
	
		
	
