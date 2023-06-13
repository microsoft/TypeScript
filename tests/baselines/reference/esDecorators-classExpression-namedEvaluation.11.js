//// [tests/cases/conformance/esDecorators/classExpression/namedEvaluation/esDecorators-classExpression-namedEvaluation.11.ts] ////

//// [esDecorators-classExpression-namedEvaluation.11.ts]
declare let dec: any;

// No NamedEvaluation, no class name

(@dec class {});
(class { @dec y: any });

// No NamedEvaluation, class name

(@dec class C {});
(class C { @dec y: any });


//// [esDecorators-classExpression-namedEvaluation.11.js]
// No NamedEvaluation, no class name
((() => {
    let _classDecorators = [dec];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var class_1 = class {
        static {
            __setFunctionName(this, "");
            __esDecorate(null, _classDescriptor = { value: this }, _classDecorators, { kind: "class", name: this.name }, null, _classExtraInitializers);
            class_1 = _classThis = _classDescriptor.value;
            __runInitializers(_classThis, _classExtraInitializers);
        }
    };
    return class_1 = _classThis;
})());
((() => {
    let _instanceExtraInitializers = [];
    let _y_decorators;
    let _y_initializers = [];
    return class {
        static {
            _y_decorators = [dec];
            __esDecorate(null, null, _y_decorators, { kind: "field", name: "y", static: false, private: false, access: { has: obj => "y" in obj, get: obj => obj.y, set: (obj, value) => { obj.y = value; } } }, _y_initializers, _instanceExtraInitializers);
        }
        y = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _y_initializers, void 0));
    };
})());
// No NamedEvaluation, class name
((() => {
    let _classDecorators_1 = [dec];
    let _classDescriptor_1;
    let _classExtraInitializers_1 = [];
    let _classThis_1;
    var C = class {
        static {
            __esDecorate(null, _classDescriptor_1 = { value: this }, _classDecorators_1, { kind: "class", name: this.name }, null, _classExtraInitializers_1);
            C = _classThis_1 = _classDescriptor_1.value;
            __runInitializers(_classThis_1, _classExtraInitializers_1);
        }
    };
    return C = _classThis_1;
})());
((() => {
    let _instanceExtraInitializers_1 = [];
    let _y_decorators;
    let _y_initializers = [];
    return class C {
        static {
            _y_decorators = [dec];
            __esDecorate(null, null, _y_decorators, { kind: "field", name: "y", static: false, private: false, access: { has: obj => "y" in obj, get: obj => obj.y, set: (obj, value) => { obj.y = value; } } }, _y_initializers, _instanceExtraInitializers_1);
        }
        y = (__runInitializers(this, _instanceExtraInitializers_1), __runInitializers(this, _y_initializers, void 0));
    };
})());
