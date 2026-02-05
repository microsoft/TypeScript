//// [tests/cases/conformance/internalModules/DeclarationMerging/TwoInternalModulesThatMergeEachWithExportedModulesOfTheSameName.ts] ////

//// [TwoInternalModulesThatMergeEachWithExportedModulesOfTheSameName.ts]
namespace A.B {
    export var x: number;
}

namespace A{ 
    namespace B {
        export var x: string;
    }
}

// ensure the right var decl is exported
var x: number;
var x = A.B.x;

namespace X.Y.Z {
    export class Line {
        length: number;
    }
}

namespace X {
    export namespace Y {
        namespace Z {
            export class Line {
                name: string;
            }
        }
    }
}

// make sure merging works as expected
var l: { length: number };
var l: X.Y.Z.Line;


//// [TwoInternalModulesThatMergeEachWithExportedModulesOfTheSameName.js]
"use strict";
var A;
(function (A) {
    let B;
    (function (B) {
    })(B = A.B || (A.B = {}));
})(A || (A = {}));
(function (A) {
    let B;
    (function (B) {
    })(B || (B = {}));
})(A || (A = {}));
// ensure the right var decl is exported
var x;
var x = A.B.x;
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
            class Line {
                name;
            }
            Z.Line = Line;
        })(Z || (Z = {}));
    })(Y = X.Y || (X.Y = {}));
})(X || (X = {}));
// make sure merging works as expected
var l;
var l;
