//// [staticIndexer.ts]
class C {
    static [s: string]: number;
}

//// [staticIndexer.js]
var C = (function () {
    function C() {
    }
    return C;
}());
