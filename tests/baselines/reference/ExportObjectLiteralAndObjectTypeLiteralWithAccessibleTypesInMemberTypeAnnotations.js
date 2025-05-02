//// [tests/cases/conformance/internalModules/exportDeclarations/ExportObjectLiteralAndObjectTypeLiteralWithAccessibleTypesInMemberTypeAnnotations.ts] ////

//// [ExportObjectLiteralAndObjectTypeLiteralWithAccessibleTypesInMemberTypeAnnotations.ts]
module A {

    class Point {
        constructor(public x: number, public y: number) { }
    }

    export var Origin: Point = { x: 0, y: 0 };

    export var Unity = { start: new Point(0, 0), end: new Point(1, 0) };
}


//// [ExportObjectLiteralAndObjectTypeLiteralWithAccessibleTypesInMemberTypeAnnotations.js]
var A;
(function (A) {
    var Point = /** @class */ (function () {
        function Point(x, y) {
            this.x = x;
            this.y = y;
        }
        return Point;
    }());
    A.Origin = { x: 0, y: 0 };
    A.Unity = { start: new Point(0, 0), end: new Point(1, 0) };
})(A || (A = {}));
