//// [tests/cases/conformance/classes/classDeclarations/classAbstractKeyword/classAbstractUsingAbstractMethod1.ts] ////

//// [classAbstractUsingAbstractMethod1.ts]
abstract class A {
    abstract foo() : number;
}

class B extends A {
    foo() { return 1; }
}

abstract class C extends A  {
    abstract foo() : number;
}

var a = new B;
a.foo();

a = new C; // error, cannot instantiate abstract class.
a.foo();

//// [classAbstractUsingAbstractMethod1.js]
class A {
}
class B extends A {
    foo() { return 1; }
}
class C extends A {
}
var a = new B;
a.foo();
a = new C;
a.foo();
