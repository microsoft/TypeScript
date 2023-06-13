//// [tests/cases/conformance/esDecorators/classDeclaration/classThisReference/esDecorators-classDeclaration-classThisReference.ts] ////

//// [esDecorators-classDeclaration-classThisReference.ts]
declare let dec: any;

@dec
class C {
    static { this; }
    static x: any = this;
    static accessor a: any = this;
    static m() { this; }
    static get g() { return this; }
}


//// [esDecorators-classDeclaration-classThisReference.js]
let C = (() => {
    var _a_accessor_storage;
    let _classDecorators = [dec];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var C = _classThis = class {
        static get a() { return __classPrivateFieldGet(this, _classThis, "f", _a_accessor_storage); }
        static set a(value) { __classPrivateFieldSet(this, _classThis, value, "f", _a_accessor_storage); }
        static m() { this; }
        static get g() { return this; }
    };
    __setFunctionName(_classThis, "C");
    (() => {
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name }, null, _classExtraInitializers);
        C = _classThis = _classDescriptor.value;
    })();
    (() => {
        _classThis;
    })();
    _classThis.x = _classThis;
    _a_accessor_storage = { value: _classThis };
    (() => {
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return C = _classThis;
})();
