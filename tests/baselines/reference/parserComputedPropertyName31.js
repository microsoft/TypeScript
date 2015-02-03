//// [parserComputedPropertyName31.ts]
class C {
    // yes ASI
    [e]: number
    [e2]: number
}

//// [parserComputedPropertyName31.js]
var C = (function () {
    function C() {
    }
    return C;
})();
