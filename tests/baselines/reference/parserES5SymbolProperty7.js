//// [parserES5SymbolProperty7.ts]
class C {
    [Symbol.toStringTag](): void { }
}

//// [parserES5SymbolProperty7.js]
var C = (function () {
    function C() {
    }
    var proto_1 = C.prototype;
    proto_1[Symbol.toStringTag] = function () { };
    return C;
}());
