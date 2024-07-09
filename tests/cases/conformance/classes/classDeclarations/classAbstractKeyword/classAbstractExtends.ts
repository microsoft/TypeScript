
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