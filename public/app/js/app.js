var noteKeep = angular.module("notekeep",['ui.router','ngStorage']);

noteKeep.config(["$stateProvider", "$urlRouterProvider",function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/login");
    $stateProvider.state('login', {
        url: '/login',
        templateUrl: 'app/templates/login.html',
        controller: 'loginCtrl',
        title: 'Login'
    }).state('signup',{
        url:'/signup',
        templateUrl:'app/templates/signup.html',
        controller:'signupCtrl',
        title:'signup'
    }).state('dashbord',{
        url:'/dashbord',
        templateUrl:'app/templates/dashbord.html',
        controller:'dashbordCtrl',
        title:'dashbord'
    })

}]);
