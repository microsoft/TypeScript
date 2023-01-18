//// [esDecorators-emitDecoratorMetadata.ts]
declare let dec: any;

@dec
class C {
    constructor(x: number) {}

    @dec
    method(x: number) {}

    @dec
    set x(x: number) {}

    @dec
    y: number;

    @dec
    static method(x: number) {}

    @dec
    static set x(x: number) {}

    @dec
    static y: number;
}

(@dec class C {
    constructor(x: number) {}

    @dec
    method(x: number) {}

    @dec
    set x(x: number) {}

    @dec
    y: number;

    @dec
    static method(x: number) {}

    @dec
    static set x(x: number) {}

    @dec
    static y: number;
});

//// [esDecorators-emitDecoratorMetadata.js]
var _this = this;
var C = function () {
    var _classDecorators = [dec];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _staticExtraInitializers = [];
    var _instanceExtraInitializers = [];
    var _static_method_decorators;
    var _static_set_x_decorators;
    var _static_y_decorators;
    var _static_y_initializers = [];
    var _method_decorators;
    var _set_x_decorators;
    var _y_decorators;
    var _y_initializers = [];
    var C = _classThis = /** @class */ (function () {
        function C_1(x) {
            this.y = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _y_initializers, void 0));
        }
        C_1.prototype.method = function (x) { };
        Object.defineProperty(C_1.prototype, "x", {
            set: function (x) { },
            enumerable: false,
            configurable: true
        });
        C_1.method = function (x) { };
        Object.defineProperty(C_1, "x", {
            set: function (x) { },
            enumerable: false,
            configurable: true
        });
        return C_1;
    }());
    __setFunctionName(_classThis, "C");
    (function () {
        _method_decorators = [dec];
        _set_x_decorators = [dec];
        _y_decorators = [dec];
        _static_method_decorators = [dec];
        _static_set_x_decorators = [dec];
        _static_y_decorators = [dec];
        __esDecorate(_classThis, null, _static_method_decorators, { kind: "method", name: "method", static: true, private: false }, null, _staticExtraInitializers);
        __esDecorate(_classThis, null, _static_set_x_decorators, { kind: "setter", name: "x", static: true, private: false }, null, _staticExtraInitializers);
        __esDecorate(_classThis, null, _method_decorators, { kind: "method", name: "method", static: false, private: false }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _set_x_decorators, { kind: "setter", name: "x", static: false, private: false }, null, _instanceExtraInitializers);
        __esDecorate(null, null, _static_y_decorators, { kind: "field", name: "y", static: true, private: false }, _static_y_initializers, _staticExtraInitializers);
        __esDecorate(null, null, _y_decorators, { kind: "field", name: "y", static: false, private: false }, _y_initializers, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name }, null, _classExtraInitializers);
        C = _classThis = _classDescriptor.value;
        __runInitializers(_classThis, _staticExtraInitializers);
    })();
    _classThis.y = __runInitializers(_classThis, _static_y_initializers, void 0);
    (function () {
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return C = _classThis;
}();
((function () {
    var _classDecorators_1 = [dec];
    var _classDescriptor_1;
    var _classExtraInitializers_1 = [];
    var _classThis_1;
    var _staticExtraInitializers_1 = [];
    var _instanceExtraInitializers_1 = [];
    var _static_method_decorators;
    var _static_set_x_decorators;
    var _static_y_decorators;
    var _static_y_initializers = [];
    var _method_decorators;
    var _set_x_decorators;
    var _y_decorators;
    var _y_initializers = [];
    var C = (_classThis_1 = /** @class */ (function () {
            function class_1(x) {
                this.y = (__runInitializers(this, _instanceExtraInitializers_1), __runInitializers(this, _y_initializers, void 0));
            }
            class_1.prototype.method = function (x) { };
            Object.defineProperty(class_1.prototype, "x", {
                set: function (x) { },
                enumerable: false,
                configurable: true
            });
            class_1.method = function (x) { };
            Object.defineProperty(class_1, "x", {
                set: function (x) { },
                enumerable: false,
                configurable: true
            });
            return class_1;
        }()),
        __setFunctionName(_classThis_1, "C"),
        (function () {
            _method_decorators = [dec];
            _set_x_decorators = [dec];
            _y_decorators = [dec];
            _static_method_decorators = [dec];
            _static_set_x_decorators = [dec];
            _static_y_decorators = [dec];
            __esDecorate(_classThis_1, null, _static_method_decorators, { kind: "method", name: "method", static: true, private: false }, null, _staticExtraInitializers_1);
            __esDecorate(_classThis_1, null, _static_set_x_decorators, { kind: "setter", name: "x", static: true, private: false }, null, _staticExtraInitializers_1);
            __esDecorate(_classThis_1, null, _method_decorators, { kind: "method", name: "method", static: false, private: false }, null, _instanceExtraInitializers_1);
            __esDecorate(_classThis_1, null, _set_x_decorators, { kind: "setter", name: "x", static: false, private: false }, null, _instanceExtraInitializers_1);
            __esDecorate(null, null, _static_y_decorators, { kind: "field", name: "y", static: true, private: false }, _static_y_initializers, _staticExtraInitializers_1);
            __esDecorate(null, null, _y_decorators, { kind: "field", name: "y", static: false, private: false }, _y_initializers, _instanceExtraInitializers_1);
            __esDecorate(null, _classDescriptor_1 = { value: _classThis_1 }, _classDecorators_1, { kind: "class", name: _classThis_1.name }, null, _classExtraInitializers_1);
            C = _classThis_1 = _classDescriptor_1.value;
            __runInitializers(_classThis_1, _staticExtraInitializers_1);
        })(),
        _classThis_1.y = __runInitializers(_classThis_1, _static_y_initializers, void 0),
        (function () {
            __runInitializers(_classThis_1, _classExtraInitializers_1);
        })(),
        _classThis_1);
    return C = _classThis_1;
})());
