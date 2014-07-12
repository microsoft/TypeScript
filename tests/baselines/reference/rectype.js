//// [rectype.js]
var M;
(function (M) {
    function f(p) {
        return f;
    }
    M.f = f;
    ;

    var i;

    f(i);
    f(f(i));
    f((f(f(i))));
})(M || (M = {}));
