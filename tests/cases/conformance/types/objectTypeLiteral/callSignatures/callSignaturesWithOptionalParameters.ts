// Optional parameters should be valid in all the below casts

function foo(x?: number) { }
var f = function foo(x?: number) { }
var f2 = (x: number, y?: number) => { }

foo(1);
foo();
f(1);
f();
f2(1);
f2(1, 2);

class C {
    foo(x?: number) { }
}

var c: C;
c.foo();
c.foo(1);

interface I {
    (x?: number);
    foo(x: number, y?: number);
}

var i: I;
i();
i(1);
i.foo(1);
i.foo(1, 2);

var a: {
    (x?: number);
    foo(x?: number);
}

a();
a(1);
a.foo();
a.foo(1);

var b = {
    foo(x?: number) { },
    a: function foo(x: number, y?: number) { },
    b: (x?: number) => { }
}

b.foo();
b.foo(1);
b.a(1);
b.a(1, 2);
b.b();
b.b(1);
