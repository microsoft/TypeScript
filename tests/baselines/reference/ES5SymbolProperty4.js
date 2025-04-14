//// [tests/cases/conformance/Symbols/ES5SymbolProperty4.ts] ////

//// [ES5SymbolProperty4.ts]
var Symbol: { iterator: string };

class C {
    [Symbol.iterator]() { }
}

(new C)[Symbol.iterator]

//// [ES5SymbolProperty4.js]
var Symbol;
var C = /** @class */ (function () {
    function C() {
    }
    C.prototype[Symbol.iterator] = function () { };
    return C;
}());
(new C)[Symbol.iterator];
