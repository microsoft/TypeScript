//// [tests/cases/conformance/types/members/classWithPrivateProperty.ts] ////

//// [classWithPrivateProperty.ts]
// accessing any private outside the class is an error

class C {
    private x;
    private a = '';
    private b: string = '';
    private c() { return '' }
    private d = () => '';
    private static e;
    private static f() { return '' }
    private static g = () => '';
}

var c = new C();
var r1: string = c.x;
var r2: string = c.a;
var r3: string = c.b;
var r4: string = c.c();
var r5: string = c.d();
var r6: string = C.e;
var r7: string = C.f();
var r8: string = C.g();

//// [classWithPrivateProperty.js]
// accessing any private outside the class is an error
class C {
    constructor() {
        this.a = '';
        this.b = '';
        this.d = () => '';
    }
    c() { return ''; }
    static f() { return ''; }
}
C.g = () => '';
var c = new C();
var r1 = c.x;
var r2 = c.a;
var r3 = c.b;
var r4 = c.c();
var r5 = c.d();
var r6 = C.e;
var r7 = C.f();
var r8 = C.g();
