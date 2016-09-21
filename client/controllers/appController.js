appBlog.controller('appCtrl', ['$rootScope', '$state', function ($rootScope, $state) {
	if ($rootScope.logout === false) {
		$state.go('home');
	}
}]); 