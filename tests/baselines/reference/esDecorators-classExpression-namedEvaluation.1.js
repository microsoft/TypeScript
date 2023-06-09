//// [tests/cases/conformance/esDecorators/classExpression/namedEvaluation/esDecorators-classExpression-namedEvaluation.1.ts] ////

//// [esDecorators-classExpression-namedEvaluation.1.ts]
declare let dec: any;

let x: any;

// 13.15.2 RS: Evaluation
//  AssignmentExpression : LeftHandSideExpression `=` AssignmentExpression

x = @dec class { };
x = class { @dec y: any; };

// 13.15.2 RS: Evaluation
//  AssignmentExpression : LeftHandSideExpression `&&=` AssignmentExpression

x &&= @dec class { };
x &&= class { @dec y: any; };

// 13.15.2 RS: Evaluation
//  AssignmentExpression : LeftHandSideExpression `||=` AssignmentExpression

x ||= @dec class { };
x ||= class { @dec y: any; };

// 13.15.2 RS: Evaluation
//  AssignmentExpression : LeftHandSideExpression `??=` AssignmentExpression

x ??= @dec class { };
x ??= class { @dec y: any; };


//// [esDecorators-classExpression-namedEvaluation.1.js]
let x;
// 13.15.2 RS: Evaluation
//  AssignmentExpression : LeftHandSideExpression `=` AssignmentExpression
x = (() => {
    let _classDecorators = [dec];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var class_1 = class {
        static { _classThis = this; }
        static { __setFunctionName(_classThis, "x"); }
        static {
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name }, null, _classExtraInitializers);
            class_1 = _classThis = _classDescriptor.value;
            __runInitializers(_classThis, _classExtraInitializers);
        }
    };
    return class_1 = _classThis;
})();
x = (() => {
    let _instanceExtraInitializers = [];
    let _y_decorators;
    let _y_initializers = [];
    return class {
        static { __setFunctionName(this, "x"); }
        static {
            _y_decorators = [dec];
            __esDecorate(null, null, _y_decorators, { kind: "field", name: "y", static: false, private: false, access: { has: obj => "y" in obj, get: obj => obj.y, set: (obj, value) => { obj.y = value; } } }, _y_initializers, _instanceExtraInitializers);
        }
        y = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _y_initializers, void 0));
    };
})();
// 13.15.2 RS: Evaluation
//  AssignmentExpression : LeftHandSideExpression `&&=` AssignmentExpression
x &&= (() => {
    let _classDecorators = [dec];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var class_2 = class {
        static { _classThis = this; }
        static { __setFunctionName(_classThis, "x"); }
        static {
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name }, null, _classExtraInitializers);
            class_2 = _classThis = _classDescriptor.value;
            __runInitializers(_classThis, _classExtraInitializers);
        }
    };
    return class_2 = _classThis;
})();
x &&= (() => {
    let _instanceExtraInitializers = [];
    let _y_decorators;
    let _y_initializers = [];
    return class {
        static { __setFunctionName(this, "x"); }
        static {
            _y_decorators = [dec];
            __esDecorate(null, null, _y_decorators, { kind: "field", name: "y", static: false, private: false, access: { has: obj => "y" in obj, get: obj => obj.y, set: (obj, value) => { obj.y = value; } } }, _y_initializers, _instanceExtraInitializers);
        }
        y = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _y_initializers, void 0));
    };
})();
// 13.15.2 RS: Evaluation
//  AssignmentExpression : LeftHandSideExpression `||=` AssignmentExpression
x ||= (() => {
    let _classDecorators = [dec];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var class_3 = class {
        static { _classThis = this; }
        static { __setFunctionName(_classThis, "x"); }
        static {
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name }, null, _classExtraInitializers);
            class_3 = _classThis = _classDescriptor.value;
            __runInitializers(_classThis, _classExtraInitializers);
        }
    };
    return class_3 = _classThis;
})();
x ||= (() => {
    let _instanceExtraInitializers = [];
    let _y_decorators;
    let _y_initializers = [];
    return class {
        static { __setFunctionName(this, "x"); }
        static {
            _y_decorators = [dec];
            __esDecorate(null, null, _y_decorators, { kind: "field", name: "y", static: false, private: false, access: { has: obj => "y" in obj, get: obj => obj.y, set: (obj, value) => { obj.y = value; } } }, _y_initializers, _instanceExtraInitializers);
        }
        y = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _y_initializers, void 0));
    };
})();
// 13.15.2 RS: Evaluation
//  AssignmentExpression : LeftHandSideExpression `??=` AssignmentExpression
x ??= (() => {
    let _classDecorators = [dec];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var class_4 = class {
        static { _classThis = this; }
        static { __setFunctionName(_classThis, "x"); }
        static {
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name }, null, _classExtraInitializers);
            class_4 = _classThis = _classDescriptor.value;
            __runInitializers(_classThis, _classExtraInitializers);
        }
    };
    return class_4 = _classThis;
})();
x ??= (() => {
    let _instanceExtraInitializers = [];
    let _y_decorators;
    let _y_initializers = [];
    return class {
        static { __setFunctionName(this, "x"); }
        static {
            _y_decorators = [dec];
            __esDecorate(null, null, _y_decorators, { kind: "field", name: "y", static: false, private: false, access: { has: obj => "y" in obj, get: obj => obj.y, set: (obj, value) => { obj.y = value; } } }, _y_initializers, _instanceExtraInitializers);
        }
        y = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _y_initializers, void 0));
    };
})();
