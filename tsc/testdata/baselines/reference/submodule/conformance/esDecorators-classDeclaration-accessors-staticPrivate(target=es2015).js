//// [tests/cases/conformance/esDecorators/classDeclaration/accessors/esDecorators-classDeclaration-accessors-staticPrivate.ts] ////

//// [esDecorators-classDeclaration-accessors-staticPrivate.ts]
declare let dec: any;

class C {
    @dec(1) static get #method1() { return 0; }
    @dec(2) static set #method1(value) {}
}

@dec
class D {
    static get #method1() { return 0; }
    static set #method1(value) {}
    static {
        this.#method1;
        this.#method1 = 1;
    }
}


//// [esDecorators-classDeclaration-accessors-staticPrivate.js]
"use strict";
var _a, _C_method1_get, _C_method1_set, _b, _D_method1_get, _D_method1_set;
class C {
}
_a = C, _C_method1_get = function _C_method1_get() { return 0; }, _C_method1_set = function _C_method1_set(value) { };
class D {
}
_b = D, _D_method1_get = function _D_method1_get() { return 0; }, _D_method1_set = function _D_method1_set(value) { };
(() => {
    __classPrivateFieldGet(_b, _b, "a", _D_method1_get);
    __classPrivateFieldSet(_b, _b, 1, "a", _D_method1_set);
})();
