appBlog.factory('tokenInterceptor', [ "$window", '$rootScope', '$q', function ($window, $rootScope, $q) {
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
             console.log("error");
         }
         return $q.reject(response);
     }
  };
}]);