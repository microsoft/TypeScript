//// [collisionArgumentsArrowFunctions.js]
var f1 = function (i) {
    var arguments = [];
    for (var _i = 0; _i < (arguments.length - 1); _i++) {
        arguments[_i] = arguments[_i + 1];
    }
    var arguments;
};
var f12 = function (arguments) {
    var rest = [];
    for (var _i = 0; _i < (arguments.length - 1); _i++) {
        rest[_i] = arguments[_i + 1];
    }
    var arguments = 10;
};
var f1NoError = function (arguments) {
    var arguments = 10;
};

var f2 = function () {
    var restParameters = [];
    for (var _i = 0; _i < (arguments.length - 0); _i++) {
        restParameters[_i] = arguments[_i + 0];
    }
    var arguments = 10;
};
var f2NoError = function () {
    var arguments = 10;
};
