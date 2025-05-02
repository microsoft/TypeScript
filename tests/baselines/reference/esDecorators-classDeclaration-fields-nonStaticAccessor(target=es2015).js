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
const field3 = "field3";
let C = (() => {
    var _a, _C_field1_accessor_storage, _C__a_accessor_storage, _C__b_accessor_storage;
    var _b;
    let _field1_decorators;
    let _field1_initializers = [];
    let _field1_extraInitializers = [];
    let _member_decorators;
    let _member_initializers = [];
    let _member_extraInitializers = [];
    let _member_decorators_1;
    let _member_initializers_1 = [];
    let _member_extraInitializers_1 = [];
    return _a = class C {
            get field1() { return __classPrivateFieldGet(this, _C_field1_accessor_storage, "f"); }
            set field1(value) { __classPrivateFieldSet(this, _C_field1_accessor_storage, value, "f"); }
            get [(_C_field1_accessor_storage = new WeakMap(), _C__a_accessor_storage = new WeakMap(), _C__b_accessor_storage = new WeakMap(), "field2")]() { return __classPrivateFieldGet(this, _C__a_accessor_storage, "f"); }
            set ["field2"](value) { __classPrivateFieldSet(this, _C__a_accessor_storage, value, "f"); }
            get [(_field1_decorators = [dec(1)], _member_decorators = [dec(2)], _member_decorators_1 = [dec(3)], _b = __propKey(field3))]() { return __classPrivateFieldGet(this, _C__b_accessor_storage, "f"); }
            set [_b](value) { __classPrivateFieldSet(this, _C__b_accessor_storage, value, "f"); }
            constructor() {
                _C_field1_accessor_storage.set(this, __runInitializers(this, _field1_initializers, 1));
                _C__a_accessor_storage.set(this, (__runInitializers(this, _field1_extraInitializers), __runInitializers(this, _member_initializers, 2)));
                _C__b_accessor_storage.set(this, (__runInitializers(this, _member_extraInitializers), __runInitializers(this, _member_initializers_1, 3)));
                __runInitializers(this, _member_extraInitializers_1);
            }
        },
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(_a, null, _field1_decorators, { kind: "accessor", name: "field1", static: false, private: false, access: { has: obj => "field1" in obj, get: obj => obj.field1, set: (obj, value) => { obj.field1 = value; } }, metadata: _metadata }, _field1_initializers, _field1_extraInitializers);
            __esDecorate(_a, null, _member_decorators, { kind: "accessor", name: "field2", static: false, private: false, access: { has: obj => "field2" in obj, get: obj => obj["field2"], set: (obj, value) => { obj["field2"] = value; } }, metadata: _metadata }, _member_initializers, _member_extraInitializers);
            __esDecorate(_a, null, _member_decorators_1, { kind: "accessor", name: _b, static: false, private: false, access: { has: obj => _b in obj, get: obj => obj[_b], set: (obj, value) => { obj[_b] = value; } }, metadata: _metadata }, _member_initializers_1, _member_extraInitializers_1);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
