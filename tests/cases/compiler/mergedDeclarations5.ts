// @filename: a.ts
class A {
    protected foo() {}
}
// @filename: b.ts
interface A { }

class B extends A {
    protected foo() {}
}