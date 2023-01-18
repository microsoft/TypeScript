//// [esDecorators-classDeclaration-methods-static.ts]
declare let dec: any;

const method3 = "method3";

class C {
    @dec(1) static method1() {}
    @dec(2) static ["method2"]() {}
    @dec(3) static [method3]() {}
}


//// [esDecorators-classDeclaration-methods-static.js]
const method3 = "method3";
let C = (() => {
    var _a;
    var _b;
    let _staticExtraInitializers = [];
    let _static_method1_decorators;
    let _static_member_decorators;
    let _static_member_decorators_1;
    return _a = class C {
            static method1() { }
            static ["method2"]() { }
            static [(_static_method1_decorators = [dec(1)], _static_member_decorators = [dec(2)], _static_member_decorators_1 = [dec(3)], _b = __propKey(method3))]() { }
        },
        (() => {
            __esDecorate(_a, null, _static_method1_decorators, { kind: "method", name: "method1", static: true, private: false }, null, _staticExtraInitializers);
            __esDecorate(_a, null, _static_member_decorators, { kind: "method", name: "method2", static: true, private: false }, null, _staticExtraInitializers);
            __esDecorate(_a, null, _static_member_decorators_1, { kind: "method", name: _b, static: true, private: false }, null, _staticExtraInitializers);
            __runInitializers(_a, _staticExtraInitializers);
        })(),
        _a;
})();
