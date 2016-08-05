//Controlleur du template app
appBlog.controller('appCtrl', ['$scope', 'loginService', "$rootScope", '$window', '$state', function($scope, loginService, $rootScope, $window, $state) {
	
  //permet de savoir si oui, ou non, l'individu est loggé
  var getAuthorization = function () {
  if (!$window.sessionStorage.token) {
    $rootScope.logout = true;
    $state.go("login");
  } else {
    $rootScope.logout = false;
  }};
  $rootScope.$on('$statechangestart', getAuthorization());  

	$rootScope.logoutF = function () {
		loginService.logout()
	};
}]);