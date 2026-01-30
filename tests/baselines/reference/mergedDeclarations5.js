//// [tests/cases/compiler/mergedDeclarations5.ts] ////

//// [a.ts]
class A {
    protected foo() {}
}
//// [b.ts]
interface A { }

class B extends A {
    protected foo() {}
}

//// [a.js]
class A {
    foo() { }
}
//// [b.js]
class B extends A {
    foo() { }
}
