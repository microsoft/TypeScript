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
var A = A || (A = {});
(function (A) {
    var B = A.B || (A.B = {});
    (function (B) {
    })(B);
})(A);
(function (A) {
    var B = B || (B = {});
    (function (B) {
    })(B);
})(A);
// ensure the right var decl is exported
var x;
var x = A.B.x;
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
        var Z = Z || (Z = {});
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
// make sure merging works as expected
var l;
var l;
