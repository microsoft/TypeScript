class A<T extends T> {
    foo() {
        var x: T;
        var a = x.foo();
        var b = new x(123);
        var c = x[1];
        var d = x();
    }
}