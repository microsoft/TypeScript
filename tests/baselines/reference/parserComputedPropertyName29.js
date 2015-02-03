//// [parserComputedPropertyName29.ts]
class C {
    // yes ASI
    [e] = id++
    [e2]: number
}

//// [parserComputedPropertyName29.js]
var C = (function () {
    function C() {
        // yes ASI
        this[e] = id++;
    }
    return C;
})();
