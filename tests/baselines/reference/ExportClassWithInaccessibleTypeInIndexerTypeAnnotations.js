//// [ExportClassWithInaccessibleTypeInIndexerTypeAnnotations.ts]
module A {

    class Point {
        x: number;
        y: number;
    }

    export class points {

        [idx: number]: Point;
        [idx: string]: Point;
    }
}



//// [ExportClassWithInaccessibleTypeInIndexerTypeAnnotations.js]
var A;
(function (A) {
    var Point = /** @class */ (function () {
        function Point() {
        }
        return Point;
    }());
    var points = /** @class */ (function () {
        function points() {
        }
        return points;
    }());
    A.points = points;
})(A || (A = {}));
