//// [tests/cases/conformance/esDecorators/classDeclaration/esDecorators-classDeclaration-setFunctionName.ts] ////

//// [a.ts]
declare let dec: any;

@dec class C {}

export {}

//// [b.ts]
declare let dec: any;

@dec export class C {}

//// [c.ts]
declare let dec: any;

@dec export default class C {}

//// [c.ts]
declare let dec: any;

@dec export default class {}


//// [a.js]
let C = (() => {
    var _a;
    let _classDecorators = [dec];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var C = (_a = class {
        },
        __setFunctionName(_a, "C"),
        (() => {
            __esDecorate(null, _classDescriptor = { value: _a }, _classDecorators, { kind: "class", name: _a.name }, null, _classExtraInitializers);
            C = _classThis = _classDescriptor.value;
            __runInitializers(_classThis, _classExtraInitializers);
        })(),
        _a);
    return C;
})();
export {};
//// [b.js]
export let C = (() => {
    var _a;
    let _classDecorators = [dec];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var C = (_a = class {
        },
        __setFunctionName(_a, "C"),
        (() => {
            __esDecorate(null, _classDescriptor = { value: _a }, _classDecorators, { kind: "class", name: _a.name }, null, _classExtraInitializers);
            C = _classThis = _classDescriptor.value;
            __runInitializers(_classThis, _classExtraInitializers);
        })(),
        _a);
    return C;
})();
//// [c.js]
export default (() => {
    var _a;
    let _classDecorators = [dec];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var default_1 = (_a = class {
        },
        (() => {
            __setFunctionName(_a, "default");
            __esDecorate(null, _classDescriptor = { value: _a }, _classDecorators, { kind: "class", name: _a.name }, null, _classExtraInitializers);
            default_1 = _classThis = _classDescriptor.value;
            __runInitializers(_classThis, _classExtraInitializers);
        })(),
        _a);
    return default_1;
})();
