// doc 2.2
// all ok

struct C {
    x: string;
    foo() { }

    static a: string;
    static foo() { }
}

var c: C;
c.x;
c.foo();

C.a;
C.foo();