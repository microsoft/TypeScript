//// [parserSymbolProperty6.ts]
class C {
    [Symbol.toStringTag]: string = "";
}

//// [parserSymbolProperty6.js]
var C = (function () {
    function C() {
        this[Symbol.toStringTag] = "";
    }
    return C;
})();
