//// [ExportClassWhichExtendsInterfaceWithInaccessibleType.js]
var A;
(function (A) {
    var Point2d = (function () {
        function Point2d(x, y) {
            this.x = x;
            this.y = y;
        }
        Point2d.prototype.fromOrigin = function (p) {
            return 1;
        };
        return Point2d;
    })();
    A.Point2d = Point2d;
})(A || (A = {}));
