//// [tests/cases/conformance/internalModules/DeclarationMerging/ClassAndModuleThatMergeWithStaticFunctionAndNonExportedFunctionThatShareAName.ts] ////

//// [ClassAndModuleThatMergeWithStaticFunctionAndNonExportedFunctionThatShareAName.ts]
class Point {
    constructor(public x: number, public y: number) { }

    static Origin(): Point { return { x: 0, y: 0 }; }
}

namespace Point {
    function Origin() { return ""; }// not an error, since not exported
}


namespace A {
    export class Point {
        constructor(public x: number, public y: number) { }

        static Origin(): Point { return { x: 0, y: 0 }; }
    }

    export namespace Point {
        function Origin() { return ""; }// not an error since not exported
    }
}

//// [ClassAndModuleThatMergeWithStaticFunctionAndNonExportedFunctionThatShareAName.js]
"use strict";
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
