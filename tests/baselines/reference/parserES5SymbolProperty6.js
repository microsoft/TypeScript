//// [tests/cases/conformance/parser/ecmascript5/Symbols/parserES5SymbolProperty6.ts] ////

//// [parserES5SymbolProperty6.ts]
class C {
    [Symbol.toStringTag]: string = "";
}

//// [parserES5SymbolProperty6.js]
var _a;
var C = /** @class */ (function () {
    function C() {
        this[_a] = "";
    }
    return C;
}());
_a = Symbol.toStringTag;
