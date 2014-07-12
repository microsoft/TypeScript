//// [function.js]
var A;
(function (A) {
    function Point() {
        return { x: 0, y: 0 };
    }
    A.Point = Point;
})(A || (A = {}));
//// [module.js]
var A;
(function (A) {
    (function (Point) {
        Point.Origin = { x: 0, y: 0 };
    })(A.Point || (A.Point = {}));
    var Point = A.Point;
})(A || (A = {}));
//// [test.js]
var fn;
var fn = A.Point;

var cl;
var cl = A.Point();
var cl = A.Point.Origin;
//// [simple.js]
var B;
(function (B) {
    function Point() {
        return { x: 0, y: 0 };
    }
    B.Point = Point;

    (function (Point) {
        Point.Origin = { x: 0, y: 0 };
    })(B.Point || (B.Point = {}));
    var Point = B.Point;
})(B || (B = {}));

var fn;
var fn = B.Point;

var cl;
var cl = B.Point();
var cl = B.Point.Origin;
