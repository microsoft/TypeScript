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
    class Point2d {
        x;
        y;
        constructor(x, y) {
            this.x = x;
            this.y = y;
        }
        fromOrigin(p) {
            return 1;
        }
    }
    A.Point2d = Point2d;
})(A || (A = {}));
