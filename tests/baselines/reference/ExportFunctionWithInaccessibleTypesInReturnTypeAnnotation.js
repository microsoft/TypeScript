//// [tests/cases/conformance/internalModules/exportDeclarations/ExportFunctionWithInaccessibleTypesInReturnTypeAnnotation.ts] ////

//// [ExportFunctionWithInaccessibleTypesInReturnTypeAnnotation.ts]
module A {

    export class Point {
        x: number;
        y: number;
    }

    class Line {
        constructor(public start: Point, public end: Point) { }
    }

    export function fromOrigin(p: Point): Line {
        return new Line({ x: 0, y: 0 }, p);
    }
}

//// [ExportFunctionWithInaccessibleTypesInReturnTypeAnnotation.js]
var A;
(function (A) {
    class Point {
        x;
        y;
    }
    A.Point = Point;
    class Line {
        start;
        end;
        constructor(start, end) {
            this.start = start;
            this.end = end;
        }
    }
    function fromOrigin(p) {
        return new Line({ x: 0, y: 0 }, p);
    }
    A.fromOrigin = fromOrigin;
})(A || (A = {}));
