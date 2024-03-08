//// [tests/cases/conformance/internalModules/exportDeclarations/ExportClassWhichExtendsInterfaceWithInaccessibleType.ts] ////

//// [ExportClassWhichExtendsInterfaceWithInaccessibleType.ts]
module A {

    interface Point {
        x: number;
        y: number;

        fromOrigin(p: Point): number;
    }

    export class Point2d implements Point {
        constructor(public x: number, public y: number) { }

        fromOrigin(p: Point) {
            return 1;
        }
    }
}



//// [ExportClassWhichExtendsInterfaceWithInaccessibleType.js]
var A;
(function (A) {
    var Point2d = /** @class */ (function () {
        function Point2d(x, y) {
            this.x = x;
            this.y = y;
        }
        Point2d.prototype.fromOrigin = function (p) {
            return 1;
        };
        return Point2d;
    }());
    A.Point2d = Point2d;
})(A || (A = {}));
