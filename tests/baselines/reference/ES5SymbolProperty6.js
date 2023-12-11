//// [tests/cases/conformance/Symbols/ES5SymbolProperty6.ts] ////

//// [ES5SymbolProperty6.ts]
u//@target: ES5
class C {
    [Symbol.iterator]() { }
}

(new C)[Symbol.iterator]

//// [ES5SymbolProperty6.js]
u; //@target: ES5
var C = /** @class */ (function () {
    function C() {
    }
    C.prototype[Symbol.iterator] = function () { };
    return C;
}());
(new C)[Symbol.iterator];
