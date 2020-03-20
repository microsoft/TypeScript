//// [unusedParametersWithUnderscore.ts]
function f(a, _b, c, ___, d,e___, _f) {
}


function f2({_a, __b}) {
}

function f3([_a, ,__b]) {
}

function f4(...arg) {
}

function f5(..._arg) {
}

function f6(arg?, _arg?) {
}

var f7 = _ => undefined;

var f8 = function (_) { };

//// [unusedParametersWithUnderscore.js]
function f(a, _b, c, ___, d, e___, _f) {
}
function f2(_c) {
    var _a = _c._a, __b = _c.__b;
}
function f3(_d) {
    var _a = _d[0], __b = _d[2];
}
function f4() {
    var arg = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        arg[_i] = arguments[_i];
    }
}
function f5() {
    var _arg = [];
    for (var _e = 0; _e < arguments.length; _e++) {
        _arg[_e] = arguments[_e];
    }
}
function f6(arg, _arg) {
}
var f7 = function (_) { return undefined; };
var f8 = function (_) { };
