//// [tests/cases/conformance/esDecorators/classExpression/namedEvaluation/esDecorators-classExpression-namedEvaluation.8.ts] ////

//// [a.ts]
declare let dec: any;

// 16.2.3.7 RS: Evaluation
//   ExportDeclaration : `export` `default` AssignmentExpression `;` 

export default (@dec class { });

//// [b.ts]
declare let dec: any;

// 16.2.3.7 RS: Evaluation
//   ExportDeclaration : `export` `default` AssignmentExpression `;` 

export default (class { @dec y: any });

//// [a.js]
// 16.2.3.7 RS: Evaluation
//   ExportDeclaration : `export` `default` AssignmentExpression `;` 
export default ((() => {
    let _classDecorators = [dec];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var class_1 = class {
        static {
            __setFunctionName(this, "default");
            const metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : undefined;
            __esDecorate(null, _classDescriptor = { value: this }, _classDecorators, { kind: "class", name: this.name, metadata: metadata }, null, _classExtraInitializers);
            class_1 = _classThis = _classDescriptor.value;
            if (metadata) Object.defineProperty(_classThis, Symbol.metadata, { configurable: true, writable: true, enumerable: true, value: metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
    };
    return class_1 = _classThis;
})());
//// [b.js]
// 16.2.3.7 RS: Evaluation
//   ExportDeclaration : `export` `default` AssignmentExpression `;` 
export default ((() => {
    let _instanceExtraInitializers = [];
    let _y_decorators;
    let _y_initializers = [];
    return class {
        static {
            __setFunctionName(this, "default");
            const metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : undefined;
            _y_decorators = [dec];
            __esDecorate(null, null, _y_decorators, { kind: "field", name: "y", static: false, private: false, access: { has: obj => "y" in obj, get: obj => obj.y, set: (obj, value) => { obj.y = value; } }, metadata: metadata }, _y_initializers, _instanceExtraInitializers);
            if (metadata) Object.defineProperty(this, Symbol.metadata, { configurable: true, writable: true, enumerable: true, value: metadata });
        }
        y = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _y_initializers, void 0));
    };
})());
