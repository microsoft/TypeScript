//// [tests/cases/compiler/dottedModuleName2.ts] ////

//// [dottedModuleName2.ts]
module A.B {
 
  export var x = 1;
 
}
 
 
 
module AA { export module B {
 
  export var x = 1;
 
} }
 
 
 
var tmpOK = AA.B.x;
 
var tmpError = A.B.x;


module A.B.C
 
{
 
    export var x = 1;
 
}
 
 
 
module M
 
{
 
    import X1 = A;
 
    import X2 = A.B;
 
    import X3 = A.B.C;
 
}


//// [dottedModuleName2.js]
var A;
(function (A) {
    var B;
    (function (B) {
        B.x = 1;
    })(B = A.B || (A.B = {}));
})(A || (A = {}));
var AA;
(function (AA) {
    var B;
    (function (B) {
        B.x = 1;
    })(B = AA.B || (AA.B = {}));
})(AA || (AA = {}));
var tmpOK = AA.B.x;
var tmpError = A.B.x;
(function (A) {
    var B;
    (function (B) {
        var C;
        (function (C) {
            C.x = 1;
        })(C = B.C || (B.C = {}));
    })(B = A.B || (A.B = {}));
})(A || (A = {}));
