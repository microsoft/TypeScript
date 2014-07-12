//// [genericsWithoutTypeParameters1.js]
var C = (function () {
    function C() {
    }
    C.prototype.foo = function () {
        return null;
    };
    return C;
})();

var c1;
var i1;
var c2;
var i2;

function foo(x, y) {
}
function foo2(x, y) {
}

var x = { a: new C() };
var x2 = { a: { bar: function () {
            return 1;
        } } };

var D = (function () {
    function D() {
    }
    return D;
})();

var A = (function () {
    function A() {
    }
    return A;
})();
function f(x) {
    return null;
}
