//// [moduleProperty2.js]
var M;
(function (M) {
    function f() {
        var x;
    }
    var y;
    M.z;
    var test1 = x;
    var test2 = y;
})(M || (M = {}));

var N;
(function (N) {
    var test3 = M.y;
    var test4 = M.z;
})(N || (N = {}));
