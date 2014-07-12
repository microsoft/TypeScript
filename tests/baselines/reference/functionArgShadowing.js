//// [functionArgShadowing.js]
var A = (function () {
    function A() {
    }
    A.prototype.foo = function () {
    };
    return A;
})();
var B = (function () {
    function B() {
    }
    B.prototype.bar = function () {
    };
    return B;
})();
function foo(x) {
    var x = new B();
    x.bar(); // the property bar does not exist on a value of type A
}

var C = (function () {
    function C(p) {
        this.p = p;
        var p;

        var n = p;
    }
    return C;
})();
