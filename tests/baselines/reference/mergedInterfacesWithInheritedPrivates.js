//// [mergedInterfacesWithInheritedPrivates.js]
var C = (function () {
    function C() {
    }
    return C;
})();

var D = (function () {
    function D() {
    }
    return D;
})();

var E = (function () {
    function E() {
    }
    return E;
})();

var a;
var r = a.x; // error
