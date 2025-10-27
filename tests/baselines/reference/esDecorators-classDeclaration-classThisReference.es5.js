//// [tests/cases/conformance/esDecorators/classDeclaration/classThisReference/esDecorators-classDeclaration-classThisReference.es5.ts] ////

//// [esDecorators-classDeclaration-classThisReference.es5.ts]
declare let dec: any;

@dec
class C {
    static { this; }
    static x: any = this;
    static m() { this; }
    static get g() { return this; }
}


//// [esDecorators-classDeclaration-classThisReference.es5.js]
let C = (() => {
    let _classDecorators = [dec];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var C = _classThis = class {
        static m() { this; }
        static get g() { return this; }
    };
    __setFunctionName(_classThis, "C");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        C = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    })();
    (() => {
        _classThis;
    })();
    _classThis.x = _classThis;
    (() => {
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return C = _classThis;
})();
