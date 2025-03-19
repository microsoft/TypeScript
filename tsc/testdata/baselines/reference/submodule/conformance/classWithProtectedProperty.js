//// [tests/cases/conformance/types/members/classWithProtectedProperty.ts] ////

//// [classWithProtectedProperty.ts]
// accessing any protected outside the class is an error

class C {
    protected x;
    protected a = '';
    protected b: string = '';
    protected c() { return '' }
    protected d = () => '';
    protected static e;
    protected static f() { return '' }
    protected static g = () => '';
}

class D extends C {
    method() {
        // No errors
        var d = new D();
        var r1: string = d.x;
        var r2: string = d.a;
        var r3: string = d.b;
        var r4: string = d.c();
        var r5: string = d.d();
        var r6: string = C.e;
        var r7: string = C.f();
        var r8: string = C.g();
    }
}

//// [classWithProtectedProperty.js]
// accessing any protected outside the class is an error
class C {
    x;
    a = '';
    b = '';
    c() { return ''; }
    d = () => '';
    static e;
    static f() { return ''; }
    static g = () => '';
}
class D extends C {
    method() {
        // No errors
        var d = new D();
        var r1 = d.x;
        var r2 = d.a;
        var r3 = d.b;
        var r4 = d.c();
        var r5 = d.d();
        var r6 = C.e;
        var r7 = C.f();
        var r8 = C.g();
    }
}
