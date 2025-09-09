//// [tests/cases/conformance/internalModules/DeclarationMerging/AmbientModuleAndNonAmbientClassWithSameNameAndCommonRoot.ts] ////

//// [module.d.ts]
declare namespace A {
    export namespace Point {
        export var Origin: {
            x: number;
            y: number;
        }
    }
}

//// [classPoint.ts]
namespace A {
    export class Point {
        constructor(public x: number, public y: number) { }
    }
}

//// [test.ts]
var p: { x: number; y: number; }
var p = A.Point.Origin;
var p = new A.Point(0, 0); // unexpected error here, bug 840000

//// [classPoint.js]
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
})(A || (A = {}));
//// [test.js]
var p;
var p = A.Point.Origin;
var p = new A.Point(0, 0); // unexpected error here, bug 840000
