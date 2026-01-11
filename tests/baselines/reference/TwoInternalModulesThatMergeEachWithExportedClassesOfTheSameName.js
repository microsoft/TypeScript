//// [tests/cases/conformance/internalModules/DeclarationMerging/TwoInternalModulesThatMergeEachWithExportedClassesOfTheSameName.ts] ////

//// [TwoInternalModulesThatMergeEachWithExportedClassesOfTheSameName.ts]
namespace A {
    export class Point {
        x: number;
        y: number;
    }
}

namespace A{
    // expected error
    export class Point {
        origin: number;
        angle: number;
    }
}

namespace X.Y.Z {
    export class Line {
        length: number;
    }
}

namespace X {
    export namespace Y {
        export namespace Z {
            // expected error
            export class Line {
                name: string;
            }
        }
    }
}


//// [TwoInternalModulesThatMergeEachWithExportedClassesOfTheSameName.js]
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
    // expected error
    var Point = /** @class */ (function () {
        function Point() {
        }
        return Point;
    }());
    A.Point = Point;
})(A || (A = {}));
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
            // expected error
            var Line = /** @class */ (function () {
                function Line() {
                }
                return Line;
            }());
            Z.Line = Line;
        })(Z = Y.Z || (Y.Z = {}));
    })(Y = X.Y || (X.Y = {}));
})(X || (X = {}));
