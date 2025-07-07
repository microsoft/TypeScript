//// [tests/cases/conformance/esDecorators/esDecorators-emitDecoratorMetadata.ts] ////

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
    var _static_y_extraInitializers = [];
    var _method_decorators;
    var _set_x_decorators;
    var _y_decorators;
    var _y_initializers = [];
    var _y_extraInitializers = [];
    var C = _classThis = /** @class */ (function () {
        function C_1(x) {
            this.y = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _y_initializers, void 0));
            __runInitializers(this, _y_extraInitializers);
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
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _method_decorators = [dec];
        _set_x_decorators = [dec];
        _y_decorators = [dec];
        _static_method_decorators = [dec];
        _static_set_x_decorators = [dec];
        _static_y_decorators = [dec];
        __esDecorate(_classThis, null, _static_method_decorators, { kind: "method", name: "method", static: true, private: false, access: { has: function (obj) { return "method" in obj; }, get: function (obj) { return obj.method; } }, metadata: _metadata }, null, _staticExtraInitializers);
        __esDecorate(_classThis, null, _static_set_x_decorators, { kind: "setter", name: "x", static: true, private: false, access: { has: function (obj) { return "x" in obj; }, set: function (obj, value) { obj.x = value; } }, metadata: _metadata }, null, _staticExtraInitializers);
        __esDecorate(_classThis, null, _method_decorators, { kind: "method", name: "method", static: false, private: false, access: { has: function (obj) { return "method" in obj; }, get: function (obj) { return obj.method; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _set_x_decorators, { kind: "setter", name: "x", static: false, private: false, access: { has: function (obj) { return "x" in obj; }, set: function (obj, value) { obj.x = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, null, _static_y_decorators, { kind: "field", name: "y", static: true, private: false, access: { has: function (obj) { return "y" in obj; }, get: function (obj) { return obj.y; }, set: function (obj, value) { obj.y = value; } }, metadata: _metadata }, _static_y_initializers, _static_y_extraInitializers);
        __esDecorate(null, null, _y_decorators, { kind: "field", name: "y", static: false, private: false, access: { has: function (obj) { return "y" in obj; }, get: function (obj) { return obj.y; }, set: function (obj, value) { obj.y = value; } }, metadata: _metadata }, _y_initializers, _y_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        C = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    })();
    _classThis.y = (__runInitializers(_classThis, _staticExtraInitializers), __runInitializers(_classThis, _static_y_initializers, void 0));
    (function () {
        __runInitializers(_classThis, _static_y_extraInitializers);
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return C = _classThis;
}();
((function () {
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
    var _static_y_extraInitializers = [];
    var _method_decorators;
    var _set_x_decorators;
    var _y_decorators;
    var _y_initializers = [];
    var _y_extraInitializers = [];
    var C = _classThis = /** @class */ (function () {
        function class_1(x) {
            this.y = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _y_initializers, void 0));
            __runInitializers(this, _y_extraInitializers);
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
    }());
    __setFunctionName(_classThis, "C");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _method_decorators = [dec];
        _set_x_decorators = [dec];
        _y_decorators = [dec];
        _static_method_decorators = [dec];
        _static_set_x_decorators = [dec];
        _static_y_decorators = [dec];
        __esDecorate(_classThis, null, _static_method_decorators, { kind: "method", name: "method", static: true, private: false, access: { has: function (obj) { return "method" in obj; }, get: function (obj) { return obj.method; } }, metadata: _metadata }, null, _staticExtraInitializers);
        __esDecorate(_classThis, null, _static_set_x_decorators, { kind: "setter", name: "x", static: true, private: false, access: { has: function (obj) { return "x" in obj; }, set: function (obj, value) { obj.x = value; } }, metadata: _metadata }, null, _staticExtraInitializers);
        __esDecorate(_classThis, null, _method_decorators, { kind: "method", name: "method", static: false, private: false, access: { has: function (obj) { return "method" in obj; }, get: function (obj) { return obj.method; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _set_x_decorators, { kind: "setter", name: "x", static: false, private: false, access: { has: function (obj) { return "x" in obj; }, set: function (obj, value) { obj.x = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, null, _static_y_decorators, { kind: "field", name: "y", static: true, private: false, access: { has: function (obj) { return "y" in obj; }, get: function (obj) { return obj.y; }, set: function (obj, value) { obj.y = value; } }, metadata: _metadata }, _static_y_initializers, _static_y_extraInitializers);
        __esDecorate(null, null, _y_decorators, { kind: "field", name: "y", static: false, private: false, access: { has: function (obj) { return "y" in obj; }, get: function (obj) { return obj.y; }, set: function (obj, value) { obj.y = value; } }, metadata: _metadata }, _y_initializers, _y_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        C = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    })();
    _classThis.y = (__runInitializers(_classThis, _staticExtraInitializers), __runInitializers(_classThis, _static_y_initializers, void 0));
    (function () {
        __runInitializers(_classThis, _static_y_extraInitializers);
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return C = _classThis;
})());
