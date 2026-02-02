//// [tests/cases/conformance/classes/classDeclarations/classAbstractKeyword/classAbstractConstructor.ts] ////

//// [classAbstractConstructor.ts]
abstract class A {
    abstract constructor() {}
}

//// [classAbstractConstructor.js]
class A {
    constructor() { }
}
