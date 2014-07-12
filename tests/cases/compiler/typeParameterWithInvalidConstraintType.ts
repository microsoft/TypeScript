class A<T extends T> {
    foo() {
        var x: T;
        // no error expected below this line
        var a = x.foo();
        var b = new x(123);
        var c = x[1];
        var d = x();
    }
}