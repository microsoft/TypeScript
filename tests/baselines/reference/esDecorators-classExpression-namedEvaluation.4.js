//// [tests/cases/conformance/esDecorators/classExpression/namedEvaluation/esDecorators-classExpression-namedEvaluation.4.ts] ////

//// [esDecorators-classExpression-namedEvaluation.4.ts]
declare let dec: any, obj: any;

// 8.6.3 RS: IteratorBindingInitialization
//  SingleNameBinding : BindingIdentifier Initializer?

{ const [x = @dec class { }] = obj; }
{ const [x = class { @dec y: any; }] = obj; }

// 14.3.3.3 RS: KeyedBindingInitialization
//  SingleNameBinding : BindingIdentifier Initializer?

{ const { x = @dec class { } } = obj; }
{ const { x = class { @dec y: any; } } = obj; }

{ const { y: x = @dec class { } } = obj; }
{ const { y: x = class { @dec y: any; } } = obj; }



//// [esDecorators-classExpression-namedEvaluation.4.js]
// 8.6.3 RS: IteratorBindingInitialization
//  SingleNameBinding : BindingIdentifier Initializer?
{
    const [x = (() => {
        let _classDecorators = [dec];
        let _classDescriptor;
        let _classExtraInitializers = [];
        let _classThis;
        var class_1 = class {
            static { _classThis = this; }
            static { __setFunctionName(_classThis, "x"); }
            static {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                class_1 = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            }
        };
        return class_1 = _classThis;
    })()] = obj;
}
{
    const [x = (() => {
        let _y_decorators;
        let _y_initializers = [];
        let _y_extraInitializers = [];
        return class {
            static { __setFunctionName(this, "x"); }
            static {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _y_decorators = [dec];
                __esDecorate(null, null, _y_decorators, { kind: "field", name: "y", static: false, private: false, access: { has: obj => "y" in obj, get: obj => obj.y, set: (obj, value) => { obj.y = value; } }, metadata: _metadata }, _y_initializers, _y_extraInitializers);
                if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            }
            y = __runInitializers(this, _y_initializers, void 0);
            constructor() {
                __runInitializers(this, _y_extraInitializers);
            }
        };
    })()] = obj;
}
// 14.3.3.3 RS: KeyedBindingInitialization
//  SingleNameBinding : BindingIdentifier Initializer?
{
    const { x = (() => {
        let _classDecorators = [dec];
        let _classDescriptor;
        let _classExtraInitializers = [];
        let _classThis;
        var class_2 = class {
            static { _classThis = this; }
            static { __setFunctionName(_classThis, "x"); }
            static {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                class_2 = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            }
        };
        return class_2 = _classThis;
    })() } = obj;
}
{
    const { x = (() => {
        let _y_decorators;
        let _y_initializers = [];
        let _y_extraInitializers = [];
        return class {
            static { __setFunctionName(this, "x"); }
            static {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _y_decorators = [dec];
                __esDecorate(null, null, _y_decorators, { kind: "field", name: "y", static: false, private: false, access: { has: obj => "y" in obj, get: obj => obj.y, set: (obj, value) => { obj.y = value; } }, metadata: _metadata }, _y_initializers, _y_extraInitializers);
                if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            }
            y = __runInitializers(this, _y_initializers, void 0);
            constructor() {
                __runInitializers(this, _y_extraInitializers);
            }
        };
    })() } = obj;
}
{
    const { y: x = (() => {
        let _classDecorators = [dec];
        let _classDescriptor;
        let _classExtraInitializers = [];
        let _classThis;
        var class_3 = class {
            static { _classThis = this; }
            static { __setFunctionName(_classThis, "x"); }
            static {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                class_3 = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            }
        };
        return class_3 = _classThis;
    })() } = obj;
}
{
    const { y: x = (() => {
        let _y_decorators;
        let _y_initializers = [];
        let _y_extraInitializers = [];
        return class {
            static { __setFunctionName(this, "x"); }
            static {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _y_decorators = [dec];
                __esDecorate(null, null, _y_decorators, { kind: "field", name: "y", static: false, private: false, access: { has: obj => "y" in obj, get: obj => obj.y, set: (obj, value) => { obj.y = value; } }, metadata: _metadata }, _y_initializers, _y_extraInitializers);
                if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            }
            y = __runInitializers(this, _y_initializers, void 0);
            constructor() {
                __runInitializers(this, _y_extraInitializers);
            }
        };
    })() } = obj;
}
