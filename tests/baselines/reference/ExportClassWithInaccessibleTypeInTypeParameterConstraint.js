//// [ExportClassWithInaccessibleTypeInTypeParameterConstraint.js]
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var A;
(function (A) {
    var Point = (function () {
        function Point() {
        }
        return Point;
    })();

    A.Origin = { x: 0, y: 0 };

    var Point3d = (function (_super) {
        __extends(Point3d, _super);
        function Point3d() {
            _super.apply(this, arguments);
        }
        return Point3d;
    })(Point);
    A.Point3d = Point3d;

    A.Origin3d = { x: 0, y: 0, z: 0 };

    var Line = (function () {
        function Line(start, end) {
            this.start = start;
            this.end = end;
        }
        Line.fromorigin2d = function (p) {
            return null;
        };
        return Line;
    })();
    A.Line = Line;
})(A || (A = {}));
