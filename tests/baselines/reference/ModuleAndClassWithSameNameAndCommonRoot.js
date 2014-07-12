//// [module.js]
var X;
(function (X) {
    (function (Y) {
        (function (Point) {
            Point.Origin = new Point(0, 0);
        })(Y.Point || (Y.Point = {}));
        var Point = Y.Point;
    })(X.Y || (X.Y = {}));
    var Y = X.Y;
})(X || (X = {}));
//// [class.js]
var X;
(function (X) {
    (function (Y) {
        // duplicate identifier
        var Point = (function () {
            function Point(x, y) {
                this.x = x;
                this.y = y;
            }
            return Point;
        })();
        Y.Point = Point;
    })(X.Y || (X.Y = {}));
    var Y = X.Y;
})(X || (X = {}));
//// [simple.js]
var A;
(function (A) {
    A.Instance = new A();
})(A || (A = {}));

// duplicate identifier
var A = (function () {
    function A() {
    }
    return A;
})();
