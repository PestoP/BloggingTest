/*appBlog.factory('tokenInterceptor', [ "$window", '$rootScope', "$state", function ($window, $rootScope, $state) {
    return {
      putAuthorization: function (config) {
      	if ($window.sessionStorage.token)
        	config.headers.Authorization = $window.sessionStorage.token;
        return config;
      }
    }
  }]);

appBlog.config(['$httpProvider', function ($httpProvider) {
        $httpProvider.interceptors.push(tokenInterceptor);
}]);*/