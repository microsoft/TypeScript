//// [tests/cases/conformance/classes/classDeclarations/classAbstractKeyword/classAbstractMethodWithImplementation.ts] ////

//// [classAbstractMethodWithImplementation.ts]
abstract class A {
    abstract foo() {}
}

//// [classAbstractMethodWithImplementation.js]
"use strict";
class A {
    foo() { }
}
