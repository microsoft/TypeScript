//// [tests/cases/conformance/esDecorators/classDeclaration/fields/esDecorators-classDeclaration-fields-nonStaticPrivateAccessor.ts] ////

//// [esDecorators-classDeclaration-fields-nonStaticPrivateAccessor.ts]
declare let dec: any;

class C {
    @dec accessor #field1 = 0;
}


//// [esDecorators-classDeclaration-fields-nonStaticPrivateAccessor.js]
"use strict";
var _C_instances, _C_field1_get, _C_field1_set, _C_field1_accessor_storage;
class C {
    constructor() {
        _C_instances.add(this);
        _C_field1_accessor_storage.set(this, 0);
    }
}
_C_instances = new WeakSet(), _C_field1_accessor_storage = new WeakMap(), _C_field1_get = function _C_field1_get() { return __classPrivateFieldGet(this, _C_field1_accessor_storage, "f"); }, _C_field1_set = function _C_field1_set(value) { __classPrivateFieldSet(this, _C_field1_accessor_storage, value, "f"); };
