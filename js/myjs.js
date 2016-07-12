/**
 * Created by Mumu on 2016/6/29.
 */
angular.module("myApp", ['ng', 'ngRoute', 'ngAnimate']).controller("main", function ($rootScope,$scope,$http,$location) {
  $scope.pageClass = 'page-main';//main页面样式
  var isFoods = true;//这个状态根据服务器数据判断
  $scope.isMore  = isFoods;
  $scope.noMore  = !isFoods;
  $scope.serData = [];//服务器json数据;
  $scope.proData = [];//服务器数据存储对象
  var step = 5;//加载数据个数
  var index = 0;//从第一条数据开始取值
  $http.get("json/package.json").success(function (data) {
    $scope.serData = data;
    addData();
    //goto details
    $rootScope.toDetails = function(){
      $rootScope.currentFood = data[this.$index];
      $location.path('/detail');
    };
  });
  //首次加载服务器数据
  function addData() {
    var len = $scope.serData.length;//服务器数据长度
    var a = len - index;//取值位置
    if (a < 3) {//服务器数据不足,有多少取多少
      for (var i = 0; i < a; i++) {
        $scope.proData.push($scope.serData[index]);
        index++;
      }
    }
    else {//否则只取step长度数据
      for (var i = 0; i < step; i++) {
        $scope.proData.push($scope.serData[index]);
        index++;
      }
    }
    //判断是否取值完毕
    if (index >= len) {
      isFoods = false;
      $scope.isMore = isFoods;
      $scope.noMore = !isFoods;
      return false;
    }
  }
  $scope.addFoods = function () {
    step = 3;
    addData();
  };
}).controller("loading",function($scope,$timeout,$location){
  $scope.pageClass = 'page-loading';
  $timeout(function(){
    (function(){
      $location.path('/main');
    })();
  },3000);
}).controller("start",function($scope,$location){
  $scope.pageClass = 'page-start';//start页面样式
  $scope.jump = function () {
    $location.path('/loading');
  }
}).controller("details",function($scope){
  $scope.pageClass = 'page-details';//details页面样式
}).controller("order1",function($scope){
  $scope.pageClass = 'page-order1';//order1页面动画
}).controller("order2",function($scope){
  $scope.pageClass = 'page-order2';//order2页面动画
}).config(function ($routeProvider) {
  $routeProvider.when("/loading",{
    templateUrl: 'tpl/loading.html',
    controller: 'loading'
  }).when("/start", {
    templateUrl: 'tpl/start.html',
    controller: 'start'
  }).when("/main", {
    templateUrl: 'tpl/main.html',
    controller:'main'
  }).when("/detail", {
    templateUrl: 'tpl/details.html',
    controller:'details'
  }).when("/order1", {
    templateUrl: 'tpl/order1.html',
    controller:'order1'
  }).when("/order2", {
    templateUrl: 'tpl/order2.html',
    controller:'order2'
  }).otherwise({
    redirectTo: '/start'
  })
})
