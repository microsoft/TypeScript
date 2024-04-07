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
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __esMetadata = (this && this.__esMetadata) || function (k, v) {
    return function (_, c) {
        c.metadata[k] = v;
    }
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
let C = (() => {
    let _classDecorators = [dec, __esMetadata("design:typeinfo", {
            paramTypes: () => [Number]
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _staticExtraInitializers = [];
    let _instanceExtraInitializers = [];
    let _static_method_decorators;
    let _static_set_x_decorators;
    let _static_y_decorators;
    let _static_y_initializers = [];
    let _static_y_extraInitializers = [];
    let _method_decorators;
    let _set_x_decorators;
    let _y_decorators;
    let _y_initializers = [];
    let _y_extraInitializers = [];
    var C = _classThis = class {
        constructor(x) {
            this.y = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _y_initializers, void 0));
            __runInitializers(this, _y_extraInitializers);
        }
        method(x) { }
        set x(x) { }
        static method(x) { }
        static set x(x) { }
    };
    __setFunctionName(_classThis, "C");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _method_decorators = [dec, __esMetadata("design:typeinfo", {
                type: () => Function,
                paramTypes: () => [Number],
                returnType: () => void 0
            })];
        _set_x_decorators = [dec, __esMetadata("design:typeinfo", {
                type: () => Number,
                paramTypes: () => [Number]
            })];
        _y_decorators = [dec, __esMetadata("design:typeinfo", {
                type: () => Number
            })];
        _static_method_decorators = [dec, __esMetadata("design:typeinfo", {
                type: () => Function,
                paramTypes: () => [Number],
                returnType: () => void 0
            })];
        _static_set_x_decorators = [dec, __esMetadata("design:typeinfo", {
                type: () => Number,
                paramTypes: () => [Number]
            })];
        _static_y_decorators = [dec, __esMetadata("design:typeinfo", {
                type: () => Number
            })];
        __esDecorate(_classThis, null, _static_method_decorators, { kind: "method", name: "method", static: true, private: false, access: { has: obj => "method" in obj, get: obj => obj.method }, metadata: _metadata }, null, _staticExtraInitializers);
        __esDecorate(_classThis, null, _static_set_x_decorators, { kind: "setter", name: "x", static: true, private: false, access: { has: obj => "x" in obj, set: (obj, value) => { obj.x = value; } }, metadata: _metadata }, null, _staticExtraInitializers);
        __esDecorate(_classThis, null, _method_decorators, { kind: "method", name: "method", static: false, private: false, access: { has: obj => "method" in obj, get: obj => obj.method }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _set_x_decorators, { kind: "setter", name: "x", static: false, private: false, access: { has: obj => "x" in obj, set: (obj, value) => { obj.x = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, null, _static_y_decorators, { kind: "field", name: "y", static: true, private: false, access: { has: obj => "y" in obj, get: obj => obj.y, set: (obj, value) => { obj.y = value; } }, metadata: _metadata }, _static_y_initializers, _static_y_extraInitializers);
        __esDecorate(null, null, _y_decorators, { kind: "field", name: "y", static: false, private: false, access: { has: obj => "y" in obj, get: obj => obj.y, set: (obj, value) => { obj.y = value; } }, metadata: _metadata }, _y_initializers, _y_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        C = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    })();
    _classThis.y = (__runInitializers(_classThis, _staticExtraInitializers), __runInitializers(_classThis, _static_y_initializers, void 0));
    (() => {
        __runInitializers(_classThis, _static_y_extraInitializers);
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return C = _classThis;
})();
((() => {
    let _classDecorators = [dec, __esMetadata("design:typeinfo", {
            paramTypes: () => [Number]
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _staticExtraInitializers = [];
    let _instanceExtraInitializers = [];
    let _static_method_decorators;
    let _static_set_x_decorators;
    let _static_y_decorators;
    let _static_y_initializers = [];
    let _static_y_extraInitializers = [];
    let _method_decorators;
    let _set_x_decorators;
    let _y_decorators;
    let _y_initializers = [];
    let _y_extraInitializers = [];
    var C = (_classThis = class {
            constructor(x) {
                this.y = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _y_initializers, void 0));
                __runInitializers(this, _y_extraInitializers);
            }
            method(x) { }
            set x(x) { }
            static method(x) { }
            static set x(x) { }
        },
        __setFunctionName(_classThis, "C"),
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _method_decorators = [dec, __esMetadata("design:typeinfo", {
                    type: () => Function,
                    paramTypes: () => [Number],
                    returnType: () => void 0
                })];
            _set_x_decorators = [dec, __esMetadata("design:typeinfo", {
                    type: () => Number,
                    paramTypes: () => [Number]
                })];
            _y_decorators = [dec, __esMetadata("design:typeinfo", {
                    type: () => Number
                })];
            _static_method_decorators = [dec, __esMetadata("design:typeinfo", {
                    type: () => Function,
                    paramTypes: () => [Number],
                    returnType: () => void 0
                })];
            _static_set_x_decorators = [dec, __esMetadata("design:typeinfo", {
                    type: () => Number,
                    paramTypes: () => [Number]
                })];
            _static_y_decorators = [dec, __esMetadata("design:typeinfo", {
                    type: () => Number
                })];
            __esDecorate(_classThis, null, _static_method_decorators, { kind: "method", name: "method", static: true, private: false, access: { has: obj => "method" in obj, get: obj => obj.method }, metadata: _metadata }, null, _staticExtraInitializers);
            __esDecorate(_classThis, null, _static_set_x_decorators, { kind: "setter", name: "x", static: true, private: false, access: { has: obj => "x" in obj, set: (obj, value) => { obj.x = value; } }, metadata: _metadata }, null, _staticExtraInitializers);
            __esDecorate(_classThis, null, _method_decorators, { kind: "method", name: "method", static: false, private: false, access: { has: obj => "method" in obj, get: obj => obj.method }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_classThis, null, _set_x_decorators, { kind: "setter", name: "x", static: false, private: false, access: { has: obj => "x" in obj, set: (obj, value) => { obj.x = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, null, _static_y_decorators, { kind: "field", name: "y", static: true, private: false, access: { has: obj => "y" in obj, get: obj => obj.y, set: (obj, value) => { obj.y = value; } }, metadata: _metadata }, _static_y_initializers, _static_y_extraInitializers);
            __esDecorate(null, null, _y_decorators, { kind: "field", name: "y", static: false, private: false, access: { has: obj => "y" in obj, get: obj => obj.y, set: (obj, value) => { obj.y = value; } }, metadata: _metadata }, _y_initializers, _y_extraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            C = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _classThis.y = (__runInitializers(_classThis, _staticExtraInitializers), __runInitializers(_classThis, _static_y_initializers, void 0)),
        (() => {
            __runInitializers(_classThis, _static_y_extraInitializers);
            __runInitializers(_classThis, _classExtraInitializers);
        })(),
        _classThis);
    return C = _classThis;
})());
