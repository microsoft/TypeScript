//// [tests/cases/compiler/innerExtern.ts] ////

//// [innerExtern.ts]
namespace A {
    export declare namespace BB {
        export var Elephant;
    }
    export namespace B {
        export class C {
            x = BB.Elephant.X;
        }
    }
}




//// [innerExtern.js]
"use strict";
var A;
(function (A) {
    let B;
    (function (B) {
        class C {
            x = BB.Elephant.X;
        }
        B.C = C;
    })(B = A.B || (A.B = {}));
})(A || (A = {}));
