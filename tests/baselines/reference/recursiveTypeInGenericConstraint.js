//// [recursiveTypeInGenericConstraint.js]
var G = (function () {
    function G() {
    }
    return G;
})();

var Foo = (function () {
    function Foo() {
    }
    return Foo;
})();

var D = (function () {
    function D() {
    }
    return D;
})();

var c1 = new Foo(); // ok, circularity in assignment compat check causes success
