//// [enumAssignmentCompat2.js]
var W;
(function (W) {
    W[W["a"] = 0] = "a";
    W[W["b"] = 1] = "b";
    W[W["c"] = 2] = "c";
})(W || (W = {}));

var W;
(function (W) {
    var D = (function () {
        function D() {
        }
        return D;
    })();
    W.D = D;
})(W || (W = {}));

var x = W;
var y = W;
var z = W;
var a = 0 /* a */;
var b = 0 /* a */;
var c = 0 /* a */;
var d = 3;
var e = 4;
var f = 0 /* a */;
var g = 5;
var h = 3;
var i = 0 /* a */;
i = 0 /* a */;
W.D;
var p;
