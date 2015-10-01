var lexicologyApp = angular.module('lexicology', ["mobile-angular-ui",'ngRoute'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.
            when('/main', {templateUrl: 'main.html',   controller: MainCtrl}).
            when('/select', {templateUrl: 'toc.html', controller: SelectCtrl}).
            when('/word', {templateUrl: 'word.html', controller: WordCtrl}).
            otherwise({redirectTo: '/main'});
    }]);

var noWords = "没有词了哦";
var startingReview = "开始复习";

var selectAlphabet = [];
var isReviewing = false;
var fromMain = false;

function WordCtrl($scope, $routeParams, $location) {
    $scope.morpheme = {name:"",explanation:"",examples:[]};
    $scope.nowIndex = -1;
    $scope.next = "无";
    $scope.show_message = true;


    if (!fromMain) {
        getStorage();
        isReviewing = lastIsReviewing;
    }
    else {
        lastIsReviewing = isReviewing;
        saveStorage();
    }

    if (haveOne()) {
        pickOne($scope);
    }
    else {
        getStorage();
        if (haveOne()) {
            pickOne($scope);
        }
        else {
            message($scope, noWords);
        }
    }

    $scope.passOne = function () {
        if (haveOne())
            pickOne($scope);
        else {
            if (isReviewing)
                message($scope, noWords);
            else {
                startReview();
                if (haveOne())
                    message($scope, startingReview);
                else
                    message($scope, noWords);
            }
        }
    };

    $scope.skipOne = function () {
        reviewList.push($scope.nowIndex);
        $scope.passOne();
    };

    $scope.continue = function () {
        if (haveOne()) {
            pickOne($scope);
        }
        else {
            stopReview();
            saveStorage();
            $location.path('/main');
        }
    };

    $scope.return = function () {
        stopReview();
        $location.path('/main');
    };
}

function init(list) {
    workingList = [];
    for (var i in list) {
        for (var j = morphemesIndex[list[i]].start; j < morphemesIndex[list[i]].end; j++) {
            workingList.push(j);
        }
    }
}


function startReview() {
    lastIsReviewing = isReviewing = true;
    saveStorage();
}

function stopReview() {
    lastIsReviewing = isReviewing = false;
    saveStorage();
}

function haveOne() {
    if (!isReviewing) {
        return (workingList.length > 0);
    }
    else {
        return (reviewList.length > 0);
    }
}

function pickOne($scope) {
    saveStorage();
    var index;
    var list;
    if (!isReviewing) {
        index = workingList.shift();
        list = workingList;
    }
    else {
        index = reviewList.shift();
        list = reviewList;
    }
    $scope.morpheme = morphemes[index];
    $scope.nowIndex = index;
    if (list.length > 0) {
        $scope.next = morphemes[list[0]].name;
    }
    else {
        $scope.next = "无";
    }
    $scope.show_message = false;
}

function message($scope, msg) {
    $scope.message = msg;
    $scope.show_message = true;
}



function MainCtrl($scope, $routeParams, $location) {
    isReviewing = false;
    fromMain = true;
    $scope.new = function () {
        $location.path('/select');
    };
    $scope.old = function () {
        getStorage();
        if (workingList && workingList.length > 0)
            $location.path('/word');
        else
            alert("Sorry,未检测到您上次使用的信息.");
    };
    $scope.review = function () {
        getStorage();
        if (reviewList && reviewList.length > 0) {
            isReviewing = true;
            $location.path('/word');
        }
        else
            alert("生词本为空.");
    };
}

function SelectCtrl($scope, $routeParams, $location) {
    fromMain = true;
    var alphabet = [];
    for (var i = 0; i < morphemesIndex.length; i++) {
        var obj = {idx:i,name:morphemesIndex[i].name,select:false};
        alphabet.push(obj);
    }
    $scope.alphabet = alphabet;

    $scope.return = function () {
        $location.path('/main');
    };
    $scope.switch = function () {
        for(var i in $scope.alphabet) {
            $scope.alphabet[i].select = !$scope.alphabet[i].select;
        }
    };
    $scope.next = function () {
        selectAlphabet = [];
        for(var i in $scope.alphabet) {
            if ($scope.alphabet[i].select)
                selectAlphabet.push(Number($scope.alphabet[i].idx));
        }
        if (selectAlphabet.length > 0) {
            init(selectAlphabet);
            $location.path('/word');
        }
        else {
            alert("请选择后重试");
        }
    };
}