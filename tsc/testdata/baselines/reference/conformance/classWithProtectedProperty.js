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
"use strict";
// accessing any protected outside the class is an error
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
class C {
    constructor() {
        this.a = '';
        this.b = '';
        this.d = __setFunctionName(() => '', "d");
    }
    c() { return ''; }
    static f() { return ''; }
}
C.g = __setFunctionName(() => '', "g");
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
