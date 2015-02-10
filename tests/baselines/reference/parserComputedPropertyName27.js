//// [parserComputedPropertyName27.ts]
class C {
    // No ASI
    [e]: number = 0
    [e2]: number
}

//// [parserComputedPropertyName27.js]
var C = (function () {
    function C() {
        // No ASI
        this[e] = 0[e2];
    }
    return C;
})();
