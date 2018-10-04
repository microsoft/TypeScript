//// [parserES5SymbolProperty6.ts]
class C {
    [Symbol.toStringTag]: string = "";
}

//// [parserES5SymbolProperty6.js]
var C = /** @class */ (function () {
    function C() {
        this[Symbol.toStringTag] = "";
    }
    return C;
}());
