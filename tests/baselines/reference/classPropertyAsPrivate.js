//// [tests/cases/conformance/classes/members/accessibility/classPropertyAsPrivate.ts] ////

//// [classPropertyAsPrivate.ts]
class C {
    private x: string;
    private get y() { return null; }
    private set y(x) { }
    private foo() { }

    private static a: string;
    private static get b() { return null; }
    private static set b(x) { }
    private static foo() { }
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

//// [classPropertyAsPrivate.js]
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
// all errors
c.x;
c.y;
c.y = 1;
c.foo();
C.a;
C.b();
C.b = 1;
C.foo();
