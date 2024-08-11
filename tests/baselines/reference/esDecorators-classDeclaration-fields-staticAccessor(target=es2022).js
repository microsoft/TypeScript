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
const field3 = "field3";
let C = (() => {
    var _a;
    let _static_field1_decorators;
    let _static_field1_initializers = [];
    let _static_field1_extraInitializers = [];
    let _static_member_decorators;
    let _static_member_initializers = [];
    let _static_member_extraInitializers = [];
    let _static_member_decorators_1;
    let _static_member_initializers_1 = [];
    let _static_member_extraInitializers_1 = [];
    return class C {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(this, null, _static_field1_decorators, { kind: "accessor", name: "field1", static: true, private: false, access: { has: obj => "field1" in obj, get: obj => obj.field1, set: (obj, value) => { obj.field1 = value; } }, metadata: _metadata }, _static_field1_initializers, _static_field1_extraInitializers);
            __esDecorate(this, null, _static_member_decorators, { kind: "accessor", name: "field2", static: true, private: false, access: { has: obj => "field2" in obj, get: obj => obj["field2"], set: (obj, value) => { obj["field2"] = value; } }, metadata: _metadata }, _static_member_initializers, _static_member_extraInitializers);
            __esDecorate(this, null, _static_member_decorators_1, { kind: "accessor", name: _a, static: true, private: false, access: { has: obj => _a in obj, get: obj => obj[_a], set: (obj, value) => { obj[_a] = value; } }, metadata: _metadata }, _static_member_initializers_1, _static_member_extraInitializers_1);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static #field1_accessor_storage = __runInitializers(this, _static_field1_initializers, 1);
        static get field1() { return C.#field1_accessor_storage; }
        static set field1(value) { C.#field1_accessor_storage = value; }
        static #_a_accessor_storage = (__runInitializers(this, _static_field1_extraInitializers), __runInitializers(this, _static_member_initializers, 2));
        static get ["field2"]() { return C.#_a_accessor_storage; }
        static set ["field2"](value) { C.#_a_accessor_storage = value; }
        static #_b_accessor_storage = (__runInitializers(this, _static_member_extraInitializers), __runInitializers(this, _static_member_initializers_1, 3));
        static get [(_static_field1_decorators = [dec(1)], _static_member_decorators = [dec(2)], _static_member_decorators_1 = [dec(3)], _a = __propKey(field3))]() { return C.#_b_accessor_storage; }
        static set [_a](value) { C.#_b_accessor_storage = value; }
        static {
            __runInitializers(this, _static_member_extraInitializers_1);
        }
    };
})();
let D = (() => {
    var _D_field1_accessor_storage;
    let _classDecorators = [dec];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var D = class {
        static { _classThis = this; }
        static { __setFunctionName(this, "D"); }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            D = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static {
            _D_field1_accessor_storage = { value: 1 };
        }
        static get field1() { return __classPrivateFieldGet(_classThis, _classThis, "f", _D_field1_accessor_storage); }
        static set field1(value) { __classPrivateFieldSet(_classThis, _classThis, value, "f", _D_field1_accessor_storage); }
        static {
            _classThis.field1;
            _classThis.field1 = 1;
        }
        static {
            __runInitializers(_classThis, _classExtraInitializers);
        }
    };
    return D = _classThis;
})();
