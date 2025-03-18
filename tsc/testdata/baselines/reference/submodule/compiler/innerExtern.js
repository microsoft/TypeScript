//// [tests/cases/compiler/innerExtern.ts] ////

//// [innerExtern.ts]
module A {
    export declare module BB {
        export var Elephant;
    }
    export module B {
        export class C {
            x = BB.Elephant.X;
        }
    }
}




//// [innerExtern.js]
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
