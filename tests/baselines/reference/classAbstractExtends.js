//// [tests/cases/conformance/classes/classDeclarations/classAbstractKeyword/classAbstractExtends.ts] ////

//// [classAbstractExtends.ts]
class A {
    foo() {}
}

abstract class B extends A {
    abstract bar();
}

class C extends B { }

abstract class D extends B {}

class E extends B {
    bar() {}
}

//// [classAbstractExtends.js]
class A {
    foo() { }
}
class B extends A {
}
class C extends B {
}
class D extends B {
}
class E extends B {
    bar() { }
}
