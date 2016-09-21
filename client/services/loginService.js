appBlog.factory('loginService', ['$http', '$window', '$rootScope', '$state', function($http, $window, $rootScope, $state) {
  return {
  	login: function (data) {
	  	 return $http.post('/authenticate', {data: {username: data.username, password: data.password}, headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(
  		function (response) {
  			if (response.data.success) {
	  			$window.sessionStorage.token = response.data.token;
		  		$rootScope.logout = false;
	  		}
	  		return response.data.success;
  		});
  	},

	  logout: function (data) {
	  	$window.sessionStorage.removeItem('token');
	  	$rootScope.logout = true;
	  	$state.go("app");
	  },

	  register: function (data) {
	  	return $http.post('/register', {data : {
	      username: data.username,
	      password: data.password
	    }, headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(
  		function (response) {
  			return response.data.success;
  		});
	  }
	};
}]);