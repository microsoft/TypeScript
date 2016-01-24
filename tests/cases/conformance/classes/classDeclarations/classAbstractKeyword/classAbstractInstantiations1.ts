
//
// Calling new with (non)abstract classes.
//

abstract class A {}

class B extends A {}

abstract class C extends B {}

new A;
new A(1); // should report 1 error
new B;
new C;

var a : A;
var b : B;
var c : C;

a = new B;
b = new B;
c = new B;
