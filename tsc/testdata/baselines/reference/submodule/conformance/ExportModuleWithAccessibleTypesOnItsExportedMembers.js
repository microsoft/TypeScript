//// [tests/cases/conformance/internalModules/exportDeclarations/ExportModuleWithAccessibleTypesOnItsExportedMembers.ts] ////

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
    class Point {
        x;
        y;
        constructor(x, y) {
            this.x = x;
            this.y = y;
        }
    }
    A.Point = Point;
    let B;
    (function (B) {
        B.Origin = new Point(0, 0);
        class Line {
            constructor(start, end) {
            }
            static fromOrigin(p) {
                return new Line({ x: 0, y: 0 }, p);
            }
        }
        B.Line = Line;
    })(B = A.B || (A.B = {}));
})(A || (A = {}));
