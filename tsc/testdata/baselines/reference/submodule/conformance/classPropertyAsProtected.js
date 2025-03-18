//// [tests/cases/conformance/classes/members/accessibility/classPropertyAsProtected.ts] ////

//// [classPropertyAsProtected.ts]
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

//// [classPropertyAsProtected.js]
class C {
    x;
    get y() { return null; }
    set y(x) { }
    foo() { }
    static a;
    static get b() { return null; }
    static set b(x) { }
    static foo() { }
}
var c;
c.x;
c.y;
c.y = 1;
c.foo();
C.a;
C.b();
C.b = 1;
C.foo();
