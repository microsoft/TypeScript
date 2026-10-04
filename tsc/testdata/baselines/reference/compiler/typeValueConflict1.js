//// [tests/cases/compiler/typeValueConflict1.ts] ////

//// [typeValueConflict1.ts]
namespace M1 {
 export class A {
 }
}
namespace M2 {
 var M1 = 0;
 // Should error.  M1 should bind to the variable, not to the module.
 class B extends M1.A {
 }
}


//// [typeValueConflict1.js]
"use strict";
var M1;
(function (M1) {
    class A {
    }
    M1.A = A;
})(M1 || (M1 = {}));
var M2;
(function (M2) {
    var M1 = 0;
    // Should error.  M1 should bind to the variable, not to the module.
    class B extends M1.A {
    }
})(M2 || (M2 = {}));
