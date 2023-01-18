//// [esDecorators-classExpression-namedEvaluation.7.ts]
declare let dec: any, obj: any, x: any;

// 13.15.5.6 RS: KeyedDestructuringAssignmentEvaluation
//   AssignmentElement : DestructuringAssignmentTarget Initializer?

[x = @dec class { }] = obj;
[x = class { @dec y: any; }] = obj;


//// [esDecorators-classExpression-namedEvaluation.7.js]
// 13.15.5.6 RS: KeyedDestructuringAssignmentEvaluation
//   AssignmentElement : DestructuringAssignmentTarget Initializer?
[x = (() => {
        let _classDecorators = [dec];
        let _classDescriptor;
        let _classExtraInitializers = [];
        let _classThis;
        var class_1 = class {
            static {
                __setFunctionName(this, "x");
                __esDecorate(null, _classDescriptor = { value: this }, _classDecorators, { kind: "class", name: this.name }, null, _classExtraInitializers);
                class_1 = _classThis = _classDescriptor.value;
                __runInitializers(_classThis, _classExtraInitializers);
            }
        };
        return class_1 = _classThis;
    })()] = obj;
[x = (() => {
        let _instanceExtraInitializers = [];
        let _y_decorators;
        let _y_initializers = [];
        return class {
            static {
                __setFunctionName(this, "x");
                _y_decorators = [dec];
                __esDecorate(null, null, _y_decorators, { kind: "field", name: "y", static: false, private: false }, _y_initializers, _instanceExtraInitializers);
            }
            y = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _y_initializers, void 0));
        };
    })()] = obj;
