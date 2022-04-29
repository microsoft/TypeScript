class C {
    protected x: string;
    protected get y() { return null; }
    protected set y(x) { }
    protected foo() { }

    protected static a: string;
    protected static get b() { return null; }
    protected static set b(x) { }
    protected static foo() { }
}

var c: C;
// all errors
c.x;
c.y;
c.y = 1;
c.foo();

C.a;
C.b();
C.b = 1;
C.foo();