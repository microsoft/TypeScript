//// [parserSymbolProperty7.ts]
class C {
    [Symbol.toStringTag](): void { }
}

//// [parserSymbolProperty7.js]
var C = (function () {
    function C() {
    }
    C.prototype[Symbol.toStringTag] = function () {
    };
    return C;
})();
