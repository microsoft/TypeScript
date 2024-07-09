//// [tests/cases/conformance/parser/ecmascript5/Symbols/parserES5SymbolProperty7.ts] ////

//// [parserES5SymbolProperty7.ts]
class C {
    [Symbol.toStringTag](): void { }
}

//// [parserES5SymbolProperty7.js]
var C = /** @class */ (function () {
    function C() {
    }
    C.prototype[Symbol.toStringTag] = function () { };
    return C;
}());
