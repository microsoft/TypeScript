// subclassing is not transitive when you can remove required parameters and add optional parameters

class C<T> {
    foo(x: T, y: T) { }
}

class D<T> extends C<T> {
    foo(x: T) { } // ok to drop parameters
}

class E<T> extends D<T> {
    foo(x: T, y?: number) { } // ok to add optional parameters
}

var c: C<string>;
var d: D<string>;
var e: E<string>;
c = e;
var r = c.foo('', '');
var r2 = e.foo('', 1);