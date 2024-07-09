//// [tests/cases/conformance/parser/ecmascript5/Symbols/parserES5SymbolIndexer2.ts] ////

//// [parserES5SymbolIndexer2.ts]
class C {
    [s: symbol]: string;
}

//// [parserES5SymbolIndexer2.js]
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
