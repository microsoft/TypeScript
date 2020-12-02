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
var C = /** @class */ (function () {
    function C() {
    }
    var C_prototype = C.prototype;
    C_prototype[b] = function () { };
    C[true] = function () { };
    C_prototype[[]] = function () { };
    C[{}] = function () { };
    C_prototype[undefined] = function () { };
    C[null] = function () { };
    return C;
}());
