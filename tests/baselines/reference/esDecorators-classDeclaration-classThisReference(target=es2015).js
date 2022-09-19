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
    var _a, _a_accessor_storage;
    let _classDecorators = [dec];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var C = (_a = class {
            static get a() { return __classPrivateFieldGet(_a, _a, "f", _a_accessor_storage); }
            static set a(value) { __classPrivateFieldSet(_a, _a, value, "f", _a_accessor_storage); }
            static m() { this; }
            static get g() { return this; }
        },
        __setFunctionName(_a, "C"),
        (() => {
            __esDecorate(null, _classDescriptor = { value: _a }, _classDecorators, { kind: "class", name: _a.name }, null, _classExtraInitializers);
            C = _classThis = _classDescriptor.value;
        })(),
        (() => {
            _classThis;
        })(),
        _a.x = _classThis,
        _a_accessor_storage = { value: _classThis },
        (() => {
            __runInitializers(_classThis, _classExtraInitializers);
        })(),
        _a);
    return C = _classThis;
})();
