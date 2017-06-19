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
