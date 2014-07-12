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
var Point = (function () {
    function Point(x, y) {
        this.x = x;
        this.y = y;
    }
    Point.Origin = function () {
        return { x: 0, y: 0 };
    };
    return Point;
})();

var Point;
(function (Point) {
    function Origin() {
        return "";
    }
})(Point || (Point = {}));

var A;
(function (A) {
    var Point = (function () {
        function Point(x, y) {
            this.x = x;
            this.y = y;
        }
        Point.Origin = function () {
            return { x: 0, y: 0 };
        };
        return Point;
    })();
    A.Point = Point;

    (function (Point) {
        function Origin() {
            return "";
        }
    })(A.Point || (A.Point = {}));
    var Point = A.Point;
})(A || (A = {}));
