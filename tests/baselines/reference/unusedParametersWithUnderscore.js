//// [tests/cases/compiler/unusedParametersWithUnderscore.ts] ////

//// [unusedParametersWithUnderscore.ts]
function f(a, _b, c, ___, d,e___, _f) {
}

// ok because of underscore prefix
function f2({_a, __b}) {
}

// error
function f2b({ a, b }) {
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
// ok because of underscore prefix
function f2(_c) {
    var _a = _c._a, __b = _c.__b;
}
// error
function f2b(_c) {
    var a = _c.a, b = _c.b;
}
function f3(_c) {
    var _a = _c[0], __b = _c[2];
}
function f4() {
    var arg = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        arg[_i] = arguments[_i];
    }
}
function f5() {
    var _arg = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        _arg[_i] = arguments[_i];
    }
}
function f6(arg, _arg) {
}
var f7 = function (_) { return undefined; };
var f8 = function (_) { };
