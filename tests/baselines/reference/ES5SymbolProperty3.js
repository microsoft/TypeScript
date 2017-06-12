//// [ES5SymbolProperty3.ts]
var Symbol: any;

class C {
    [Symbol.iterator]() { }
}

(new C)[Symbol.iterator]

//// [ES5SymbolProperty3.js]
var Symbol;
var C = (function () {
    function C() {
    }
    var proto_1 = C.prototype;
    proto_1[Symbol.iterator] = function () { };
    return C;
}());
(new C)[Symbol.iterator];
