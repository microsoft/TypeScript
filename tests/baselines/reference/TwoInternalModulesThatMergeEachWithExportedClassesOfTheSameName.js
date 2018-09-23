//// [TwoInternalModulesThatMergeEachWithExportedClassesOfTheSameName.ts]
module A {
    export class Point {
        x: number;
        y: number;
    }
}

module A{
    // expected error
    export class Point {
        origin: number;
        angle: number;
    }
}

module X.Y.Z {
    export class Line {
        length: number;
    }
}

module X {
    export module Y {
        export module Z {
            // expected error
            export class Line {
                name: string;
            }
        }
    }
}


//// [TwoInternalModulesThatMergeEachWithExportedClassesOfTheSameName.js]
var A = A || (A = {});
(function (A) {
    var Point = /** @class */ (function () {
        function Point() {
        }
        return Point;
    }());
    A.Point = Point;
})(A);
(function (A) {
    // expected error
    var Point = /** @class */ (function () {
        function Point() {
        }
        return Point;
    }());
    A.Point = Point;
})(A);
var X = X || (X = {});
(function (X) {
    var Y = X.Y || (X.Y = {});
    (function (Y) {
        var Z = Y.Z || (Y.Z = {});
        (function (Z) {
            var Line = /** @class */ (function () {
                function Line() {
                }
                return Line;
            }());
            Z.Line = Line;
        })(Z);
    })(Y);
})(X);
(function (X) {
    var Y = X.Y || (X.Y = {});
    (function (Y) {
        var Z = Y.Z || (Y.Z = {});
        (function (Z) {
            // expected error
            var Line = /** @class */ (function () {
                function Line() {
                }
                return Line;
            }());
            Z.Line = Line;
        })(Z);
    })(Y);
})(X);
