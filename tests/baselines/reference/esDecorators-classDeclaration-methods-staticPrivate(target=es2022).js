//// [esDecorators-classDeclaration-methods-staticPrivate.ts]
declare let dec: any;

class C {
    @dec static #method1() {}
}

@dec
class D {
    static #method1() {}
}


//// [esDecorators-classDeclaration-methods-staticPrivate.js]
let C = (() => {
    let _staticExtraInitializers = [];
    let _static_private_method1_decorators;
    let _static_private_method1_descriptor;
    return class C {
        static {
            _static_private_method1_decorators = [dec];
            __esDecorate(this, _static_private_method1_descriptor = { value: __setFunctionName(function () { }, "#method1") }, _static_private_method1_decorators, { kind: "method", name: "#method1", static: true, private: true }, null, _staticExtraInitializers);
            __runInitializers(this, _staticExtraInitializers);
        }
        static get #method1() { return _static_private_method1_descriptor.value; }
    };
})();
let D = (() => {
    var _method1;
    let _classDecorators = [dec];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var D = class {
        static { __setFunctionName(this, "D"); }
        static { _method1 = function _method1() { }; }
        static {
            __esDecorate(null, _classDescriptor = { value: this }, _classDecorators, { kind: "class", name: this.name }, null, _classExtraInitializers);
            D = _classThis = _classDescriptor.value;
            __runInitializers(_classThis, _classExtraInitializers);
        }
    };
    return D = _classThis;
})();
