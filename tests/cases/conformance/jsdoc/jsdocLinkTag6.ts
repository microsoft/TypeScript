// @filename: /a.ts
class A {
    foo() {}
}
class B extends A {
    /**
     * @override {@link A.foo}
     */
    foo() {}
}
