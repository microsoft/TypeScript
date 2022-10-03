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
var Point = /** @class */ (function () {
    function Point(x, y) {
        this.x = x;
        this.y = y;
    }
    Point.Origin = function () { return { x: 0, y: 0 }; }; // unexpected error here bug 840246
    return Point;
}());
(function (Point) {
    function Origin() { return null; } //expected duplicate identifier error
    Point.Origin = Origin;
})(Point || (Point = {}));
var A;
(function (A) {
    var Point = /** @class */ (function () {
        function Point(x, y) {
            this.x = x;
            this.y = y;
        }
        Point.Origin = function () { return { x: 0, y: 0 }; }; // unexpected error here bug 840246
        return Point;
    }());
    A.Point = Point;
    (function (Point) {
        function Origin() { return ""; } //expected duplicate identifier error
        Point.Origin = Origin;
    })(Point = A.Point || (A.Point = {}));
})(A || (A = {}));
