//// [unusedParametersInOrder.ts]

function f(a, b, c) {
    return b;
}

function f2({a, b, c}) {
    return b;
}

function f3([a, ,b, c]) {
    return b;
}

function f4(a, b, ...arg) {
    return b;
}

function f5(a, b, ...arg) {
    return arg;
}

function f6(a?, b?, c?) {
    return b;
}

var f7 = (a, b, c) => b;

var f8 = function (a, b, c) {
    return b;
};

//// [unusedParametersInOrder.js]
function f(a, b, c) {
    return b;
}
function f2(_a) {
    var a = _a.a, b = _a.b, c = _a.c;
    return b;
}
function f3(_a) {
    var a = _a[0], b = _a[2], c = _a[3];
    return b;
}
function f4(a, b) {
    var arg = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        arg[_i - 2] = arguments[_i];
    }
    return b;
}
function f5(a, b) {
    var arg = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        arg[_i - 2] = arguments[_i];
    }
    return arg;
}
function f6(a, b, c) {
    return b;
}
var f7 = function (a, b, c) { return b; };
var f8 = function (a, b, c) {
    return b;
};
