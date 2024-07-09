function f<x, x>() { }
function f2<X, X>(a: X, b: X): X { return null; }
class C<X, X> {
    public f<x, x>() {}
    public f2<X, X>(a: X, b: X): X { return null; }
}

interface I<X, X> {
    f<X, X>();
    f2<X, X>(a: X, b: X): X;
}

var m = {
    a: function f<X, X>() {},
    b: function f2<X, X>(a: X, b: X): X { return null; }
}