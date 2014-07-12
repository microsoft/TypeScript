//// [invalidInstantiatedModule.js]
var M;
(function (M) {
    var Point = (function () {
        function Point() {
        }
        return Point;
    })();
    M.Point = Point;
    M.Point = 1;
})(M || (M = {}));

var M2;
(function (M2) {
    M2.Point = 1;
})(M2 || (M2 = {}));

var m = M2;
var p;
