//// [tests/cases/conformance/classes/members/accessibility/classPropertyIsPublicByDefault.ts] ////

//// [classPropertyIsPublicByDefault.ts]
class C {
    x: string;
    get y() { return null; }
    set y(x) { }
    foo() { }

    static a: string;
    static get b() { return null; }
    static set b(x) { }
    static foo() { }
}

var c: C;
c.x;
c.y;
c.y = 1;
c.foo();

C.a;
C.b();
C.b = 1;
C.foo();

//// [classPropertyIsPublicByDefault.js]
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
