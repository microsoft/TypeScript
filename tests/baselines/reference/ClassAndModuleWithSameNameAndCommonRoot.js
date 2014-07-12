//// [class.js]
var X;
(function (X) {
    (function (Y) {
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
//// [test.js]
//var cl: { x: number; y: number; }
var cl = new X.Y.Point(1, 1);
var cl = X.Y.Point.Origin;
//// [simple.js]
var A = (function () {
    function A() {
    }
    return A;
})();

var A;
(function (A) {
    A.Instance = new A();
})(A || (A = {}));

// ensure merging works as expected
var a = A.Instance;
var a = new A();
var a;
