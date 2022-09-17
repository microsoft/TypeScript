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
    var _a;
    var _classDecorators = [dec, __metadata("design:paramtypes", [Number])];
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
    var C = (_a = /** @class */ (function () {
            function class_1(x) {
                this.y = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _y_initializers));
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
        __setFunctionName(_a, "C"),
        (function () {
            _method_decorators = [dec, __metadata("design:type", Function), __metadata("design:paramtypes", [Number]), __metadata("design:returntype", void 0)];
            _set_x_decorators = [dec, __metadata("design:type", Number), __metadata("design:paramtypes", [Number])];
            _y_decorators = [dec, __metadata("design:type", Number)];
            _static_method_decorators = [dec, __metadata("design:type", Function), __metadata("design:paramtypes", [Number]), __metadata("design:returntype", void 0)];
            _static_set_x_decorators = [dec, __metadata("design:type", Number), __metadata("design:paramtypes", [Number])];
            _static_y_decorators = [dec, __metadata("design:type", Number)];
            __esDecorate(_a, null, _static_method_decorators, { kind: "method", name: "method", static: true, private: false, access: { get: function () { return this.method; } } }, null, _staticExtraInitializers);
            __esDecorate(_a, null, _static_set_x_decorators, { kind: "setter", name: "x", static: true, private: false, access: { set: function (value) { this.x = value; } } }, null, _staticExtraInitializers);
            __esDecorate(_a, null, _method_decorators, { kind: "method", name: "method", static: false, private: false, access: { get: function () { return this.method; } } }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _set_x_decorators, { kind: "setter", name: "x", static: false, private: false, access: { set: function (value) { this.x = value; } } }, null, _instanceExtraInitializers);
            __esDecorate(null, null, _static_y_decorators, { kind: "field", name: "y", static: true, private: false, access: { get: function () { return this.y; }, set: function (value) { this.y = value; } } }, _static_y_initializers, _staticExtraInitializers);
            __esDecorate(null, null, _y_decorators, { kind: "field", name: "y", static: false, private: false, access: { get: function () { return this.y; }, set: function (value) { this.y = value; } } }, _y_initializers, _instanceExtraInitializers);
            __esDecorate(null, _classDescriptor = { value: _a }, _classDecorators, { kind: "class", name: _a.name }, null, _classExtraInitializers);
            C = _classThis = _classDescriptor.value;
            __runInitializers(_classThis, _staticExtraInitializers);
        })(),
        _a.y = __runInitializers(_classThis, _static_y_initializers),
        (function () {
            __runInitializers(_classThis, _classExtraInitializers);
        })(),
        _a);
    return C;
}();
((function () {
    var _a;
    var _classDecorators_1 = [dec, __metadata("design:paramtypes", [Number])];
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
    var C = (_a = /** @class */ (function () {
            function class_2(x) {
                this.y = (__runInitializers(this, _instanceExtraInitializers_1), __runInitializers(this, _y_initializers));
            }
            class_2.prototype.method = function (x) { };
            Object.defineProperty(class_2.prototype, "x", {
                set: function (x) { },
                enumerable: false,
                configurable: true
            });
            class_2.method = function (x) { };
            Object.defineProperty(class_2, "x", {
                set: function (x) { },
                enumerable: false,
                configurable: true
            });
            return class_2;
        }()),
        __setFunctionName(_a, "C"),
        (function () {
            _method_decorators = [dec, __metadata("design:type", Function), __metadata("design:paramtypes", [Number]), __metadata("design:returntype", void 0)];
            _set_x_decorators = [dec, __metadata("design:type", Number), __metadata("design:paramtypes", [Number])];
            _y_decorators = [dec, __metadata("design:type", Number)];
            _static_method_decorators = [dec, __metadata("design:type", Function), __metadata("design:paramtypes", [Number]), __metadata("design:returntype", void 0)];
            _static_set_x_decorators = [dec, __metadata("design:type", Number), __metadata("design:paramtypes", [Number])];
            _static_y_decorators = [dec, __metadata("design:type", Number)];
            __esDecorate(_a, null, _static_method_decorators, { kind: "method", name: "method", static: true, private: false, access: { get: function () { return this.method; } } }, null, _staticExtraInitializers_1);
            __esDecorate(_a, null, _static_set_x_decorators, { kind: "setter", name: "x", static: true, private: false, access: { set: function (value) { this.x = value; } } }, null, _staticExtraInitializers_1);
            __esDecorate(_a, null, _method_decorators, { kind: "method", name: "method", static: false, private: false, access: { get: function () { return this.method; } } }, null, _instanceExtraInitializers_1);
            __esDecorate(_a, null, _set_x_decorators, { kind: "setter", name: "x", static: false, private: false, access: { set: function (value) { this.x = value; } } }, null, _instanceExtraInitializers_1);
            __esDecorate(null, null, _static_y_decorators, { kind: "field", name: "y", static: true, private: false, access: { get: function () { return this.y; }, set: function (value) { this.y = value; } } }, _static_y_initializers, _staticExtraInitializers_1);
            __esDecorate(null, null, _y_decorators, { kind: "field", name: "y", static: false, private: false, access: { get: function () { return this.y; }, set: function (value) { this.y = value; } } }, _y_initializers, _instanceExtraInitializers_1);
            __esDecorate(null, _classDescriptor_1 = { value: _a }, _classDecorators_1, { kind: "class", name: _a.name }, null, _classExtraInitializers_1);
            C = _classThis_1 = _classDescriptor_1.value;
            __runInitializers(_classThis_1, _staticExtraInitializers_1);
        })(),
        _a.y = __runInitializers(_classThis_1, _static_y_initializers),
        (function () {
            __runInitializers(_classThis_1, _classExtraInitializers_1);
        })(),
        _a);
    return C;
})());
