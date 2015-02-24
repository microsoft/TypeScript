//// [parserSymbolIndexer3.ts]
class C {
    static [s: symbol]: string;
}

//// [parserSymbolIndexer3.js]
var C = (function () {
    function C() {
    }
    return C;
})();
