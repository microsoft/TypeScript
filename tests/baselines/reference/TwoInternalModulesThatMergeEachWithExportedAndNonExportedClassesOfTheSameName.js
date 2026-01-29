//// [tests/cases/conformance/internalModules/DeclarationMerging/TwoInternalModulesThatMergeEachWithExportedAndNonExportedClassesOfTheSameName.ts] ////

//// [TwoInternalModulesThatMergeEachWithExportedAndNonExportedClassesOfTheSameName.ts]
namespace A {
    export class Point {
        x: number;
        y: number;
    }
}

namespace A {
    class Point {
        fromCarthesian(p: A.Point) {
            return { x: p.x, y: p.y };
        }
    }
}

// ensure merges as expected
var p: { x: number; y: number; };
var p: A.Point;

namespace X.Y.Z {
    export class Line {
        length: number;
    }
}

namespace X {
    export namespace Y {
        export namespace Z {
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
    class Point {
    }
    A.Point = Point;
})(A || (A = {}));
(function (A) {
    class Point {
        fromCarthesian(p) {
            return { x: p.x, y: p.y };
        }
    }
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
            class Line {
            }
            Z.Line = Line;
        })(Z = Y.Z || (Y.Z = {}));
    })(Y = X.Y || (X.Y = {}));
})(X || (X = {}));
(function (X) {
    let Y;
    (function (Y) {
        let Z;
        (function (Z) {
            class Line {
            }
        })(Z = Y.Z || (Y.Z = {}));
    })(Y = X.Y || (X.Y = {}));
})(X || (X = {}));
// ensure merges as expected
var l;
var l;
