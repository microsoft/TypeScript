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
"use strict";
// accessing any private outside the class is an error
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
var c = new C();
var r1 = c.x;
var r2 = c.a;
var r3 = c.b;
var r4 = c.c();
var r5 = c.d();
var r6 = C.e;
var r7 = C.f();
var r8 = C.g();
