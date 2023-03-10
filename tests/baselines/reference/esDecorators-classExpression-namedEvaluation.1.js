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
        static {
            __setFunctionName(this, "x");
            __esDecorate(null, _classDescriptor = { value: this }, _classDecorators, { kind: "class", name: this.name }, null, _classExtraInitializers);
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
        static {
            __setFunctionName(this, "x");
            _y_decorators = [dec];
            __esDecorate(null, null, _y_decorators, { kind: "field", name: "y", static: false, private: false, access: { has: obj => "y" in obj, get: obj => obj.y, set: (obj, value) => { obj.y = value; } } }, _y_initializers, _instanceExtraInitializers);
        }
        y = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _y_initializers, void 0));
    };
})();
// 13.15.2 RS: Evaluation
//  AssignmentExpression : LeftHandSideExpression `&&=` AssignmentExpression
x &&= (() => {
    let _classDecorators_1 = [dec];
    let _classDescriptor_1;
    let _classExtraInitializers_1 = [];
    let _classThis_1;
    var class_2 = class {
        static {
            __setFunctionName(this, "x");
            __esDecorate(null, _classDescriptor_1 = { value: this }, _classDecorators_1, { kind: "class", name: this.name }, null, _classExtraInitializers_1);
            class_2 = _classThis_1 = _classDescriptor_1.value;
            __runInitializers(_classThis_1, _classExtraInitializers_1);
        }
    };
    return class_2 = _classThis_1;
})();
x &&= (() => {
    let _instanceExtraInitializers_1 = [];
    let _y_decorators;
    let _y_initializers = [];
    return class {
        static {
            __setFunctionName(this, "x");
            _y_decorators = [dec];
            __esDecorate(null, null, _y_decorators, { kind: "field", name: "y", static: false, private: false, access: { has: obj => "y" in obj, get: obj => obj.y, set: (obj, value) => { obj.y = value; } } }, _y_initializers, _instanceExtraInitializers_1);
        }
        y = (__runInitializers(this, _instanceExtraInitializers_1), __runInitializers(this, _y_initializers, void 0));
    };
})();
// 13.15.2 RS: Evaluation
//  AssignmentExpression : LeftHandSideExpression `||=` AssignmentExpression
x ||= (() => {
    let _classDecorators_2 = [dec];
    let _classDescriptor_2;
    let _classExtraInitializers_2 = [];
    let _classThis_2;
    var class_3 = class {
        static {
            __setFunctionName(this, "x");
            __esDecorate(null, _classDescriptor_2 = { value: this }, _classDecorators_2, { kind: "class", name: this.name }, null, _classExtraInitializers_2);
            class_3 = _classThis_2 = _classDescriptor_2.value;
            __runInitializers(_classThis_2, _classExtraInitializers_2);
        }
    };
    return class_3 = _classThis_2;
})();
x ||= (() => {
    let _instanceExtraInitializers_2 = [];
    let _y_decorators;
    let _y_initializers = [];
    return class {
        static {
            __setFunctionName(this, "x");
            _y_decorators = [dec];
            __esDecorate(null, null, _y_decorators, { kind: "field", name: "y", static: false, private: false, access: { has: obj => "y" in obj, get: obj => obj.y, set: (obj, value) => { obj.y = value; } } }, _y_initializers, _instanceExtraInitializers_2);
        }
        y = (__runInitializers(this, _instanceExtraInitializers_2), __runInitializers(this, _y_initializers, void 0));
    };
})();
// 13.15.2 RS: Evaluation
//  AssignmentExpression : LeftHandSideExpression `??=` AssignmentExpression
x ??= (() => {
    let _classDecorators_3 = [dec];
    let _classDescriptor_3;
    let _classExtraInitializers_3 = [];
    let _classThis_3;
    var class_4 = class {
        static {
            __setFunctionName(this, "x");
            __esDecorate(null, _classDescriptor_3 = { value: this }, _classDecorators_3, { kind: "class", name: this.name }, null, _classExtraInitializers_3);
            class_4 = _classThis_3 = _classDescriptor_3.value;
            __runInitializers(_classThis_3, _classExtraInitializers_3);
        }
    };
    return class_4 = _classThis_3;
})();
x ??= (() => {
    let _instanceExtraInitializers_3 = [];
    let _y_decorators;
    let _y_initializers = [];
    return class {
        static {
            __setFunctionName(this, "x");
            _y_decorators = [dec];
            __esDecorate(null, null, _y_decorators, { kind: "field", name: "y", static: false, private: false, access: { has: obj => "y" in obj, get: obj => obj.y, set: (obj, value) => { obj.y = value; } } }, _y_initializers, _instanceExtraInitializers_3);
        }
        y = (__runInitializers(this, _instanceExtraInitializers_3), __runInitializers(this, _y_initializers, void 0));
    };
})();
