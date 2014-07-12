//// [memberFunctionsWithPrivateOverloads.js]
var C = (function () {
    function C() {
    }
    C.prototype.foo = function (x, y) {
    };

    C.prototype.bar = function (x, y) {
    };

    C.foo = function (x, y) {
    };

    C.bar = function (x, y) {
    };
    return C;
})();

var D = (function () {
    function D() {
    }
    D.prototype.foo = function (x, y) {
    };

    D.prototype.bar = function (x, y) {
    };

    D.foo = function (x, y) {
    };

    D.bar = function (x, y) {
    };
    return D;
})();

var c;
var r = c.foo(1);

var d;
var r2 = d.foo(2);

var r3 = C.foo(1);
var r4 = D.bar(''); // error
