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
    let _classDecorators = [dec];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var C = _classThis = class {
    };
    __setFunctionName(_classThis, "C");
    (() => {
        const metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : undefined;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: metadata }, null, _classExtraInitializers);
        C = _classThis = _classDescriptor.value;
        if (metadata) Object.defineProperty(_classThis, Symbol.metadata, { configurable: true, writable: true, enumerable: true, value: metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return C = _classThis;
})();
export {};
//// [b.js]
export let C = (() => {
    let _classDecorators = [dec];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var C = _classThis = class {
    };
    __setFunctionName(_classThis, "C");
    (() => {
        const metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : undefined;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: metadata }, null, _classExtraInitializers);
        C = _classThis = _classDescriptor.value;
        if (metadata) Object.defineProperty(_classThis, Symbol.metadata, { configurable: true, writable: true, enumerable: true, value: metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return C = _classThis;
})();
//// [c.js]
export default (() => {
    let _classDecorators = [dec];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var default_1 = _classThis = class {
    };
    (() => {
        __setFunctionName(_classThis, "default");
        const metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : undefined;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: metadata }, null, _classExtraInitializers);
        default_1 = _classThis = _classDescriptor.value;
        if (metadata) Object.defineProperty(_classThis, Symbol.metadata, { configurable: true, writable: true, enumerable: true, value: metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return default_1 = _classThis;
})();
