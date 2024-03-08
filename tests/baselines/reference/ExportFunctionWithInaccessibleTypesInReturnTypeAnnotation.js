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
    var Point = /** @class */ (function () {
        function Point() {
        }
        return Point;
    }());
    A.Point = Point;
    var Line = /** @class */ (function () {
        function Line(start, end) {
            this.start = start;
            this.end = end;
        }
        return Line;
    }());
    function fromOrigin(p) {
        return new Line({ x: 0, y: 0 }, p);
    }
    A.fromOrigin = fromOrigin;
})(A || (A = {}));
