//// [mergedInterfacesWithMultipleBases4.js]
// merged interfaces behave as if all extends clauses from each declaration are merged together
var C = (function () {
    function C() {
    }
    return C;
})();

var C2 = (function () {
    function C2() {
    }
    return C2;
})();

var C3 = (function () {
    function C3() {
    }
    return C3;
})();

var C4 = (function () {
    function C4() {
    }
    return C4;
})();

var D = (function () {
    function D() {
    }
    return D;
})();
