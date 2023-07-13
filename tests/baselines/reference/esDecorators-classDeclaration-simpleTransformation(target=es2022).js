//// [tests/cases/conformance/esDecorators/classDeclaration/esDecorators-classDeclaration-simpleTransformation.ts] ////

//// [esDecorators-classDeclaration-simpleTransformation.ts]
declare let dec: any;

@dec
class C {
}


//// [esDecorators-classDeclaration-simpleTransformation.js]
let C = (() => {
    let _classDecorators = [dec];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var C = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            C = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
    };
    return C = _classThis;
})();
