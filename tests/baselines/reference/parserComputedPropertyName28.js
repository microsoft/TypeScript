//// [parserComputedPropertyName28.ts]
class C {
    [e]: number = 0;
    [e2]: number
}

//// [parserComputedPropertyName28.js]
var C = (function () {
    function C() {
        this[e] = 0;
    }
    return C;
})();
