//// [tests/cases/conformance/internalModules/moduleDeclarations/invalidNestedModules.ts] ////

//// [invalidNestedModules.ts]
namespace A.B.C {
    export class Point {
        x: number;
        y: number;
    }
}

namespace A {
    export namespace B {
        export class C { // Error
            name: string;
        }
    }
}

namespace M2.X {
    export class Point {
        x: number; y: number;
    }
}

namespace M2 {
    export namespace X {
        export var Point: number; // Error
    }
}




//// [invalidNestedModules.js]
"use strict";
var A;
(function (A) {
    let B;
    (function (B) {
        let C;
        (function (C) {
            class Point {
                x;
                y;
            }
            C.Point = Point;
        })(C = B.C || (B.C = {}));
    })(B = A.B || (A.B = {}));
})(A || (A = {}));
(function (A) {
    let B;
    (function (B) {
        class C {
            name;
        }
        B.C = C;
    })(B = A.B || (A.B = {}));
})(A || (A = {}));
var M2;
(function (M2) {
    let X;
    (function (X) {
        class Point {
            x;
            y;
        }
        X.Point = Point;
    })(X = M2.X || (M2.X = {}));
})(M2 || (M2 = {}));
(function (M2) {
    let X;
    (function (X) {
    })(X = M2.X || (M2.X = {}));
})(M2 || (M2 = {}));
