namespace A.B {
 
  export var x = 1;
 
}
 
 
 
namespace AA { export namespace B {
 
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
