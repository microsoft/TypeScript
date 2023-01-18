//// [esDecorators-classExpression-namedEvaluation.10.ts]
declare let dec: any, f: any;

// 10.2.1.3 RS: EvaluateBody
//   Initializer : `=` AssignmentExpression

{ class C { static x = @dec class {}; } }
{ class C { static "x" = @dec class {}; } }
{ class C { static 0 = @dec class {}; } }
{ class C { static ["x"] = @dec class {}; } }
{ class C { static [0] = @dec class {}; } }
// @ts-ignore
{ class C { static [f()] = @dec class {}; } }

// __proto__ is not special in a class field
{ class C { static __proto__ = @dec class {}; } }
{ class C { static "__proto__" = @dec class {}; } }

{ class C { static x = class { @dec y: any }; } }
{ class C { static "x" = class { @dec y: any }; } }
{ class C { static 0 = class { @dec y: any }; } }
{ class C { static ["x"] = class { @dec y: any }; } }
{ class C { static [0] = class { @dec y: any }; } }
// @ts-ignore
{ class C { static [f()] = @dec class {}; } }

// __proto__ is not special in a class field
{ class C { static __proto__ = class { @dec y: any }; } }
{ class C { static "__proto__" = class { @dec y: any }; } }

// ensure nested named evaluation happens when field is also transformed
{ class C { @dec static x = @dec class {}; } }


