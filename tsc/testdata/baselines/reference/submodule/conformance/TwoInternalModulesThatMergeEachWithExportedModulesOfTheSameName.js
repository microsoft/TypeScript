//// [tests/cases/conformance/internalModules/DeclarationMerging/TwoInternalModulesThatMergeEachWithExportedModulesOfTheSameName.ts] ////

//// [TwoInternalModulesThatMergeEachWithExportedModulesOfTheSameName.ts]
module A.B {
    export var x: number;
}

module A{ 
    module B {
        export var x: string;
    }
}

// ensure the right var decl is exported
var x: number;
var x = A.B.x;

module X.Y.Z {
    export class Line {
        length: number;
    }
}

module X {
    export module Y {
        module Z {
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
