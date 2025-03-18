//// [tests/cases/conformance/classes/classDeclarations/classAbstractKeyword/classAbstractOverrideWithAbstract.ts] ////

//// [classAbstractOverrideWithAbstract.ts]
class A {
    foo() {}
}

abstract class B extends A {
    abstract foo();
}

abstract class AA {
    foo() {}
    abstract bar();
}

abstract class BB extends AA {
    abstract foo();
    bar () {}
}

class CC extends BB {} // error

class DD extends BB {
    foo() {}
}

//// [classAbstractOverrideWithAbstract.js]
class A {
    foo() { }
}
class B extends A {
}
class AA {
    foo() { }
}
class BB extends AA {
    bar() { }
}
class CC extends BB {
}
class DD extends BB {
    foo() { }
}
