//// [shadowedInternalModule.js]
// all errors imported modules conflict with local variables
var A;
(function (A) {
    A.Point = { x: 0, y: 0 };
})(A || (A = {}));

var B;
(function (B) {
    var A = { x: 0, y: 0 };
})(B || (B = {}));

var X;
(function (X) {
    var Y = (function () {
        function Y() {
        }
        return Y;
    })();
    X.Y = Y;
})(X || (X = {}));

var Z;
(function (Z) {
    var Y = 12;
})(Z || (Z = {}));
