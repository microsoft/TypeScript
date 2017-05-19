class A {
    foo() {
        return this;
    }
}
class B extends A {
    bar() {
        return this;
    }
}
class C extends B {
    baz() {
        return this;
    }
}
var c: C;
var z = c.foo().bar().baz();  // Fluent pattern
