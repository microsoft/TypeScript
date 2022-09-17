//// [esDecorators-classDeclaration-accessors-staticPrivate.ts]
declare let dec: any;

class C {
    @dec(1) static get #method1() { return 0; }
    @dec(2) static set #method1(value) {}
}

// TODO: We should translate these to weakmaps when < ESNext
@dec
class D {
    static get #method1() { return 0; }
    static set #method1(value) {}
    static {
        this.#method1;
        this.#method1 = 1;
    }
}


//// [esDecorators-classDeclaration-accessors-staticPrivate.js]
let C = (() => {
    let _staticExtraInitializers = [];
    let _static_private_get_method1_decorators;
    let _static_private_get_method1_descriptor;
    let _static_private_set_method1_decorators;
    let _static_private_set_method1_descriptor;
    return class C {
        static {
            _static_private_get_method1_decorators = [dec(1)];
            _static_private_set_method1_decorators = [dec(2)];
            __esDecorate(this, _static_private_get_method1_descriptor = { get: __setFunctionName(function () { return 0; }, "#method1") }, _static_private_get_method1_decorators, { kind: "getter", name: "#method1", static: true, private: true, access: { get() { return this.#method1; } } }, null, _staticExtraInitializers);
            __esDecorate(this, _static_private_set_method1_descriptor = { set: __setFunctionName(function (value) { }, "#method1") }, _static_private_set_method1_decorators, { kind: "setter", name: "#method1", static: true, private: true, access: { set(value) { this.#method1 = value; } } }, null, _staticExtraInitializers);
            __runInitializers(this, _staticExtraInitializers);
        }
        static get #method1() { return _static_private_get_method1_descriptor.get.call(this); }
        static set #method1(value) { return _static_private_set_method1_descriptor.set.call(this, value); }
    };
})();
let D = (() => {
    let _classDecorators = [dec];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var D = class {
        static {
            __esDecorate(null, _classDescriptor = { value: this }, _classDecorators, { kind: "class", name: this.name }, null, _classExtraInitializers);
            D = _classThis = _classDescriptor.value;
        }
        static get #method1() { return 0; }
        static set #method1(value) { }
        static {
            _classThis.#method1;
            _classThis.#method1 = 1;
        }
        static {
            __runInitializers(_classThis, _classExtraInitializers);
        }
    };
    return D;
})();
