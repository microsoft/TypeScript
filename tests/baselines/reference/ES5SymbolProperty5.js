//// [ES5SymbolProperty5.ts]
var Symbol: { iterator: symbol };

class C {
    [Symbol.iterator]() { }
}

(new C)[Symbol.iterator](0) // Should error

//// [ES5SymbolProperty5.js]
var Symbol;
var C = (function () {
    function C() {
    }
    C.prototype[Symbol.iterator] = function () { };
    return C;
}());
(new C)[Symbol.iterator](0); // Should error
