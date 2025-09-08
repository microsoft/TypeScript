//// [tests/cases/conformance/internalModules/DeclarationMerging/ClassAndModuleThatMergeWithStaticFunctionAndNonExportedFunctionThatShareAName.ts] ////

//// [ClassAndModuleThatMergeWithStaticFunctionAndNonExportedFunctionThatShareAName.ts]
class Point {
    constructor(public x: number, public y: number) { }

    static Origin(): Point { return { x: 0, y: 0 }; }
}

module Point {
    function Origin() { return ""; }// not an error, since not exported
}


module A {
    export class Point {
        constructor(public x: number, public y: number) { }

        static Origin(): Point { return { x: 0, y: 0 }; }
    }

    export module Point {
        function Origin() { return ""; }// not an error since not exported
    }
}

//// [ClassAndModuleThatMergeWithStaticFunctionAndNonExportedFunctionThatShareAName.js]
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
    function Origin() { return ""; } // not an error, since not exported
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
        function Origin() { return ""; } // not an error since not exported
    })(Point = A.Point || (A.Point = {}));
})(A || (A = {}));
