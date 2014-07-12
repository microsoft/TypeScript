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
    (function (B) {
        B.x;
    })(A.B || (A.B = {}));
    var B = A.B;
})(A || (A = {}));

var A;
(function (A) {
    var B;
    (function (B) {
        B.x;
    })(B || (B = {}));
})(A || (A = {}));

// ensure the right var decl is exported
var x;
var x = A.B.x;

var X;
(function (X) {
    (function (Y) {
        (function (Z) {
            var Line = (function () {
                function Line() {
                }
                return Line;
            })();
            Z.Line = Line;
        })(Y.Z || (Y.Z = {}));
        var Z = Y.Z;
    })(X.Y || (X.Y = {}));
    var Y = X.Y;
})(X || (X = {}));

var X;
(function (X) {
    (function (Y) {
        var Z;
        (function (Z) {
            var Line = (function () {
                function Line() {
                }
                return Line;
            })();
            Z.Line = Line;
        })(Z || (Z = {}));
    })(X.Y || (X.Y = {}));
    var Y = X.Y;
})(X || (X = {}));

// make sure merging works as expected
var l;
var l;
