// Optional parameters should be valid in all the below casts

function foo(x?: number);
function foo(x?: number) { }

foo(1);
foo();

function foo2(x: number);
function foo2(x: number, y?: number);
function foo2(x: number, y?: number) { }

foo2(1);
foo2(1, 2);

class C {
    foo(x?: number);
    foo(x?: number) { }

    foo2(x: number);
    foo2(x: number, y?: number);
    foo2(x: number, y?: number) { }
}

var c: C;
c.foo();
c.foo(1);

c.foo2(1);
c.foo2(1, 2);

interface I {
    (x?: number);
    (x?: number, y?: number);
    foo(x: number, y?: number);
    foo(x: number, y?: number, z?: number);
}

var i: I;
i();
i(1);
i(1, 2);
i.foo(1);
i.foo(1, 2);
i.foo(1, 2, 3);

var a: {
    (x?: number);
    (x?: number, y?: number);
    foo(x: number, y?: number);
    foo(x: number, y?: number, z?: number);
}

a();
a(1);
a(1, 2);
a.foo(1);
a.foo(1, 2);
a.foo(1, 2, 3);