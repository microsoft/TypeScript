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
            __esDecorate(null, _classDescriptor = { value: this }, _classDecorators, { kind: "class", name: this.name }, null, _classExtraInitializers);
            class_1 = _classThis = _classDescriptor.value;
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
            _y_decorators = [dec];
            __esDecorate(null, null, _y_decorators, { kind: "field", name: "y", static: false, private: false }, _y_initializers, _instanceExtraInitializers);
        }
        y = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _y_initializers, void 0));
    };
})());
