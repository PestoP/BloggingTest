appBlog.factory('tokenInterceptor', [ "$window", '$rootScope', function ($window, $rootScope) {
  return {
    'request': function (config) {
         config.headers = config.headers || {};
         if ($window.sessionStorage.token) {
             config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
         }
         return config;
     },
     'responseError': function (response) {
         if (response.status === 401 || response.status === 403) {
             $state.go('login');
         }
         return $q.reject(response);
     }
  };
}]);