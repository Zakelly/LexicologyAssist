var lexicologyApp = angular.module('lexicology', ["mobile-angular-ui"]);
var noWords = "没有词根了哦";
var startingReview = "开始复习";

lexicologyApp.controller('WordCtrl', function ($scope) {
    $scope.morpheme = {};
    $scope.nowIndex = -1;
    $scope.next = "无";
    $scope.show_message = true;

    init([1]);

    if (haveOne()) {
        pickOne($scope);
    }
    else {
        message($scope, noWords);
    }

    $scope.passOne = function () {
        if (haveOne())
            pickOne($scope);
        else {
            startReview();
            if (haveOne())
                message($scope, startingReview);
            else
                message($scope, noWords);
        }
    };

    $scope.skipOne = function () {
        reviewList.push($scope.nowIndex);
        $scope.passOne();
    }

    $scope.continue = function () {
        if (haveOne()) {
            pickOne($scope);
        }
        else {
            alert("go home");
        }
    }
});

function init(list) {
    workingList = [];
    for (var i in list) {
        for (var j = morphemesIndex[list[i]]; j < morphemesIndex[list[i] + 1]; j++) {
            workingList.push(j);
        }
    }
}


function startReview() {
    workingList = reviewList;
    reviewList = [];
}

function haveOne() {
    console.log(workingList.length);
    return (workingList.length > 0);
}

function pickOne($scope) {
    var index = workingList.shift();
    $scope.morpheme = morphemes[index];
    $scope.nowIndex = index;
    if (workingList.length > 0) {
        $scope.next = morphemes[workingList[0]].name;
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
