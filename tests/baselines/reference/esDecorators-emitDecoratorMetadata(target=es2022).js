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
let C = (() => {
    let _classDecorators = [dec, __metadata("design:paramtypes", [Number])];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _staticExtraInitializers = [];
    let _instanceExtraInitializers = [];
    let _static_method_decorators;
    let _static_set_x_decorators;
    let _static_y_decorators;
    let _static_y_initializers = [];
    let _method_decorators;
    let _set_x_decorators;
    let _y_decorators;
    let _y_initializers = [];
    var C = class {
        static {
            _method_decorators = [dec, __metadata("design:type", Function), __metadata("design:paramtypes", [Number]), __metadata("design:returntype", void 0)];
            _set_x_decorators = [dec, __metadata("design:type", Number), __metadata("design:paramtypes", [Number])];
            _y_decorators = [dec, __metadata("design:type", Number)];
            _static_method_decorators = [dec, __metadata("design:type", Function), __metadata("design:paramtypes", [Number]), __metadata("design:returntype", void 0)];
            _static_set_x_decorators = [dec, __metadata("design:type", Number), __metadata("design:paramtypes", [Number])];
            _static_y_decorators = [dec, __metadata("design:type", Number)];
            __esDecorate(this, null, _static_method_decorators, { kind: "method", name: "method", static: true, private: false, access: { get() { return this.method; } } }, null, _staticExtraInitializers);
            __esDecorate(this, null, _static_set_x_decorators, { kind: "setter", name: "x", static: true, private: false, access: { set(value) { this.x = value; } } }, null, _staticExtraInitializers);
            __esDecorate(this, null, _method_decorators, { kind: "method", name: "method", static: false, private: false, access: { get() { return this.method; } } }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _set_x_decorators, { kind: "setter", name: "x", static: false, private: false, access: { set(value) { this.x = value; } } }, null, _instanceExtraInitializers);
            __esDecorate(null, null, _static_y_decorators, { kind: "field", name: "y", static: true, private: false, access: { get() { return this.y; }, set(value) { this.y = value; } } }, _static_y_initializers, _staticExtraInitializers);
            __esDecorate(null, null, _y_decorators, { kind: "field", name: "y", static: false, private: false, access: { get() { return this.y; }, set(value) { this.y = value; } } }, _y_initializers, _instanceExtraInitializers);
            __esDecorate(null, _classDescriptor = { value: this }, _classDecorators, { kind: "class", name: this.name }, null, _classExtraInitializers);
            C = _classThis = _classDescriptor.value;
            __runInitializers(_classThis, _staticExtraInitializers);
        }
        constructor(x) { }
        method(x) { }
        set x(x) { }
        y = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _y_initializers));
        static method(x) { }
        static set x(x) { }
        static y = __runInitializers(_classThis, _static_y_initializers);
        static {
            __runInitializers(_classThis, _classExtraInitializers);
        }
    };
    return C;
})();
((() => {
    let _classDecorators_1 = [dec, __metadata("design:paramtypes", [Number])];
    let _classDescriptor_1;
    let _classExtraInitializers_1 = [];
    let _classThis_1;
    let _staticExtraInitializers_1 = [];
    let _instanceExtraInitializers_1 = [];
    let _static_method_decorators;
    let _static_set_x_decorators;
    let _static_y_decorators;
    let _static_y_initializers = [];
    let _method_decorators;
    let _set_x_decorators;
    let _y_decorators;
    let _y_initializers = [];
    var C = class {
        static {
            _method_decorators = [dec, __metadata("design:type", Function), __metadata("design:paramtypes", [Number]), __metadata("design:returntype", void 0)];
            _set_x_decorators = [dec, __metadata("design:type", Number), __metadata("design:paramtypes", [Number])];
            _y_decorators = [dec, __metadata("design:type", Number)];
            _static_method_decorators = [dec, __metadata("design:type", Function), __metadata("design:paramtypes", [Number]), __metadata("design:returntype", void 0)];
            _static_set_x_decorators = [dec, __metadata("design:type", Number), __metadata("design:paramtypes", [Number])];
            _static_y_decorators = [dec, __metadata("design:type", Number)];
            __esDecorate(this, null, _static_method_decorators, { kind: "method", name: "method", static: true, private: false, access: { get() { return this.method; } } }, null, _staticExtraInitializers_1);
            __esDecorate(this, null, _static_set_x_decorators, { kind: "setter", name: "x", static: true, private: false, access: { set(value) { this.x = value; } } }, null, _staticExtraInitializers_1);
            __esDecorate(this, null, _method_decorators, { kind: "method", name: "method", static: false, private: false, access: { get() { return this.method; } } }, null, _instanceExtraInitializers_1);
            __esDecorate(this, null, _set_x_decorators, { kind: "setter", name: "x", static: false, private: false, access: { set(value) { this.x = value; } } }, null, _instanceExtraInitializers_1);
            __esDecorate(null, null, _static_y_decorators, { kind: "field", name: "y", static: true, private: false, access: { get() { return this.y; }, set(value) { this.y = value; } } }, _static_y_initializers, _staticExtraInitializers_1);
            __esDecorate(null, null, _y_decorators, { kind: "field", name: "y", static: false, private: false, access: { get() { return this.y; }, set(value) { this.y = value; } } }, _y_initializers, _instanceExtraInitializers_1);
            __esDecorate(null, _classDescriptor_1 = { value: this }, _classDecorators_1, { kind: "class", name: this.name }, null, _classExtraInitializers_1);
            C = _classThis_1 = _classDescriptor_1.value;
            __runInitializers(_classThis_1, _staticExtraInitializers_1);
        }
        constructor(x) { }
        method(x) { }
        set x(x) { }
        y = (__runInitializers(this, _instanceExtraInitializers_1), __runInitializers(this, _y_initializers));
        static method(x) { }
        static set x(x) { }
        static y = __runInitializers(_classThis_1, _static_y_initializers);
        static {
            __runInitializers(_classThis_1, _classExtraInitializers_1);
        }
    };
    return C;
})());
