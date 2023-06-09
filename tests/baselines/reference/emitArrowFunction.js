//// [tests/cases/conformance/es6/arrowFunction/emitArrowFunction.ts] ////

//// [emitArrowFunction.ts]
var f1 = () => { }
var f2 = (x: string, y: string) => { }
var f3 = (x: string, y: number, ...rest) => { }
var f4 = (x: string, y: number, z = 10) => { }
function foo(func: () => boolean) { }
foo(() => true);
foo(() => { return false; });

//// [emitArrowFunction.js]
var f1 = function () { };
var f2 = function (x, y) { };
var f3 = function (x, y) {
    var rest = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        rest[_i - 2] = arguments[_i];
    }
};
var f4 = function (x, y, z) {
    if (z === void 0) { z = 10; }
};
function foo(func) { }
foo(function () { return true; });
foo(function () { return false; });
