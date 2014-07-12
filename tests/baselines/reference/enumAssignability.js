//// [enumAssignability.js]
// enums assignable to number, any, Object, errors unless otherwise noted
var E;
(function (E) {
    E[E["A"] = 0] = "A";
})(E || (E = {}));
var F;
(function (F) {
    F[F["B"] = 0] = "B";
})(F || (F = {}));

var e = 0 /* A */;
var f = 0 /* B */;

e = f;
f = e;
e = 1; // ok
f = 1; // ok
var x = e;
x = f; // ok

var Others;
(function (Others) {
    var a = e;

    var C = (function () {
        function C() {
        }
        return C;
    })();
    var ac;

    var ai;

    var b = e;
    var c = e;
    var d = e;
    var ee = e;
    var f = e;
    var g = e;
    var h = e;
    var i = e;
    var j = e;
    var k = e;
    var l = e;
    ac = e;
    ai = e;
    var m = e;
    var n = e;
    var o = e;
    var p = e;
    var q = e;

    function foo(x, y, z) {
        x = e;
        y = e;
        z = e;
        var a = e;
        var b = e;
    }
})(Others || (Others = {}));
