//// [ES5SymbolProperty6.ts]
class C {
    [Symbol.iterator]() { }
}

(new C)[Symbol.iterator]

//// [ES5SymbolProperty6.js]
var C = (function () {
    function C() {
    }
    var proto_1 = C.prototype;
    proto_1[Symbol.iterator] = function () { };
    return C;
}());
(new C)[Symbol.iterator];
