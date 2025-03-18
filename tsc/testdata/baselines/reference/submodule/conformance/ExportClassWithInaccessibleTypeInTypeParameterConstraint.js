//// [tests/cases/conformance/internalModules/exportDeclarations/ExportClassWithInaccessibleTypeInTypeParameterConstraint.ts] ////

//// [ExportClassWithInaccessibleTypeInTypeParameterConstraint.ts]
module A {

    class Point {
        x: number;
        y: number;
    }

    export var Origin: Point = { x: 0, y: 0 };

    export class Point3d extends Point {
        z: number;
    }

    export var Origin3d: Point3d = { x: 0, y: 0, z: 0 };

    export class Line<TPoint extends Point>{
        constructor(public start: TPoint, public end: TPoint) { }

        static fromorigin2d(p: Point): Line<Point>{
            return null;
        }
    }
}


//// [ExportClassWithInaccessibleTypeInTypeParameterConstraint.js]
var A;
(function (A) {
    class Point {
        x;
        y;
    }
    A.Origin = { x: 0, y: 0 };
    class Point3d extends Point {
        z;
    }
    A.Point3d = Point3d;
    A.Origin3d = { x: 0, y: 0, z: 0 };
    class Line {
        start;
        end;
        constructor(start, end) {
            this.start = start;
            this.end = end;
        }
        static fromorigin2d(p) {
            return null;
        }
    }
    A.Line = Line;
})(A || (A = {}));
