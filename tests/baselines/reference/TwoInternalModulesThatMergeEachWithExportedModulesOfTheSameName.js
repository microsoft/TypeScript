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
    var B;
    (function (B) {
    })(B = A.B || (A.B = {}));
})(A || (A = {}));
(function (A) {
    var B;
    (function (B) {
    })(B || (B = {}));
})(A || (A = {}));
// ensure the right var decl is exported
var x;
var x = A.B.x;
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
            Z.Line = Line;
        })(Z || (Z = {}));
    })(Y = X.Y || (X.Y = {}));
})(X || (X = {}));
// make sure merging works as expected
var l;
var l;
