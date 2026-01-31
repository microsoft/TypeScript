//// [tests/cases/conformance/Symbols/ES5SymbolProperty3.ts] ////

//// [ES5SymbolProperty3.ts]
var Symbol: any;

class C {
    [Symbol.iterator]() { }
}

(new C)[Symbol.iterator]

//// [ES5SymbolProperty3.js]
var Symbol;
var C = /** @class */ (function () {
    function C() {
    }
    C.prototype[Symbol.iterator] = function () { };
    return C;
}());
(new C)[Symbol.iterator];
