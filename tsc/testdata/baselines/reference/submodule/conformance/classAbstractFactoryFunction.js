//// [tests/cases/conformance/classes/classDeclarations/classAbstractKeyword/classAbstractFactoryFunction.ts] ////

//// [classAbstractFactoryFunction.ts]
class A {}
abstract class B extends A {}

function NewA(Factory: typeof A) {
    return new A;
}

function NewB(Factory: typeof B) {
    return new B;
}

NewA(A);
NewA(B);

NewB(A);
NewB(B);

//// [classAbstractFactoryFunction.js]
class A {
}
class B extends A {
}
function NewA(Factory) {
    return new A;
}
function NewB(Factory) {
    return new B;
}
NewA(A);
NewA(B);
NewB(A);
NewB(B);
