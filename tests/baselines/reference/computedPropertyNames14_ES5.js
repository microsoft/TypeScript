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
    C.prototype[b] = function () { };
    C[true] = function () { };
    C.prototype[[]] = function () { };
    C[{}] = function () { };
    C.prototype[undefined] = function () { };
    C[null] = function () { };
    return C;
}());
