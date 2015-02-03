//// [parserComputedPropertyName25.ts]
class C {
    // No ASI
    [e] = 0
    [e2] = 1
}

//// [parserComputedPropertyName25.js]
var C = (function () {
    function C() {
        // No ASI
        this[e] = 0[e2] = 1;
    }
    return C;
})();
