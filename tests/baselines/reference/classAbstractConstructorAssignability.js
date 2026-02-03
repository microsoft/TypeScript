//// [tests/cases/conformance/classes/classDeclarations/classAbstractKeyword/classAbstractConstructorAssignability.ts] ////

//// [classAbstractConstructorAssignability.ts]
class A {}

abstract class B extends A {}

class C extends B {}

var AA : typeof A = B;
var BB : typeof B = A;
var CC : typeof C = B;

new AA;
new BB;
new CC;

//// [classAbstractConstructorAssignability.js]
class A {
}
class B extends A {
}
class C extends B {
}
var AA = B;
var BB = A;
var CC = B;
new AA;
new BB;
new CC;
