//// [tests/cases/compiler/heritageClauseTypeReferenceTypes.ts] ////

//// [heritageClauseTypeReferenceTypes.ts]
namespace A {
    export const valueA = 0;

    export namespace B {
        export const valueB = 0;

        export interface C {}
    }
}

class D implements A.B.C {}


//// [heritageClauseTypeReferenceTypes.js]
"use strict";
var A;
(function (A) {
    A.valueA = 0;
    let B;
    (function (B) {
        B.valueB = 0;
    })(B = A.B || (A.B = {}));
})(A || (A = {}));
class D {
}
