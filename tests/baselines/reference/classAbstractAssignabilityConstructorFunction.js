//// [tests/cases/conformance/classes/classDeclarations/classAbstractKeyword/classAbstractAssignabilityConstructorFunction.ts] ////

//// [classAbstractAssignabilityConstructorFunction.ts]
abstract class A { }

// var AA: typeof A;
var AAA: new() => A;

// AA = A; // okay
AAA = A; // error. 
AAA = "asdf";

//// [classAbstractAssignabilityConstructorFunction.js]
class A {
}
// var AA: typeof A;
var AAA;
// AA = A; // okay
AAA = A; // error. 
AAA = "asdf";
