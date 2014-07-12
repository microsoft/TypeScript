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
    (function (B) {
        B.x = 1;
    })(A.B || (A.B = {}));
    var B = A.B;
})(A || (A = {}));

var AA;
(function (AA) {
    (function (B) {
        B.x = 1;
    })(AA.B || (AA.B = {}));
    var B = AA.B;
})(AA || (AA = {}));

var tmpOK = AA.B.x;

var tmpError = A.B.x;

var A;
(function (A) {
    (function (B) {
        (function (C) {
            C.x = 1;
        })(B.C || (B.C = {}));
        var C = B.C;
    })(A.B || (A.B = {}));
    var B = A.B;
})(A || (A = {}));

var M;
(function (M) {
})(M || (M = {}));
