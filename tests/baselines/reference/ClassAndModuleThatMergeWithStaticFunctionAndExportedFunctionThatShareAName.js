//// [ClassAndModuleThatMergeWithStaticFunctionAndExportedFunctionThatShareAName.js]
var Point = (function () {
    function Point(x, y) {
        this.x = x;
        this.y = y;
    }
    Point.Origin = function () {
        return { x: 0, y: 0 };
    };
    return Point;
})();

var Point;
(function (Point) {
    function Origin() {
        return null;
    }
    Point.Origin = Origin;
})(Point || (Point = {}));

var A;
(function (A) {
    var Point = (function () {
        function Point(x, y) {
            this.x = x;
            this.y = y;
        }
        Point.Origin = function () {
            return { x: 0, y: 0 };
        };
        return Point;
    })();
    A.Point = Point;

    (function (Point) {
        function Origin() {
            return "";
        }
        Point.Origin = Origin;
    })(A.Point || (A.Point = {}));
    var Point = A.Point;
})(A || (A = {}));
