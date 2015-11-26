// doc 2.3
// struct type assignability is based on inheritance declaration.
// The type of an overriding property member doesn’t need to be assignable to the type of
// the overridden property member.

struct C {
    foo(x: number) { }
}

struct D extends C {
    foo() { } // ok
}

struct E extends D {
    foo(x?: string) { } // ok
}

var c: C;
var d: D;
var e: E;
c = d; // ok
c = e; // ok

var r = c.foo(1);
var r2 = e.foo('');
r2 = e.foo();
r2 = e.foo(1); // error, not match
r2 = (<C>e).foo(1); // ok