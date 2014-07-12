//// [ExportClassWithInaccessibleTypeInIndexerTypeAnnotations.js]
var A;
(function (A) {
    var Point = (function () {
        function Point() {
        }
        return Point;
    })();

    var points = (function () {
        function points() {
        }
        return points;
    })();
    A.points = points;
})(A || (A = {}));
