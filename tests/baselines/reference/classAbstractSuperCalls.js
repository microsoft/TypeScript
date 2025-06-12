//// [tests/cases/conformance/classes/classDeclarations/classAbstractKeyword/classAbstractSuperCalls.ts] ////

//// [classAbstractSuperCalls.ts]
class A {
    foo() { return 1; }
}

abstract class B extends A {
    abstract foo();
    bar() { super.foo(); }
    baz() { return this.foo; }
}

class C extends B {
    foo() { return 2; }
    qux() { return super.foo() || super.foo; } // 2 errors, foo is abstract
    norf() { return super.bar(); }
}

class AA {
    foo() { return 1; }
    bar() { return this.foo(); }
}

abstract class BB extends AA {
    abstract foo();
    // inherits bar. But BB is abstract, so this is OK.
}


//// [classAbstractSuperCalls.js]
class A {
    foo() { return 1; }
}
class B extends A {
    bar() { super.foo(); }
    baz() { return this.foo; }
}
class C extends B {
    foo() { return 2; }
    qux() { return super.foo() || super.foo; } // 2 errors, foo is abstract
    norf() { return super.bar(); }
}
class AA {
    foo() { return 1; }
    bar() { return this.foo(); }
}
class BB extends AA {
}
