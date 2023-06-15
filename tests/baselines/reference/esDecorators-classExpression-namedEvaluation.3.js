//// [tests/cases/conformance/esDecorators/classExpression/namedEvaluation/esDecorators-classExpression-namedEvaluation.3.ts] ////

//// [esDecorators-classExpression-namedEvaluation.3.ts]
declare let dec: any;

// 14.3.1.2 RS: Evaluation
//   LexicalBinding : BindingIdentifier Initializer

{ let x = @dec class { }; }
{ let x = class { @dec y: any; }; }

{ const x = @dec class { }; }
{ const x = class { @dec y: any; }; }

// 14.3.2.1 RS: Evaluation
//   VariableDeclaration : BindingIdentifier Initializer

{ var x2 = @dec class { }; }
{ var x1 = class { @dec y: any; }; }


//// [esDecorators-classExpression-namedEvaluation.3.js]
// 14.3.1.2 RS: Evaluation
//   LexicalBinding : BindingIdentifier Initializer
{
    let x = (() => {
        let _classDecorators = [dec];
        let _classDescriptor;
        let _classExtraInitializers = [];
        let _classThis;
        var class_1 = class {
            static {
                __setFunctionName(this, "x");
                const metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : undefined;
                __esDecorate(null, _classDescriptor = { value: this }, _classDecorators, { kind: "class", name: this.name, metadata: metadata }, null, _classExtraInitializers);
                class_1 = _classThis = _classDescriptor.value;
                if (metadata) Object.defineProperty(_classThis, Symbol.metadata, { configurable: true, writable: true, enumerable: true, value: metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            }
        };
        return class_1 = _classThis;
    })();
}
{
    let x = (() => {
        let _instanceExtraInitializers = [];
        let _y_decorators;
        let _y_initializers = [];
        return class {
            static {
                __setFunctionName(this, "x");
                const metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : undefined;
                _y_decorators = [dec];
                __esDecorate(null, null, _y_decorators, { kind: "field", name: "y", static: false, private: false, access: { has: obj => "y" in obj, get: obj => obj.y, set: (obj, value) => { obj.y = value; } }, metadata: metadata }, _y_initializers, _instanceExtraInitializers);
                if (metadata) Object.defineProperty(this, Symbol.metadata, { configurable: true, writable: true, enumerable: true, value: metadata });
            }
            y = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _y_initializers, void 0));
        };
    })();
}
{
    const x = (() => {
        let _classDecorators_1 = [dec];
        let _classDescriptor_1;
        let _classExtraInitializers_1 = [];
        let _classThis_1;
        var class_2 = class {
            static {
                __setFunctionName(this, "x");
                const metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : undefined;
                __esDecorate(null, _classDescriptor_1 = { value: this }, _classDecorators_1, { kind: "class", name: this.name, metadata: metadata }, null, _classExtraInitializers_1);
                class_2 = _classThis_1 = _classDescriptor_1.value;
                if (metadata) Object.defineProperty(_classThis_1, Symbol.metadata, { configurable: true, writable: true, enumerable: true, value: metadata });
                __runInitializers(_classThis_1, _classExtraInitializers_1);
            }
        };
        return class_2 = _classThis_1;
    })();
}
{
    const x = (() => {
        let _instanceExtraInitializers_1 = [];
        let _y_decorators;
        let _y_initializers = [];
        return class {
            static {
                __setFunctionName(this, "x");
                const metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : undefined;
                _y_decorators = [dec];
                __esDecorate(null, null, _y_decorators, { kind: "field", name: "y", static: false, private: false, access: { has: obj => "y" in obj, get: obj => obj.y, set: (obj, value) => { obj.y = value; } }, metadata: metadata }, _y_initializers, _instanceExtraInitializers_1);
                if (metadata) Object.defineProperty(this, Symbol.metadata, { configurable: true, writable: true, enumerable: true, value: metadata });
            }
            y = (__runInitializers(this, _instanceExtraInitializers_1), __runInitializers(this, _y_initializers, void 0));
        };
    })();
}
// 14.3.2.1 RS: Evaluation
//   VariableDeclaration : BindingIdentifier Initializer
{
    var x2 = (() => {
        let _classDecorators_2 = [dec];
        let _classDescriptor_2;
        let _classExtraInitializers_2 = [];
        let _classThis_2;
        var class_3 = class {
            static {
                __setFunctionName(this, "x2");
                const metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : undefined;
                __esDecorate(null, _classDescriptor_2 = { value: this }, _classDecorators_2, { kind: "class", name: this.name, metadata: metadata }, null, _classExtraInitializers_2);
                class_3 = _classThis_2 = _classDescriptor_2.value;
                if (metadata) Object.defineProperty(_classThis_2, Symbol.metadata, { configurable: true, writable: true, enumerable: true, value: metadata });
                __runInitializers(_classThis_2, _classExtraInitializers_2);
            }
        };
        return class_3 = _classThis_2;
    })();
}
{
    var x1 = (() => {
        let _instanceExtraInitializers_2 = [];
        let _y_decorators;
        let _y_initializers = [];
        return class {
            static {
                __setFunctionName(this, "x1");
                const metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : undefined;
                _y_decorators = [dec];
                __esDecorate(null, null, _y_decorators, { kind: "field", name: "y", static: false, private: false, access: { has: obj => "y" in obj, get: obj => obj.y, set: (obj, value) => { obj.y = value; } }, metadata: metadata }, _y_initializers, _instanceExtraInitializers_2);
                if (metadata) Object.defineProperty(this, Symbol.metadata, { configurable: true, writable: true, enumerable: true, value: metadata });
            }
            y = (__runInitializers(this, _instanceExtraInitializers_2), __runInitializers(this, _y_initializers, void 0));
        };
    })();
}
