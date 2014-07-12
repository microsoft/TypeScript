//// [missingTypeArguments2.js]
var A = (function () {
    function A() {
    }
    return A;
})();

var x;
(function (a) {
});
var y;
(function () {
    return null;
});
