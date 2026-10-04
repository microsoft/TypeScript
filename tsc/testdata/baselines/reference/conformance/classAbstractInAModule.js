//// [tests/cases/conformance/classes/classDeclarations/classAbstractKeyword/classAbstractInAModule.ts] ////

//// [classAbstractInAModule.ts]
namespace M {
    export abstract class A {}
    export class B extends A {}
}

new M.A;
new M.B;

//// [classAbstractInAModule.js]
"use strict";
var M;
(function (M) {
    class A {
    }
    M.A = A;
    class B extends A {
    }
    M.B = B;
})(M || (M = {}));
new M.A;
new M.B;
