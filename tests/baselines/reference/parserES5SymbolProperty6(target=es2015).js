//// [tests/cases/conformance/parser/ecmascript5/Symbols/parserES5SymbolProperty6.ts] ////

//// [parserES5SymbolProperty6.ts]
class C {
    [Symbol.toStringTag]: string = "";
}

//// [parserES5SymbolProperty6.js]
var _a;
class C {
    constructor() {
        this[_a] = "";
    }
}
_a = Symbol.toStringTag;
