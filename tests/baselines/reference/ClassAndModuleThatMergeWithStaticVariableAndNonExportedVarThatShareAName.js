//// [ClassAndModuleThatMergeWithStaticVariableAndNonExportedVarThatShareAName.ts]
class Point {
    constructor(public x: number, public y: number) { }

    static Origin: Point = { x: 0, y: 0 };
}

module Point {
    var Origin = ""; // not an error, since not exported
}


module A {
    export class Point {
        constructor(public x: number, public y: number) { }

        static Origin: Point = { x: 0, y: 0 };
    }

    export module Point {
        var Origin = ""; // not an error since not exported
    }
}

//// [ClassAndModuleThatMergeWithStaticVariableAndNonExportedVarThatShareAName.js]
var Point = /** @class */ (function () {
    function Point(x, y) {
        this.x = x;
        this.y = y;
    }
    Point.Origin = { x: 0, y: 0 };
    return Point;
}());
(function (Point) {
    var Origin = ""; // not an error, since not exported
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
        var Origin = ""; // not an error since not exported
    })(Point = A.Point || (A.Point = {}));
})(A || (A = {}));
