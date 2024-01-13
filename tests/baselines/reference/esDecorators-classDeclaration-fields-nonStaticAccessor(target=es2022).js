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
    var _a;
    let _field1_decorators;
    let _field1_initializers = [];
    let _field1_extraInitializers = [];
    let _member_decorators;
    let _member_initializers = [];
    let _member_extraInitializers = [];
    let _member_decorators_1;
    let _member_initializers_1 = [];
    let _member_extraInitializers_1 = [];
    return class C {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(this, null, _field1_decorators, { kind: "accessor", name: "field1", static: false, private: false, access: { has: obj => "field1" in obj, get: obj => obj.field1, set: (obj, value) => { obj.field1 = value; } }, metadata: _metadata }, _field1_initializers, _field1_extraInitializers);
            __esDecorate(this, null, _member_decorators, { kind: "accessor", name: "field2", static: false, private: false, access: { has: obj => "field2" in obj, get: obj => obj["field2"], set: (obj, value) => { obj["field2"] = value; } }, metadata: _metadata }, _member_initializers, _member_extraInitializers);
            __esDecorate(this, null, _member_decorators_1, { kind: "accessor", name: _a, static: false, private: false, access: { has: obj => _a in obj, get: obj => obj[_a], set: (obj, value) => { obj[_a] = value; } }, metadata: _metadata }, _member_initializers_1, _member_extraInitializers_1);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        #field1_accessor_storage = __runInitializers(this, _field1_initializers, 1);
        get field1() { return this.#field1_accessor_storage; }
        set field1(value) { this.#field1_accessor_storage = value; }
        #_a_accessor_storage = (__runInitializers(this, _field1_extraInitializers), __runInitializers(this, _member_initializers, 2));
        get ["field2"]() { return this.#_a_accessor_storage; }
        set ["field2"](value) { this.#_a_accessor_storage = value; }
        #_b_accessor_storage = (__runInitializers(this, _member_extraInitializers), __runInitializers(this, _member_initializers_1, 3));
        get [(_field1_decorators = [dec(1)], _member_decorators = [dec(2)], _member_decorators_1 = [dec(3)], _a = __propKey(field3))]() { return this.#_b_accessor_storage; }
        set [_a](value) { this.#_b_accessor_storage = value; }
        constructor() {
            __runInitializers(this, _member_extraInitializers_1);
        }
    };
})();
