//// [tests/cases/conformance/internalModules/DeclarationMerging/ClassAndModuleThatMergeWithStaticVariableAndExportedVarThatShareAName.ts] ////

//// [ClassAndModuleThatMergeWithStaticVariableAndExportedVarThatShareAName.ts]
class Point {
    constructor(public x: number, public y: number) { }

    static Origin: Point = { x: 0, y: 0 };
}

namespace Point {
    export var Origin = ""; //expected duplicate identifier error
}


namespace A {
    export class Point {
        constructor(public x: number, public y: number) { }

        static Origin: Point = { x: 0, y: 0 };
    }

    export namespace Point {
        export var Origin = ""; //expected duplicate identifier error
    }
}

//// [ClassAndModuleThatMergeWithStaticVariableAndExportedVarThatShareAName.js]
var Point = /** @class */ (function () {
    function Point(x, y) {
        this.x = x;
        this.y = y;
    }
    Point.Origin = { x: 0, y: 0 };
    return Point;
}());
(function (Point) {
    Point.Origin = ""; //expected duplicate identifier error
})(Point || (Point = {}));
var A;
(function (A) {
    var Point = /** @class */ (function () {
        function Point(x, y) {
            this.x = x;
            this.y = y;
        }
        Point.Origin = { x: 0, y: 0 };
        return Point;
    }());
    A.Point = Point;
    (function (Point) {
        Point.Origin = ""; //expected duplicate identifier error
    })(Point = A.Point || (A.Point = {}));
})(A || (A = {}));
