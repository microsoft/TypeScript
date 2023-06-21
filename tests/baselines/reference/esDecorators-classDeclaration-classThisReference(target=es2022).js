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
    var C = class {
        static { __setFunctionName(this, "C"); }
        static {
            __esDecorate(null, _classDescriptor = { value: this }, _classDecorators, { kind: "class", name: this.name }, null, _classExtraInitializers);
            C = _classThis = _classDescriptor.value;
        }
        static { _classThis; }
        static x = _classThis;
        static {
            _a_accessor_storage = { value: _classThis };
        }
        static get a() { return __classPrivateFieldGet(this, _classThis, "f", _a_accessor_storage); }
        static set a(value) { __classPrivateFieldSet(this, _classThis, value, "f", _a_accessor_storage); }
        static m() { this; }
        static get g() { return this; }
        static {
            __runInitializers(_classThis, _classExtraInitializers);
        }
    };
    return C = _classThis;
})();
