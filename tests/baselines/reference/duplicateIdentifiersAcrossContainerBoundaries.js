//// [duplicateIdentifiersAcrossContainerBoundaries.js]
var M;
(function (M) {
    var I = (function () {
        function I() {
        }
        return I;
    })();
    M.I = I;
})(M || (M = {}));

var M;
(function (M) {
    function f() {
    }
    M.f = f;
})(M || (M = {}));
var M;
(function (M) {
    var f = (function () {
        function f() {
        }
        return f;
    })();
    M.f = f;
})(M || (M = {}));

var M;
(function (M) {
    function g() {
    }
})(M || (M = {}));
var M;
(function (M) {
    var g = (function () {
        function g() {
        }
        return g;
    })();
    M.g = g;
})(M || (M = {}));

var M;
(function (M) {
    var C = (function () {
        function C() {
        }
        return C;
    })();
    M.C = C;
})(M || (M = {}));
var M;
(function (M) {
    function C() {
    }
})(M || (M = {}));

var M;
(function (M) {
    M.v = 3;
})(M || (M = {}));
var M;
(function (M) {
    M.v = 3;
})(M || (M = {}));

var Foo = (function () {
    function Foo() {
    }
    return Foo;
})();

var Foo;
(function (Foo) {
    Foo.x;
})(Foo || (Foo = {}));

var N;
(function (N) {
    (function (F) {
        var t;
    })(N.F || (N.F = {}));
    var F = N.F;
})(N || (N = {}));
