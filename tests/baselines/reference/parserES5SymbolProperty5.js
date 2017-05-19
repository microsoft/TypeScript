//// [parserES5SymbolProperty5.ts]
class C {
    [Symbol.isRegExp]: string;
}

//// [parserES5SymbolProperty5.js]
var C = (function () {
    function C() {
    }
    return C;
}());
