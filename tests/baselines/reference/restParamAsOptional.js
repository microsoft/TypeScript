//// [restParamAsOptional.ts]
function f(...x?) { }
function f2(...x = []) { }

//// [restParamAsOptional.js]
function f() {
    var x = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        x[_i] = arguments[_i];
    }
}
function f2() {
    var x = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        x[_i] = arguments[_i];
    }
}
