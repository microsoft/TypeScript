//// [tests/cases/conformance/internalModules/exportDeclarations/ExportObjectLiteralAndObjectTypeLiteralWithAccessibleTypesInNestedMemberTypeAnnotations.ts] ////

//// [ExportObjectLiteralAndObjectTypeLiteralWithAccessibleTypesInNestedMemberTypeAnnotations.ts]
module A {

    class Point {
        constructor(public x: number, public y: number) { }
    }

    export var UnitSquare : {
        top: { left: Point, right: Point },
        bottom: { left: Point, right: Point }
    } = null;
}

//// [ExportObjectLiteralAndObjectTypeLiteralWithAccessibleTypesInNestedMemberTypeAnnotations.js]
var A;
(function (A) {
    var Point = /** @class */ (function () {
        function Point(x, y) {
            this.x = x;
            this.y = y;
        }
        return Point;
    }());
    A.UnitSquare = null;
})(A || (A = {}));
