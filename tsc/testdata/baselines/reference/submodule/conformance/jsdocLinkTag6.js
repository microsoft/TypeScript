//// [tests/cases/conformance/jsdoc/jsdocLinkTag6.ts] ////

//// [a.ts]
class A {
    foo() {}
}
class B extends A {
    /**
     * @override {@link A.foo}
     */
    foo() {}
}


//// [a.js]
class A {
    foo() { }
}
class B extends A {
    /**
     * @override {@link A.foo}
     */
    foo() { }
}
