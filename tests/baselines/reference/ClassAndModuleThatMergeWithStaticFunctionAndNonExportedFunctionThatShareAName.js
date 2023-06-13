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
var Point = /** @class */ (function () {
    function Point(x, y) {
        this.x = x;
        this.y = y;
    }
    Point.Origin = function () { return { x: 0, y: 0 }; };
    return Point;
}());
(function (Point) {
    function Origin() { return ""; } // not an error, since not exported
})(Point || (Point = {}));
var A;
(function (A) {
    var Point = /** @class */ (function () {
        function Point(x, y) {
            this.x = x;
            this.y = y;
        }
        Point.Origin = function () { return { x: 0, y: 0 }; };
        return Point;
    }());
    A.Point = Point;
    (function (Point) {
        function Origin() { return ""; } // not an error since not exported
    })(Point = A.Point || (A.Point = {}));
})(A || (A = {}));
