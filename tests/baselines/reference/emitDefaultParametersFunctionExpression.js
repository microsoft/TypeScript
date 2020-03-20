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
    for (var _a = 1; _a < arguments.length; _a++) {
        rest[_a - 1] = arguments[_a];
    }
};
var x = function (str) {
    if (str === void 0) { str = "hello"; }
    var rest = [];
    for (var _b = 1; _b < arguments.length; _b++) {
        rest[_b - 1] = arguments[_b];
    }
};
var y = (function (num, boo) {
    if (num === void 0) { num = 10; }
    if (boo === void 0) { boo = false; }
    var rest = [];
    for (var _c = 2; _c < arguments.length; _c++) {
        rest[_c - 2] = arguments[_c];
    }
})();
var z = (function (num, boo) {
    if (boo === void 0) { boo = false; }
    var rest = [];
    for (var _d = 2; _d < arguments.length; _d++) {
        rest[_d - 2] = arguments[_d];
    }
})(10);
