class C<T> {
    x: T;
    foo(x: T): T { return null; }
}

var r = C.prototype;
// should be any
var r2 = r.x
var r3 = r.foo(null);