//// [tests/cases/conformance/esDecorators/classDeclaration/classThisReference/esDecorators-classDeclaration-classThisReference.ts] ////

//// [esDecorators-classDeclaration-classThisReference.ts]
declare let dec: any;

@dec
class C {
    static { this; }
    static x: any = this;
    static accessor a: any = this;
    static m() { this; }
    static get g() { return this; }
}


//// [esDecorators-classDeclaration-classThisReference.js]
"use strict";
var _a, _C_a_accessor_storage;
class C {
    static get a() { return __classPrivateFieldGet(_a, _a, "f", _C_a_accessor_storage); }
    static set a(value) { __classPrivateFieldSet(_a, _a, value, "f", _C_a_accessor_storage); }
    static m() { this; }
    static get g() { return this; }
}
_a = C;
(() => {
    _a;
})();
C.x = _a;
_C_a_accessor_storage = { value: _a };
