//// [tests/cases/conformance/classes/classDeclarations/classAbstractKeyword/classAbstractSingleLineDecl.ts] ////

//// [classAbstractSingleLineDecl.ts]
abstract class A {}

abstract
class B {}

abstract

class C {}

new A;
new B;
new C;

//// [classAbstractSingleLineDecl.js]
class A {
}
abstract;
class B {
}
abstract;
class C {
}
new A;
new B;
new C;
