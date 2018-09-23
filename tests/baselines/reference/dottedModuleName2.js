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
var A = A || (A = {});
(function (A) {
    var B = A.B || (A.B = {});
    (function (B) {
        B.x = 1;
    })(B);
})(A);
var AA = AA || (AA = {});
(function (AA) {
    var B = AA.B || (AA.B = {});
    (function (B) {
        B.x = 1;
    })(B);
})(AA);
var tmpOK = AA.B.x;
var tmpError = A.B.x;
(function (A) {
    var B = A.B || (A.B = {});
    (function (B) {
        var C = B.C || (B.C = {});
        (function (C) {
            C.x = 1;
        })(C);
    })(B);
})(A);
