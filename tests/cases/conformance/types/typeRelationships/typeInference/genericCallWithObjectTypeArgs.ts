class C {
    private x: string;
}

class D {
    private x: string;
}

class X<T> {
    x: T;
}

function foo<T>(t: X<T>, t2: X<T>) {
    var x: T;
    return x;
}

var c1 = new X<C>();
var d1 = new X<D>();
var r = foo(c1, d1); // error
var r2 = foo(c1, c1); // ok