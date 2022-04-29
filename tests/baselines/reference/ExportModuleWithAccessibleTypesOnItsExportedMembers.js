//// [ExportModuleWithAccessibleTypesOnItsExportedMembers.ts]
module A {

    export class Point {
        constructor(public x: number, public y: number) { }
    }

    export module B {
        export var Origin: Point = new Point(0, 0);

        export class Line {
            constructor(start: Point, end: Point) {

            }

            static fromOrigin(p: Point) {
                return new Line({ x: 0, y: 0 }, p);
            }
        }
    }
}

//// [ExportModuleWithAccessibleTypesOnItsExportedMembers.js]
var A;
(function (A) {
    var Point = /** @class */ (function () {
        function Point(x, y) {
            this.x = x;
            this.y = y;
        }
        return Point;
    }());
    A.Point = Point;
    var B;
    (function (B) {
        B.Origin = new Point(0, 0);
        var Line = /** @class */ (function () {
            function Line(start, end) {
            }
            Line.fromOrigin = function (p) {
                return new Line({ x: 0, y: 0 }, p);
            };
            return Line;
        }());
        B.Line = Line;
    })(B = A.B || (A.B = {}));
})(A || (A = {}));
