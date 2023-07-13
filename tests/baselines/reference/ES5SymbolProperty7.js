//// [tests/cases/conformance/Symbols/ES5SymbolProperty7.ts] ////

//// [ES5SymbolProperty7.ts]
var Symbol: { iterator: any };

class C {
    [Symbol.iterator]() { }
}

(new C)[Symbol.iterator]

//// [ES5SymbolProperty7.js]
var Symbol;
var C = /** @class */ (function () {
    function C() {
    }
    C.prototype[Symbol.iterator] = function () { };
    return C;
}());
(new C)[Symbol.iterator];
