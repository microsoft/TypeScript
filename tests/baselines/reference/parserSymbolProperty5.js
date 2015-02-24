//// [parserSymbolProperty5.ts]
class C {
    [Symbol.isRegExp]: string;
}

//// [parserSymbolProperty5.js]
var C = (function () {
    function C() {
    }
    return C;
})();
