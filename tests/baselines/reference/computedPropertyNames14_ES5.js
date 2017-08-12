//// [computedPropertyNames14_ES5.ts]
var b: boolean;
class C {
    [b]() {}
    static [true]() { }
    [[]]() { }
    static [{}]() { }
    [undefined]() { }
    static [null]() { }
}

//// [computedPropertyNames14_ES5.js]
var b;
var C = (function () {
    function C() {
    }
    var proto_1 = C.prototype;
    proto_1[b] = function () { };
    C[true] = function () { };
    proto_1[[]] = function () { };
    C[{}] = function () { };
    proto_1[undefined] = function () { };
    C[null] = function () { };
    return C;
}());
