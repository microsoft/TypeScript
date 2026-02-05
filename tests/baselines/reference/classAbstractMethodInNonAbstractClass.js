//// [tests/cases/conformance/classes/classDeclarations/classAbstractKeyword/classAbstractMethodInNonAbstractClass.ts] ////

//// [classAbstractMethodInNonAbstractClass.ts]
class A {
    abstract foo();
}

class B {
    abstract foo() {}
}

//// [classAbstractMethodInNonAbstractClass.js]
"use strict";
class A {
}
class B {
    foo() { }
}