//// [esDecorators-classExpression-namedEvaluation.10.js]
var _a, _b;
// 10.2.1.3 RS: EvaluateBody
//   Initializer : `=` AssignmentExpression
{
    class C {
        static x = (() => {
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
    }
}
{
    class C {
        static "x" = (() => {
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
    }
}
{
    class C {
        static 0 = (() => {
            let _classDecorators_2 = [dec];
            let _classDescriptor_2;
            let _classExtraInitializers_2 = [];
            let _classThis_2;
            var class_3 = class {
                static {
                    __setFunctionName(this, "0");
                    __esDecorate(null, _classDescriptor_2 = { value: this }, _classDecorators_2, { kind: "class", name: this.name }, null, _classExtraInitializers_2);
                    class_3 = _classThis_2 = _classDescriptor_2.value;
                    __runInitializers(_classThis_2, _classExtraInitializers_2);
                }
            };
            return class_3 = _classThis_2;
        })();
    }
}
{
    class C {
        static ["x"] = (() => {
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
    }
}
{
    class C {
        static [0] = (() => {
            let _classDecorators_4 = [dec];
            let _classDescriptor_4;
            let _classExtraInitializers_4 = [];
            let _classThis_4;
            var class_5 = class {
                static {
                    __setFunctionName(this, "0");
                    __esDecorate(null, _classDescriptor_4 = { value: this }, _classDecorators_4, { kind: "class", name: this.name }, null, _classExtraInitializers_4);
                    class_5 = _classThis_4 = _classDescriptor_4.value;
                    __runInitializers(_classThis_4, _classExtraInitializers_4);
                }
            };
            return class_5 = _classThis_4;
        })();
    }
}
// @ts-ignore
{
    class C {
        static [_a = __propKey(f())] = (() => {
            let _classDecorators_5 = [dec];
            let _classDescriptor_5;
            let _classExtraInitializers_5 = [];
            let _classThis_5;
            var class_6 = class {
                static {
                    __setFunctionName(this, _a);
                    __esDecorate(null, _classDescriptor_5 = { value: this }, _classDecorators_5, { kind: "class", name: this.name }, null, _classExtraInitializers_5);
                    class_6 = _classThis_5 = _classDescriptor_5.value;
                    __runInitializers(_classThis_5, _classExtraInitializers_5);
                }
            };
            return class_6 = _classThis_5;
        })();
    }
}
// __proto__ is not special in a class field
{
    class C {
        static __proto__ = (() => {
            let _classDecorators_6 = [dec];
            let _classDescriptor_6;
            let _classExtraInitializers_6 = [];
            let _classThis_6;
            var class_7 = class {
                static {
                    __setFunctionName(this, "__proto__");
                    __esDecorate(null, _classDescriptor_6 = { value: this }, _classDecorators_6, { kind: "class", name: this.name }, null, _classExtraInitializers_6);
                    class_7 = _classThis_6 = _classDescriptor_6.value;
                    __runInitializers(_classThis_6, _classExtraInitializers_6);
                }
            };
            return class_7 = _classThis_6;
        })();
    }
}
{
    class C {
        static "__proto__" = (() => {
            let _classDecorators_7 = [dec];
            let _classDescriptor_7;
            let _classExtraInitializers_7 = [];
            let _classThis_7;
            var class_8 = class {
                static {
                    __setFunctionName(this, "__proto__");
                    __esDecorate(null, _classDescriptor_7 = { value: this }, _classDecorators_7, { kind: "class", name: this.name }, null, _classExtraInitializers_7);
                    class_8 = _classThis_7 = _classDescriptor_7.value;
                    __runInitializers(_classThis_7, _classExtraInitializers_7);
                }
            };
            return class_8 = _classThis_7;
        })();
    }
}
{
    class C {
        static x = (() => {
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
        })();
    }
}
{
    class C {
        static "x" = (() => {
            let _instanceExtraInitializers_1 = [];
            let _y_decorators;
            let _y_initializers = [];
            return class {
                static {
                    __setFunctionName(this, "x");
                    _y_decorators = [dec];
                    __esDecorate(null, null, _y_decorators, { kind: "field", name: "y", static: false, private: false }, _y_initializers, _instanceExtraInitializers_1);
                }
                y = (__runInitializers(this, _instanceExtraInitializers_1), __runInitializers(this, _y_initializers, void 0));
            };
        })();
    }
}
{
    class C {
        static 0 = (() => {
            let _instanceExtraInitializers_2 = [];
            let _y_decorators;
            let _y_initializers = [];
            return class {
                static {
                    __setFunctionName(this, "0");
                    _y_decorators = [dec];
                    __esDecorate(null, null, _y_decorators, { kind: "field", name: "y", static: false, private: false }, _y_initializers, _instanceExtraInitializers_2);
                }
                y = (__runInitializers(this, _instanceExtraInitializers_2), __runInitializers(this, _y_initializers, void 0));
            };
        })();
    }
}
{
    class C {
        static ["x"] = (() => {
            let _instanceExtraInitializers_3 = [];
            let _y_decorators;
            let _y_initializers = [];
            return class {
                static {
                    __setFunctionName(this, "x");
                    _y_decorators = [dec];
                    __esDecorate(null, null, _y_decorators, { kind: "field", name: "y", static: false, private: false }, _y_initializers, _instanceExtraInitializers_3);
                }
                y = (__runInitializers(this, _instanceExtraInitializers_3), __runInitializers(this, _y_initializers, void 0));
            };
        })();
    }
}
{
    class C {
        static [0] = (() => {
            let _instanceExtraInitializers_4 = [];
            let _y_decorators;
            let _y_initializers = [];
            return class {
                static {
                    __setFunctionName(this, "0");
                    _y_decorators = [dec];
                    __esDecorate(null, null, _y_decorators, { kind: "field", name: "y", static: false, private: false }, _y_initializers, _instanceExtraInitializers_4);
                }
                y = (__runInitializers(this, _instanceExtraInitializers_4), __runInitializers(this, _y_initializers, void 0));
            };
        })();
    }
}
// @ts-ignore
{
    class C {
        static [_b = __propKey(f())] = (() => {
            let _classDecorators_8 = [dec];
            let _classDescriptor_8;
            let _classExtraInitializers_8 = [];
            let _classThis_8;
            var class_9 = class {
                static {
                    __setFunctionName(this, _b);
                    __esDecorate(null, _classDescriptor_8 = { value: this }, _classDecorators_8, { kind: "class", name: this.name }, null, _classExtraInitializers_8);
                    class_9 = _classThis_8 = _classDescriptor_8.value;
                    __runInitializers(_classThis_8, _classExtraInitializers_8);
                }
            };
            return class_9 = _classThis_8;
        })();
    }
}
// __proto__ is not special in a class field
{
    class C {
        static __proto__ = (() => {
            let _instanceExtraInitializers_5 = [];
            let _y_decorators;
            let _y_initializers = [];
            return class {
                static {
                    __setFunctionName(this, "__proto__");
                    _y_decorators = [dec];
                    __esDecorate(null, null, _y_decorators, { kind: "field", name: "y", static: false, private: false }, _y_initializers, _instanceExtraInitializers_5);
                }
                y = (__runInitializers(this, _instanceExtraInitializers_5), __runInitializers(this, _y_initializers, void 0));
            };
        })();
    }
}
{
    class C {
        static "__proto__" = (() => {
            let _instanceExtraInitializers_6 = [];
            let _y_decorators;
            let _y_initializers = [];
            return class {
                static {
                    __setFunctionName(this, "__proto__");
                    _y_decorators = [dec];
                    __esDecorate(null, null, _y_decorators, { kind: "field", name: "y", static: false, private: false }, _y_initializers, _instanceExtraInitializers_6);
                }
                y = (__runInitializers(this, _instanceExtraInitializers_6), __runInitializers(this, _y_initializers, void 0));
            };
        })();
    }
}
// ensure nested named evaluation happens when field is also transformed
{
    let C = (() => {
        let _staticExtraInitializers = [];
        let _static_x_decorators;
        let _static_x_initializers = [];
        return class C {
            static {
                _static_x_decorators = [dec];
                __esDecorate(null, null, _static_x_decorators, { kind: "field", name: "x", static: true, private: false }, _static_x_initializers, _staticExtraInitializers);
                __runInitializers(this, _staticExtraInitializers);
            }
            static x = __runInitializers(this, _static_x_initializers, (() => {
                let _classDecorators_9 = [dec];
                let _classDescriptor_9;
                let _classExtraInitializers_9 = [];
                let _classThis_9;
                var class_10 = class {
                    static {
                        __setFunctionName(this, "x");
                        __esDecorate(null, _classDescriptor_9 = { value: this }, _classDecorators_9, { kind: "class", name: this.name }, null, _classExtraInitializers_9);
                        class_10 = _classThis_9 = _classDescriptor_9.value;
                        __runInitializers(_classThis_9, _classExtraInitializers_9);
                    }
                };
                return class_10 = _classThis_9;
            })());
        };
    })();
}
