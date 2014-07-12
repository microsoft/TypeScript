//// [overloadresolutionWithConstraintCheckingDeferred.js]
var G = (function () {
    function G(x) {
    }
    return G;
})();

var result = foo(function (x) {
    return new G(x);
});

var result2 = foo(function (x) {
    return new G(x);
});

var result3 = foo(function (x) {
    var y;
    return y;
});
