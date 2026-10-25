//// [tests/cases/conformance/esDecorators/classDeclaration/esDecorators-classDeclaration-setFunctionNameComputedField.ts] ////

//// [esDecorators-classDeclaration-setFunctionNameComputedField.ts]
declare let dec: any;

const keys = {
    get field(): "field" { return "field"; }
};

@dec class C {
    #self = C;
    [keys.field] = 0;
}

export {};


//// [esDecorators-classDeclaration-setFunctionNameComputedField.js]
const keys = {
    get field() { return "field"; }
};
let C = (() => {
    var _a, _b;
    let _classDecorators = [dec];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var C = class {
        static { _classThis = this; }
        constructor() {
            this.#self = C;
            this[_b] = 0;
        }
        static { _b = keys.field; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            C = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        #self;
    };
    return C = _classThis;
})();
export {};
