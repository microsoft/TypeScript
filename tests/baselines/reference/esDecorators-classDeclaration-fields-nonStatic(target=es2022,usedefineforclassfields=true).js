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
    let _instanceExtraInitializers = [];
    let _field1_decorators;
    let _field1_initializers = [];
    let _member_decorators;
    let _member_initializers = [];
    let _member_decorators_1;
    let _member_initializers_1 = [];
    return class C {
        static {
            __esDecorate(null, null, _field1_decorators, { kind: "field", name: "field1", static: false, private: false }, _field1_initializers, _instanceExtraInitializers);
            __esDecorate(null, null, _member_decorators, { kind: "field", name: "field2", static: false, private: false }, _member_initializers, _instanceExtraInitializers);
            __esDecorate(null, null, _member_decorators_1, { kind: "field", name: _a, static: false, private: false }, _member_initializers_1, _instanceExtraInitializers);
        }
        field1 = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _field1_initializers, 1));
        ["field2"] = __runInitializers(this, _member_initializers, 2);
        [(_field1_decorators = [dec(1)], _member_decorators = [dec(2)], _member_decorators_1 = [dec(3)], _a = __propKey(field3))] = __runInitializers(this, _member_initializers_1, 3);
    };
})();
