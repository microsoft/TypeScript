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