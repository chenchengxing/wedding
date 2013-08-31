angular.module('App', [])
    .directive('imgOnload', function () {       
        return {
            link: function(scope, element, attrs) {   

                element.bind("load" , function(e){ 

                    // success, "onload" catched
                    // now we can do specific stuff:
                    scope.naturalHeight = element[0].naturalHeight;
                    scope.naturalWidth = element[0].naturalWidth;
                    // if(element[0].naturalHeight > element[0].naturalWidth){
                    //     element.addClass("vertical");
                    // }
                });

            }
        }
    })
    .controller('AppCtrl', function($rootScope, appLoading,$scope) {
        $scope.bgSrc = "img/bg2.jpg";
        $scope.getWidth = function () {
          return $(window).width();
        };
        $scope.$watch($scope.getWidth, function (newValue, oldValue) {
            /*调整图片的大小以适应*/
            var viewWidth = $(window).width();
            var viewHeight = $(window).height();
            if ($scope.naturalWidth / $scope.naturalHeight >= viewWidth / viewHeight) {
                $scope.myprop = function () {
                    return {
                        height : "auto",
                        width : (viewHeight * $scope.naturalWidth / $scope.naturalHeight) + "px",
                        marginLeft : -(viewHeight * $scope.naturalWidth / $scope.naturalHeight - viewWidth)/2 + "px"
                    };
                }
                // $scope.bgStyle = "height:auto;width:" + (viewHeight * $scope.naturalWidth / $scope.naturalHeight) + "px;margin-left:-"
                // + (viewHeight * $scope.naturalWidth / $scope.naturalHeight - $scope.naturalWidth)/2 + "px;";
            } else {
                $scope.myprop = function () {
                    return {
                        width : "auto",
                        height : (viewWidth * $scope.naturalHeight / $scope.naturalWidth) + "px",
                        marginTop : -(viewWidth * $scope.naturalHeight / $scope.naturalWidth - viewHeight)/2 + "px"
                    };
                }
            }
            // $scope.$apply();
        });
        $(window).on("resize",function () {
            if(!$scope.$$phase) {
              //$digest or $apply
              $scope.$apply();
            }
            
        });
        $rootScope.topScope = $rootScope;
        $rootScope.$on('$routeChangeStart', function() {
            appLoading.loading();
        });
    })
    .controller('PhotosCtrl', function ($scope) {
        $scope.show = false;

        $scope.showDisk = function () {
            $scope.show = true;
        };
    })
    .controller('WitnessCtrl', function ($scope) {
        $scope.inputText = "邀您来见证";
        $scope.validate = "success";
    })
    .controller('InvitationCtrl', function () {
        // body...
    })
  .controller('AppHomeCtrl', function($scope, appLoading) {
    appLoading.ready();
  })

  .controller('AppRepeatCtrl', function($scope, appTweets, $filter, appLoading) {
    $scope.tweets = [];
    var cache = [], filter = $filter('filter');
    $scope.filter = function(q) {
      $scope.tweets = filter(cache, q);
    };
    $scope.search = function(q) {
      appLoading.loading();
      $scope.s = q;
      if(q == false) {
        $scope.tweets = [];
      }
      else {
        appTweets(q, function(data) {
          cache = $scope.tweets = data;
          appLoading.ready();
        });
      }
      appLoading.ready();
    };
    $scope.search('angularjs');
  })

  .controller('AppShowHideCtrl', function($scope, appLoading) {
    function makeCell(number, type) {
      return { number: number, type: type};
    };
    $scope.headings = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    var days = [];
    days.push(makeCell(31,'outer'));
    for(var i=1;i<=30;i++) {
      days.push(makeCell(i,'inner'));
    }
    days.push(makeCell(1,'outer'));
    days.push(makeCell(2,'outer'));
    days.push(makeCell(3,'outer'));
    days.push(makeCell(4,'outer'));

    var rows = [];
    var r=0;
    for(var i=0, j=0;i<days.length;i++, j++) {
      if(j > 0 && j == 7) {
        j = 0;
        r++;
      }
      var day = days[i];
      rows[r] = rows[r] || {};
      rows[r].cells = rows[r].cells || [];
      day.weekday = $scope.headings[j];
      day.index = i;
      rows[r].cells.push(day);
    }
    $scope.rows = rows;

    $scope.q = 'all';
    $scope.isActive = function(cell) {
      var q = $scope.q.toString().toLowerCase();
      if(q.length > 0 && q == cell.index) {
        return true;
      }
      else if(q == 'all') {
        return true;
      }
      else if(q == 'weekends') {
        return cell.weekday == 'Sunday' || cell.weekday == 'Saturday';
      }
      else if(q == 'weekdays') {
        return !(cell.weekday == 'Sunday' || cell.weekday == 'Saturday');
      }
      else if(q == 'odd') {
        return cell.number % 2 == 1;
      }
      else if(q == 'even') {
        return cell.number % 2 == 0;
      }
      else {
        return q ? (cell.weekday.toLowerCase() == q || cell.number == q) : false;
      }
    };

    $scope.search = function(q) {
      $scope.q = q;
    };

    appLoading.ready();
  })

  .controller('AppSwitchCtrl', function($scope, appLoading) {
    appLoading.ready();
  })

  .controller('AppIncludeCtrl', function($scope, appLoading) {
    appLoading.ready();
  })
  .controller('NavCtrl', function ($scope, pageMapping) {
      // body...
      $scope.isShow = true;
      $scope.click = function (e) {
          // body...
          pageMapping.getDirection("wedding");
      }
  })
  .controller('FriendCtrl', function ($scope, appLoading, $document, pageMapping) {
    // body...
    appLoading.ready();
    angular.element($document).unbind('keyup').bind("keyup", function(event) {
        var map = ["one", "two", "three"];
        var length = map.length;
        if (event.which === 37) {
          $scope.myclass = "rtl";
            if ($.inArray($scope.wave, map) === 0) {
                $scope.wave = map[length - 1];
            } else {
              $scope.wave = map[$.inArray($scope.wave, map) - 1];
            }
            
        } else if (event.which === 39) {
          $scope.myclass = "ltr";
          if ($.inArray($scope.wave, map) === length - 1) {
                $scope.wave = map[0];
            } else {
              $scope.wave = map[$.inArray($scope.wave, map) + 1];
            }

        }
        $scope.$apply();
      });
  })
  .controller('BigCtrl', function ($scope, appLoading, $document, pageMapping) {
    // body...
    appLoading.ready();
    angular.element($document).unbind('keyup').bind("keyup", function(event) {
        var map = ["one", "two", "three"];
        var length = map.length;
        if (event.which === 37) {
          $scope.myclass = "rtl";
            if ($.inArray($scope.wave, map) === 0) {
                $scope.wave = map[length - 1];
            } else {
              $scope.wave = map[$.inArray($scope.wave, map) - 1];
            }
            
        } else if (event.which === 39) {
          $scope.myclass = "ltr";
          if ($.inArray($scope.wave, map) === length - 1) {
                $scope.wave = map[0];
            } else {
              $scope.wave = map[$.inArray($scope.wave, map) + 1];
            }

        }
        $scope.$apply();
      });
  })
  .config(function($routeProvider) {
    $routeProvider.when('/ng-repeat', {
      controller : 'AppRepeatCtrl',
      templateUrl : './templates/repeat_tpl.html'
    })
    .when('/ng-show-hide', {
      controller : 'AppShowHideCtrl',
      templateUrl : './templates/show_hide_tpl.html'
    })
    .when('/ng-switch', {
      controller : 'AppSwitchCtrl',
      templateUrl : './templates/switch_tpl.html'
    })
    .when('/friend',{
      controller : 'FriendCtrl',
      templateUrl : './templates/friend_tpl.html'
    })
    .when('/big',{
      controller : 'BigCtrl',
      templateUrl : './templates/big_tpl.html'
    })
    .when('/photos',{
      controller : 'PhotosCtrl',
      templateUrl : './templates/photos_tpl.html'
    })
    .when('/witness',{
      controller : 'WitnessCtrl',
      templateUrl : './templates/witness_tpl.html'
    })
    .when('/invitation',{
      controller : 'InvitationCtrl',
      templateUrl : './templates/invitation_tpl.html'
    })
    .otherwise({
      redirectTo: '/big'
    });
  })
  .factory('pageMapping', function ($rootScope, $routeParams, $route, $location) {
    // body...
    var pageMap = ['home', 'wedding', 'big', 'friend'];
    return {
        getIndex : function () {
          return $.inArray($location.$$path.replace(/^\//, ""), pageMap);
        },
        getDirection : function (targetPageName) {
            var index = this.getIndex();
            var targetIndex = $.inArray(targetPageName, pageMap);
            if (index === -1 || targetIndex === -1 || index == targetIndex) {
                return 0;
            }
            if (index > targetIndex) {
                return -1;
            }
            return 1;//targetIndex > index, move up
        }
    };
  })
  .factory('appLoading', function($rootScope) {
    var timer;
    return {
      loading : function() {
        clearTimeout(timer);
        $rootScope.status = 'loading';
        if(!$rootScope.$$phase) $rootScope.$apply();
      },
      ready : function(delay) {
        function ready() {
          $rootScope.status = 'ready';
          if(!$rootScope.$$phase) $rootScope.$apply();
        }

        clearTimeout(timer);
        delay = delay == null ? 500 : false;
        if(delay) {
          timer = setTimeout(ready, delay);
        }
        else {
          ready();
        }
      }
    };
  })

  .factory('appTweets', function($rootScope, $http, $q) {
    var searchToken = '{SEARCH}';
    var callbackToken = 'JSON_CALLBACK';
    var baseUrl = 'https://search.twitter.com/search.json?q=' + searchToken + '&callback=' + callbackToken;
    return function(q, fn) {
      var defer = $q.defer();
      var url = baseUrl.replace(searchToken, q);
      $http.jsonp(url).success(function(data) {
        fn(data.results);
      });
    }
  });
