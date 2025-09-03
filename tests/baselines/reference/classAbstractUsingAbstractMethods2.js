//// [tests/cases/conformance/classes/classDeclarations/classAbstractKeyword/classAbstractUsingAbstractMethods2.ts] ////

//// [classAbstractUsingAbstractMethods2.ts]
class A {
    abstract foo();
}

class B extends A  {}

abstract class C extends A {}

class D extends A {
    foo() {}
}

abstract class E extends A {
    foo() {}
}

abstract class AA {
    abstract foo();
}

class BB extends AA  {}

abstract class CC extends AA {}

class DD extends AA {
    foo() {}
}

//// [classAbstractUsingAbstractMethods2.js]
class A {
}
class B extends A {
}
class C extends A {
}
class D extends A {
    foo() { }
}
class E extends A {
    foo() { }
}
class AA {
}
class BB extends AA {
}
class CC extends AA {
}
class DD extends AA {
    foo() { }
}
