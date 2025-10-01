//// [tests/cases/conformance/internalModules/exportDeclarations/ExportFunctionWithInaccessibleTypesInParameterTypeAnnotation.ts] ////

//// [ExportFunctionWithInaccessibleTypesInParameterTypeAnnotation.ts]
namespace A {

    class Point {
        x: number;
        y: number;
    }

    export class Line {
        constructor(public start: Point, public end: Point) { }
    }

    export function fromOrigin(p: Point): Line {
        return new Line({ x: 0, y: 0 }, p);
    }
}

//// [ExportFunctionWithInaccessibleTypesInParameterTypeAnnotation.js]
var A;
(function (A) {
    var Point = /** @class */ (function () {
        function Point() {
        }
        return Point;
    }());
    var Line = /** @class */ (function () {
        function Line(start, end) {
            this.start = start;
            this.end = end;
        }
        return Line;
    }());
    A.Line = Line;
    function fromOrigin(p) {
        return new Line({ x: 0, y: 0 }, p);
    }
    A.fromOrigin = fromOrigin;
})(A || (A = {}));
