//// [tests/cases/conformance/classes/classDeclarations/classAbstractKeyword/classAbstractInstantiations1.ts] ////

//// [classAbstractInstantiations1.ts]
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


//// [classAbstractInstantiations1.js]
class A {
}
class B extends A {
}
class C extends B {
}
new A;
new A(1);
new B;
new C;
var a;
var b;
var c;
a = new B;
b = new B;
c = new B;
