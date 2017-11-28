//// [emitRestParametersFunctionExpression.ts]
var funcExp = (...rest) => { rest; }
var funcExp1 = (X: number, ...rest) => { rest; }
var funcExp2 = function (...rest) { rest; }
var funcExp3 = (function (...rest) { rest; })()
var funcExp4 = (...rest) => rest;


//// [emitRestParametersFunctionExpression.js]
var funcExp = function () {
    var rest = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        rest[_i] = arguments[_i];
    }
    rest;
};
var funcExp1 = function (X) {
    var rest = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        rest[_i - 1] = arguments[_i];
    }
    rest;
};
var funcExp2 = function () {
    var rest = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        rest[_i] = arguments[_i];
    }
    rest;
};
var funcExp3 = (function () {
    var rest = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        rest[_i] = arguments[_i];
    }
    rest;
})();
var funcExp4 = function () {
    var rest = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        rest[_i] = arguments[_i];
    }
    return rest;
};
