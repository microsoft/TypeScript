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
    var _a, _C_field1_accessor_storage, _C__a_accessor_storage, _C__b_accessor_storage;
    var _b;
    let _staticExtraInitializers = [];
    let _static_field1_decorators;
    let _static_field1_initializers = [];
    let _static_member_decorators;
    let _static_member_initializers = [];
    let _static_member_decorators_1;
    let _static_member_initializers_1 = [];
    return _a = class C {
            static get field1() { return __classPrivateFieldGet(this, _a, "f", _C_field1_accessor_storage); }
            static set field1(value) { __classPrivateFieldSet(this, _a, value, "f", _C_field1_accessor_storage); }
            static get ["field2"]() { return __classPrivateFieldGet(this, _a, "f", _C__a_accessor_storage); }
            static set ["field2"](value) { __classPrivateFieldSet(this, _a, value, "f", _C__a_accessor_storage); }
            static get [(_static_field1_decorators = [dec(1)], _static_member_decorators = [dec(2)], _static_member_decorators_1 = [dec(3)], _b = __propKey(field3))]() { return __classPrivateFieldGet(this, _a, "f", _C__b_accessor_storage); }
            static set [_b](value) { __classPrivateFieldSet(this, _a, value, "f", _C__b_accessor_storage); }
        },
        (() => {
            __esDecorate(_a, null, _static_field1_decorators, { kind: "accessor", name: "field1", static: true, private: false, access: { has: obj => "field1" in obj, get: obj => obj.field1, set: (obj, value) => { obj.field1 = value; } } }, _static_field1_initializers, _staticExtraInitializers);
            __esDecorate(_a, null, _static_member_decorators, { kind: "accessor", name: "field2", static: true, private: false, access: { has: obj => "field2" in obj, get: obj => obj["field2"], set: (obj, value) => { obj["field2"] = value; } } }, _static_member_initializers, _staticExtraInitializers);
            __esDecorate(_a, null, _static_member_decorators_1, { kind: "accessor", name: _b, static: true, private: false, access: { has: obj => _b in obj, get: obj => obj[_b], set: (obj, value) => { obj[_b] = value; } } }, _static_member_initializers_1, _staticExtraInitializers);
            __runInitializers(_a, _staticExtraInitializers);
        })(),
        _C_field1_accessor_storage = { value: __runInitializers(_a, _static_field1_initializers, 1) },
        _C__a_accessor_storage = { value: __runInitializers(_a, _static_member_initializers, 2) },
        _C__b_accessor_storage = { value: __runInitializers(_a, _static_member_initializers_1, 3) },
        _a;
})();
let D = (() => {
    var _field1_accessor_storage;
    let _classDecorators = [dec];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var D = _classThis = class {
        static get field1() { return __classPrivateFieldGet(this, _classThis, "f", _field1_accessor_storage); }
        static set field1(value) { __classPrivateFieldSet(this, _classThis, value, "f", _field1_accessor_storage); }
    };
    __setFunctionName(_classThis, "D");
    (() => {
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name }, null, _classExtraInitializers);
        D = _classThis = _classDescriptor.value;
    })();
    _field1_accessor_storage = { value: 1 };
    (() => {
        _classThis.field1;
        _classThis.field1 = 1;
    })();
    (() => {
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return D = _classThis;
})();
