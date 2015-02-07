//// [computedPropertyNames14.ts]
var b: boolean;
class C {
    [b]() {}
    static [true]() { }
    [[]]() { }
    static [{}]() { }
    [undefined]() { }
    static [null]() { }
}

//// [computedPropertyNames14.js]
var b;
var C = (function () {
    function C() {
    }
    C.prototype[b] = function () { };
    C[true] = function () { };
    C.prototype[[]] = function () { };
    C[{}] = function () { };
    C.prototype[undefined] = function () { };
    C[null] = function () { };
    return C;
})();
