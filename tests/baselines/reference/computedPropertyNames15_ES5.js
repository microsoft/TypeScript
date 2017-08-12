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
var C = (function () {
    function C() {
    }
    var proto_1 = C.prototype;
    proto_1[p1] = function () { };
    proto_1[p2] = function () { };
    proto_1[p3] = function () { };
    return C;
}());
