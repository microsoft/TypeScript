//// [emitRestParametersFunctionExpression.ts]
var funcExp = (...rest) => { }
var funcExp1 = (X: number, ...rest) => { }
var funcExp2 = function (...rest) { }
var funcExp3 = (function (...rest) { })()


//// [emitRestParametersFunctionExpression.js]
var funcExp = function () {
    var rest = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        rest[_i] = arguments[_i];
    }
};
var funcExp1 = function (X) {
    var rest = [];
    for (var _a = 1; _a < arguments.length; _a++) {
        rest[_a - 1] = arguments[_a];
    }
};
var funcExp2 = function () {
    var rest = [];
    for (var _b = 0; _b < arguments.length; _b++) {
        rest[_b] = arguments[_b];
    }
};
var funcExp3 = (function () {
    var rest = [];
    for (var _c = 0; _c < arguments.length; _c++) {
        rest[_c] = arguments[_c];
    }
})();
