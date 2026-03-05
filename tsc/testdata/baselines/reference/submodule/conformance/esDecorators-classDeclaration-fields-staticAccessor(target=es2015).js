//// [tests/cases/conformance/esDecorators/classDeclaration/fields/esDecorators-classDeclaration-fields-staticAccessor.ts] ////

//// [esDecorators-classDeclaration-fields-staticAccessor.ts]
declare let dec: any;

const field3 = "field3";

class C {
    @dec(1) static accessor field1 = 1;
    @dec(2) static accessor ["field2"] = 2;
    @dec(3) static accessor [field3] = 3;
}

@dec
class D {
    static accessor field1 = 1;
    static {
        this.field1;
        this.field1 = 1;
    }
}

//// [esDecorators-classDeclaration-fields-staticAccessor.js]
"use strict";
var _a, _C_field1_accessor_storage, _C__a_accessor_storage, _C__b_accessor_storage, _b, _c, _D_field1_1_accessor_storage;
const field3 = "field3";
class C {
    static get field1() { return __classPrivateFieldGet(_a, _a, "f", _C_field1_accessor_storage); }
    static set field1(value) { __classPrivateFieldSet(_a, _a, value, "f", _C_field1_accessor_storage); }
    static get ["field2"]() { return __classPrivateFieldGet(_a, _a, "f", _C__a_accessor_storage); }
    static set ["field2"](value) { __classPrivateFieldSet(_a, _a, value, "f", _C__a_accessor_storage); }
    static get [_b = field3]() { return __classPrivateFieldGet(_a, _a, "f", _C__b_accessor_storage); }
    static set [_b](value) { __classPrivateFieldSet(_a, _a, value, "f", _C__b_accessor_storage); }
}
_a = C;
_C_field1_accessor_storage = { value: 1 };
_C__a_accessor_storage = { value: 2 };
_C__b_accessor_storage = { value: 3 };
class D {
    static get field1() { return __classPrivateFieldGet(_c, _c, "f", _D_field1_1_accessor_storage); }
    static set field1(value) { __classPrivateFieldSet(_c, _c, value, "f", _D_field1_1_accessor_storage); }
}
_c = D;
_D_field1_1_accessor_storage = { value: 1 };
(() => {
    _c.field1;
    _c.field1 = 1;
})();
