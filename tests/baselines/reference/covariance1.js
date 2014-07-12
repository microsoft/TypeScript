//// [covariance1.js]
var M;
(function (M) {
    var XX = (function () {
        function XX(m1) {
            this.m1 = m1;
        }
        return XX;
    })();
    M.XX = XX;

    function f(y) {
    }
    M.f = f;

    var a;
    f({ x: a }); // ok

    var b;
    f({ x: b }); // ok covariant subtype
})(M || (M = {}));
