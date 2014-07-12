//// [collisionRestParameterArrowFunctions.js]
var f1 = function (_i) {
    var restParameters = [];
    for (var _i = 0; _i < (arguments.length - 1); _i++) {
        restParameters[_i] = arguments[_i + 1];
    }
    var _i = 10;
};
var f1NoError = function (_i) {
    var _i = 10;
};

var f2 = function () {
    var restParameters = [];
    for (var _i = 0; _i < (arguments.length - 0); _i++) {
        restParameters[_i] = arguments[_i + 0];
    }
    var _i = 10;
};
var f2NoError = function () {
    var _i = 10;
};
