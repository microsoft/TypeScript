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
"use strict";
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
    Point.Origin = ""; //expected duplicate identifier error
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
        Point.Origin = ""; //expected duplicate identifier error
    })(Point = A.Point || (A.Point = {}));
})(A || (A = {}));
