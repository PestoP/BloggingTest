//Controlleur du template login
appBlog.controller('loginCtrl', ['$scope', '$http', 'loginService', '$rootScope', '$state', function($scope, $http, loginService, $rootScope, $state) {
  //si il n'y a pas de logout, l'utilisateur peut entrer dans home
  // if (!$rootScope.logout) {
  // 	$state.go('home');
  // }

  $scope.login = function () {
		if (!$scope.register) {
	  	loginService.login({username: $scope.username, password: $scope.password}).then(function (resp) {
	  		$state.go('home');
	  	}).catch(function () {
	  		console.log("error")
	  	});
		} else {
			if(loginService.register({username: $scope.username, password: $scope.password, email: $scope.email})){
	  	  $state.go('app');
			} else {
				console.log("error")
			}
		}
  }
}]);