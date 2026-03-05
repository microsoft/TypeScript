//// [tests/cases/conformance/esDecorators/classDeclaration/fields/esDecorators-classDeclaration-fields-staticPrivateAccessor.ts] ////

//// [esDecorators-classDeclaration-fields-staticPrivateAccessor.ts]
declare let dec: any;

class C {
    @dec static accessor #field1 = 0;
}

@dec
class D {
    static accessor #field1 = 0;
    static {
        this.#field1;
        this.#field1 = 1;
    }
}


//// [esDecorators-classDeclaration-fields-staticPrivateAccessor.js]
"use strict";
var _a, _C_field1_get, _C_field1_set, _C_field1_accessor_storage, _b, _D_field1_get, _D_field1_set, _D_field1_1_accessor_storage;
class C {
}
_a = C, _C_field1_get = function _C_field1_get() { return __classPrivateFieldGet(_a, _a, "f", _C_field1_accessor_storage); }, _C_field1_set = function _C_field1_set(value) { __classPrivateFieldSet(_a, _a, value, "f", _C_field1_accessor_storage); };
_C_field1_accessor_storage = { value: 0 };
class D {
}
_b = D, _D_field1_get = function _D_field1_get() { return __classPrivateFieldGet(_b, _b, "f", _D_field1_1_accessor_storage); }, _D_field1_set = function _D_field1_set(value) { __classPrivateFieldSet(_b, _b, value, "f", _D_field1_1_accessor_storage); };
_D_field1_1_accessor_storage = { value: 0 };
(() => {
    __classPrivateFieldGet(_b, _b, "a", _D_field1_get);
    __classPrivateFieldSet(_b, _b, 1, "a", _D_field1_set);
})();
