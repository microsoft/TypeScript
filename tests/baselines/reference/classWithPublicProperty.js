//// [tests/cases/conformance/types/members/classWithPublicProperty.ts] ////

//// [classWithPublicProperty.ts]
class C {
    public x;
    public a = '';
    public b: string = '';
    public c() { return '' }
    public d = () => '';
    public static e;
    public static f() { return '' }
    public static g = () => '';
}

// all of these are valid
var c = new C();
var r1: string = c.x;
var r2: string = c.a;
var r3: string = c.b;
var r4: string = c.c();
var r5: string = c.d();
var r6: string = C.e;
var r7: string = C.f();
var r8: string = C.g();

//// [classWithPublicProperty.js]
var C = /** @class */ (function () {
    function C() {
        this.a = '';
        this.b = '';
        this.d = function () { return ''; };
    }
    C.prototype.c = function () { return ''; };
    C.f = function () { return ''; };
    C.g = function () { return ''; };
    return C;
}());
// all of these are valid
var c = new C();
var r1 = c.x;
var r2 = c.a;
var r3 = c.b;
var r4 = c.c();
var r5 = c.d();
var r6 = C.e;
var r7 = C.f();
var r8 = C.g();
