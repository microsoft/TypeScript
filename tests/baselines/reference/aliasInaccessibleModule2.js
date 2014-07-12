//// [aliasInaccessibleModule2.js]
var M;
(function (M) {
    var N;
    (function (N) {
        var C = (function () {
            function C() {
            }
            return C;
        })();
    })(N || (N = {}));
    var R = N;
    var X = R;
    M.X = X;
})(M || (M = {}));
