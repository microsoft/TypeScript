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
"use strict";
var A;
(function (A) {
    class Point {
        x;
        y;
    }
    A.Point = Point;
})(A || (A = {}));
(function (A) {
    // expected error
    class Point {
        origin;
        angle;
    }
    A.Point = Point;
})(A || (A = {}));
var X;
(function (X) {
    let Y;
    (function (Y) {
        let Z;
        (function (Z) {
            class Line {
                length;
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
            // expected error
            class Line {
                name;
            }
            Z.Line = Line;
        })(Z = Y.Z || (Y.Z = {}));
    })(Y = X.Y || (X.Y = {}));
})(X || (X = {}));
