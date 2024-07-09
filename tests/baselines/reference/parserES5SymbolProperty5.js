//// [tests/cases/conformance/parser/ecmascript5/Symbols/parserES5SymbolProperty5.ts] ////

//// [parserES5SymbolProperty5.ts]
class C {
    [Symbol.isRegExp]: string;
}

//// [parserES5SymbolProperty5.js]
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
Symbol.isRegExp;
