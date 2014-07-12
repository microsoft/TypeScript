//// [ClassAndModuleThatMergeWithStaticVariableAndExportedVarThatShareAName.js]
var Point = (function () {
    function Point(x, y) {
        this.x = x;
        this.y = y;
    }
    Point.Origin = { x: 0, y: 0 };
    return Point;
})();

var Point;
(function (Point) {
    Point.Origin = "";
})(Point || (Point = {}));

var A;
(function (A) {
    var Point = (function () {
        function Point(x, y) {
            this.x = x;
            this.y = y;
        }
        Point.Origin = { x: 0, y: 0 };
        return Point;
    })();
    A.Point = Point;

    (function (Point) {
        Point.Origin = "";
    })(A.Point || (A.Point = {}));
    var Point = A.Point;
})(A || (A = {}));
