//// [tests/cases/conformance/classes/classDeclarations/classAbstractKeyword/classAbstractImportInstantiation.ts] ////

//// [classAbstractImportInstantiation.ts]
module M {
    export abstract class A {}
    
    new A;
}

import myA = M.A;

new myA;


//// [classAbstractImportInstantiation.js]
var M;
(function (M) {
    class A {
    }
    M.A = A;
    new A;
})(M || (M = {}));
new myA;
