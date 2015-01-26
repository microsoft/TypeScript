//// [parserSymbolIndexer2.ts]
class C {
    [s: Symbol]: string;
}

//// [parserSymbolIndexer2.js]
var C = (function () {
    function C() {
    }
    return C;
})();
