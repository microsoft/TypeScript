//// [tests/cases/compiler/dottedModuleName2.ts] ////

//// [dottedModuleName2.ts]
namespace A.B {
 
  export var x = 1;
 
}
 
 
 
namespace AA { export namespace B {
 
  export var x = 1;
 
} }
 
 
 
var tmpOK = AA.B.x;
 
var tmpError = A.B.x;


namespace A.B.C
 
{
 
    export var x = 1;
 
}
 
 
 
namespace M
 
{
 
    import X1 = A;
 
    import X2 = A.B;
 
    import X3 = A.B.C;
 
}


//// [dottedModuleName2.js]
"use strict";
var A;
(function (A) {
    let B;
    (function (B) {
        B.x = 1;
    })(B = A.B || (A.B = {}));
})(A || (A = {}));
var AA;
(function (AA) {
    let B;
    (function (B) {
        B.x = 1;
    })(B = AA.B || (AA.B = {}));
})(AA || (AA = {}));
var tmpOK = AA.B.x;
var tmpError = A.B.x;
(function (A) {
    let B;
    (function (B) {
        let C;
        (function (C) {
            C.x = 1;
        })(C = B.C || (B.C = {}));
    })(B = A.B || (A.B = {}));
})(A || (A = {}));
