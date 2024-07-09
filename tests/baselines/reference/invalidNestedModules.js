//// [tests/cases/conformance/internalModules/moduleDeclarations/invalidNestedModules.ts] ////

//// [invalidNestedModules.ts]
module A.B.C {
    export class Point {
        x: number;
        y: number;
    }
}

module A {
    export module B {
        export class C { // Error
            name: string;
        }
    }
}

module M2.X {
    export class Point {
        x: number; y: number;
    }
}

module M2 {
    export module X {
        export var Point: number; // Error
    }
}




//// [invalidNestedModules.js]
var A;
(function (A) {
    var B;
    (function (B) {
        var C;
        (function (C) {
            var Point = /** @class */ (function () {
                function Point() {
                }
                return Point;
            }());
            C.Point = Point;
        })(C = B.C || (B.C = {}));
    })(B = A.B || (A.B = {}));
})(A || (A = {}));
(function (A) {
    var B;
    (function (B) {
        var C = /** @class */ (function () {
            function C() {
            }
            return C;
        }());
        B.C = C;
    })(B = A.B || (A.B = {}));
})(A || (A = {}));
var M2;
(function (M2) {
    var X;
    (function (X) {
        var Point = /** @class */ (function () {
            function Point() {
            }
            return Point;
        }());
        X.Point = Point;
    })(X = M2.X || (M2.X = {}));
})(M2 || (M2 = {}));
(function (M2) {
    var X;
    (function (X) {
    })(X = M2.X || (M2.X = {}));
})(M2 || (M2 = {}));
