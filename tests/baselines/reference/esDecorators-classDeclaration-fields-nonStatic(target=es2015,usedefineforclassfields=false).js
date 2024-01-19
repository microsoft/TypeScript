//// [tests/cases/conformance/esDecorators/classDeclaration/fields/esDecorators-classDeclaration-fields-nonStatic.ts] ////

//// [esDecorators-classDeclaration-fields-nonStatic.ts]
declare let dec: any;

const field3 = "field3";

class C {
    @dec(1) field1 = 1;
    @dec(2) ["field2"] = 2;
    @dec(3) [field3] = 3;
}


//// [esDecorators-classDeclaration-fields-nonStatic.js]
const field3 = "field3";
let C = (() => {
    var _a;
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
            constructor() {
                this.field1 = __runInitializers(this, _field1_initializers, 1);
                this["field2"] = (__runInitializers(this, _field1_extraInitializers), __runInitializers(this, _member_initializers, 2));
                this[_b] = (__runInitializers(this, _member_extraInitializers), __runInitializers(this, _member_initializers_1, 3));
                __runInitializers(this, _member_extraInitializers_1);
            }
        },
        _field1_decorators = [dec(1)],
        _member_decorators = [dec(2)],
        _member_decorators_1 = [dec(3)],
        _b = __propKey(field3),
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, null, _field1_decorators, { kind: "field", name: "field1", static: false, private: false, access: { has: obj => "field1" in obj, get: obj => obj.field1, set: (obj, value) => { obj.field1 = value; } }, metadata: _metadata }, _field1_initializers, _field1_extraInitializers);
            __esDecorate(null, null, _member_decorators, { kind: "field", name: "field2", static: false, private: false, access: { has: obj => "field2" in obj, get: obj => obj["field2"], set: (obj, value) => { obj["field2"] = value; } }, metadata: _metadata }, _member_initializers, _member_extraInitializers);
            __esDecorate(null, null, _member_decorators_1, { kind: "field", name: _b, static: false, private: false, access: { has: obj => _b in obj, get: obj => obj[_b], set: (obj, value) => { obj[_b] = value; } }, metadata: _metadata }, _member_initializers_1, _member_extraInitializers_1);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
