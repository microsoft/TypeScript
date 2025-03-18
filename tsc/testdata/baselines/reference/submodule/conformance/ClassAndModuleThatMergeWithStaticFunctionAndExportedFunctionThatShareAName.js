//// [tests/cases/conformance/internalModules/DeclarationMerging/ClassAndModuleThatMergeWithStaticFunctionAndExportedFunctionThatShareAName.ts] ////

//// [ClassAndModuleThatMergeWithStaticFunctionAndExportedFunctionThatShareAName.ts]
class Point {
    constructor(public x: number, public y: number) { }

    static Origin(): Point { return { x: 0, y: 0 }; } // unexpected error here bug 840246
}

module Point {
    export function Origin() { return null; } //expected duplicate identifier error
}


module A {
    export class Point {
        constructor(public x: number, public y: number) { }

        static Origin(): Point { return { x: 0, y: 0 }; } // unexpected error here bug 840246
    }

    export module Point {
        export function Origin() { return ""; }//expected duplicate identifier error
    }
}

//// [ClassAndModuleThatMergeWithStaticFunctionAndExportedFunctionThatShareAName.js]
class Point {
    x;
    y;
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    static Origin() { return { x: 0, y: 0 }; }
}
(function (Point) {
    function Origin() { return null; }
    Point.Origin = Origin;
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
        static Origin() { return { x: 0, y: 0 }; }
    }
    A.Point = Point;
    (function (Point) {
        function Origin() { return ""; }
        Point.Origin = Origin;
    })(Point = A.Point || (A.Point = {}));
})(A || (A = {}));
