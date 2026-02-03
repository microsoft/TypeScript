//// [tests/cases/conformance/es6/computedProperties/computedPropertyNames15_ES5.ts] ////

//// [computedPropertyNames15_ES5.ts]
var p1: number | string;
var p2: number | number[];
var p3: string | boolean;
class C {
    [p1]() { }
    [p2]() { }
    [p3]() { }
}

//// [computedPropertyNames15_ES5.js]
var p1;
var p2;
var p3;
var C = /** @class */ (function () {
    function C() {
    }
    C.prototype[p1] = function () { };
    C.prototype[p2] = function () { };
    C.prototype[p3] = function () { };
    return C;
}());
