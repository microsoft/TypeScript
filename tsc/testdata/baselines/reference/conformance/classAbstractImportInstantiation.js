//// [tests/cases/conformance/classes/classDeclarations/classAbstractKeyword/classAbstractImportInstantiation.ts] ////

//// [classAbstractImportInstantiation.ts]
namespace M {
    export abstract class A {}
    
    new A;
}

import myA = M.A;

new myA;


//// [classAbstractImportInstantiation.js]
"use strict";
var M;
(function (M) {
    class A {
    }
    M.A = A;
    new A;
})(M || (M = {}));
var myA = M.A;
new myA;
