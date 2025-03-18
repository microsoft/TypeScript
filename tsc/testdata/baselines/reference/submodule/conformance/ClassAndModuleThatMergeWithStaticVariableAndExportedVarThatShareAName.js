//// [tests/cases/conformance/internalModules/DeclarationMerging/ClassAndModuleThatMergeWithStaticVariableAndExportedVarThatShareAName.ts] ////

//// [ClassAndModuleThatMergeWithStaticVariableAndExportedVarThatShareAName.ts]
class Point {
    constructor(public x: number, public y: number) { }

    static Origin: Point = { x: 0, y: 0 };
}

module Point {
    export var Origin = ""; //expected duplicate identifier error
}


module A {
    export class Point {
        constructor(public x: number, public y: number) { }

        static Origin: Point = { x: 0, y: 0 };
    }

    export module Point {
        export var Origin = ""; //expected duplicate identifier error
    }
}

//// [ClassAndModuleThatMergeWithStaticVariableAndExportedVarThatShareAName.js]
class Point {
    x;
    y;
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    static Origin = { x: 0, y: 0 };
}
(function (Point) {
    Point.Origin = "";
})(Point || (Point = {}));
var A;
(function (A) {
    class Point {
        x;
        y;
        constructor(x, y) {
            this.x = x;
            this.y = y;
        }
        static Origin = { x: 0, y: 0 };
    }
    A.Point = Point;
    (function (Point) {
        Point.Origin = "";
    })(Point = A.Point || (A.Point = {}));
})(A || (A = {}));
