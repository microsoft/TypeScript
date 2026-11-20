// @checkOrder: default, reverse, isolated, typesfirst

// A circular constraint of a declared type parameter is reported at its
// declaration, regardless of which use resolves the constraint first.

class A<T extends T> {
    foo() {
        var x!: T;
        var a = x.foo();
        var b = new x(123);
        var c = x[1];
        var d = x();
    }
}
