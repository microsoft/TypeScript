//// [tests/cases/conformance/es6/defaultParameters/emitDefaultParametersFunctionExpression.ts] ////

//// [emitDefaultParametersFunctionExpression.ts]
var lambda1 = (y = "hello") => { }
var lambda2 = (x: number, y = "hello") => { }
var lambda3 = (x: number, y = "hello", ...rest) => { }
var lambda4 = (y = "hello", ...rest) => { }

var x = function (str = "hello", ...rest) { }
var y = (function (num = 10, boo = false, ...rest) { })()
var z = (function (num: number, boo = false, ...rest) { })(10)


//// [emitDefaultParametersFunctionExpression.js]
var lambda1 = function (y) {
    if (y === void 0) { y = "hello"; }
};
var lambda2 = function (x, y) {
    if (y === void 0) { y = "hello"; }
};
var lambda3 = function (x, y) {
    if (y === void 0) { y = "hello"; }
    var rest = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        rest[_i - 2] = arguments[_i];
    }
};
var lambda4 = function (y) {
    if (y === void 0) { y = "hello"; }
    var rest = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        rest[_i - 1] = arguments[_i];
    }
};
var x = function (str) {
    if (str === void 0) { str = "hello"; }
    var rest = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        rest[_i - 1] = arguments[_i];
    }
};
var y = (function (num, boo) {
    if (num === void 0) { num = 10; }
    if (boo === void 0) { boo = false; }
    var rest = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        rest[_i - 2] = arguments[_i];
    }
})();
var z = (function (num, boo) {
    if (boo === void 0) { boo = false; }
    var rest = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        rest[_i - 2] = arguments[_i];
    }
})(10);
