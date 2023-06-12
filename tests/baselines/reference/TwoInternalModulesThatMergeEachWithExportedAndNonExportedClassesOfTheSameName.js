//// [tests/cases/conformance/internalModules/DeclarationMerging/TwoInternalModulesThatMergeEachWithExportedAndNonExportedClassesOfTheSameName.ts] ////

//// [TwoInternalModulesThatMergeEachWithExportedAndNonExportedClassesOfTheSameName.ts]
module A {
    export class Point {
        x: number;
        y: number;
    }
}

module A {
    class Point {
        fromCarthesian(p: A.Point) {
            return { x: p.x, y: p.y };
        }
    }
}

// ensure merges as expected
var p: { x: number; y: number; };
var p: A.Point;

module X.Y.Z {
    export class Line {
        length: number;
    }
}

module X {
    export module Y {
        export module Z {
            class Line {
                name: string;
            }
        }
    }
}

// ensure merges as expected
var l: { length: number; }
var l: X.Y.Z.Line;



//// [TwoInternalModulesThatMergeEachWithExportedAndNonExportedClassesOfTheSameName.js]
var A;
(function (A) {
    var Point = /** @class */ (function () {
        function Point() {
        }
        return Point;
    }());
    A.Point = Point;
})(A || (A = {}));
(function (A) {
    var Point = /** @class */ (function () {
        function Point() {
        }
        Point.prototype.fromCarthesian = function (p) {
            return { x: p.x, y: p.y };
        };
        return Point;
    }());
})(A || (A = {}));
// ensure merges as expected
var p;
var p;
var X;
(function (X) {
    var Y;
    (function (Y) {
        var Z;
        (function (Z) {
            var Line = /** @class */ (function () {
                function Line() {
                }
                return Line;
            }());
            Z.Line = Line;
        })(Z = Y.Z || (Y.Z = {}));
    })(Y = X.Y || (X.Y = {}));
})(X || (X = {}));
(function (X) {
    var Y;
    (function (Y) {
        var Z;
        (function (Z) {
            var Line = /** @class */ (function () {
                function Line() {
                }
                return Line;
            }());
        })(Z = Y.Z || (Y.Z = {}));
    })(Y = X.Y || (X.Y = {}));
})(X || (X = {}));
// ensure merges as expected
var l;
var l;
