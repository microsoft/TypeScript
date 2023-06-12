//// [tests/cases/conformance/es6/defaultParameters/emitDefaultParametersFunction.ts] ////

//// [emitDefaultParametersFunction.ts]
function foo(x: string, y = 10) { }
function baz(x: string, y = 5, ...rest) { }
function bar(y = 10) { }
function bar1(y = 10, ...rest) { }

//// [emitDefaultParametersFunction.js]
function foo(x, y) {
    if (y === void 0) { y = 10; }
}
function baz(x, y) {
    if (y === void 0) { y = 5; }
    var rest = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        rest[_i - 2] = arguments[_i];
    }
}
function bar(y) {
    if (y === void 0) { y = 10; }
}
function bar1(y) {
    if (y === void 0) { y = 10; }
    var rest = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        rest[_i - 1] = arguments[_i];
    }
}
