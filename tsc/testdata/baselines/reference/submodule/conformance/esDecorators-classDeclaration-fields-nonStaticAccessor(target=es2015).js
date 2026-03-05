//// [tests/cases/conformance/esDecorators/classDeclaration/fields/esDecorators-classDeclaration-fields-nonStaticAccessor.ts] ////

//// [esDecorators-classDeclaration-fields-nonStaticAccessor.ts]
declare let dec: any;

const field3 = "field3";

class C {
    @dec(1) accessor field1 = 1;
    @dec(2) accessor ["field2"] = 2;
    @dec(3) accessor [field3] = 3;
}


//// [esDecorators-classDeclaration-fields-nonStaticAccessor.js]
"use strict";
var _C_field1_accessor_storage, _C__a_accessor_storage, _C__b_accessor_storage, _a;
const field3 = "field3";
class C {
    constructor() {
        _C_field1_accessor_storage.set(this, 1);
        _C__a_accessor_storage.set(this, 2);
        _C__b_accessor_storage.set(this, 3);
    }
    get field1() { return __classPrivateFieldGet(this, _C_field1_accessor_storage, "f"); }
    set field1(value) { __classPrivateFieldSet(this, _C_field1_accessor_storage, value, "f"); }
    get [(_C_field1_accessor_storage = new WeakMap(), _C__a_accessor_storage = new WeakMap(), _C__b_accessor_storage = new WeakMap(), "field2")]() { return __classPrivateFieldGet(this, _C__a_accessor_storage, "f"); }
    set ["field2"](value) { __classPrivateFieldSet(this, _C__a_accessor_storage, value, "f"); }
    get [_a = field3]() { return __classPrivateFieldGet(this, _C__b_accessor_storage, "f"); }
    set [_a](value) { __classPrivateFieldSet(this, _C__b_accessor_storage, value, "f"); }
}
