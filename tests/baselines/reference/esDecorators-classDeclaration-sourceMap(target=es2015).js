//// [tests/cases/conformance/esDecorators/classDeclaration/esDecorators-classDeclaration-sourceMap.ts] ////

//// [esDecorators-classDeclaration-sourceMap.ts]
declare var dec: any;

@dec
@dec
class C {
    @dec
    @dec
    method() {}

    @dec
    @dec
    get x() { return 1; }

    @dec
    @dec
    set x(value: number) { }

    @dec
    @dec
    y = 1;

    @dec
    @dec
    accessor z = 1;

    @dec
    @dec
    static #method() {}

    @dec
    @dec
    static get #x() { return 1; }

    @dec
    @dec
    static set #x(value: number) { }

    @dec
    @dec
    static #y = 1;

    @dec
    @dec
    static accessor #z = 1;
}


//// [esDecorators-classDeclaration-sourceMap.js]
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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldIn = (this && this.__classPrivateFieldIn) || function(state, receiver) {
    if (receiver === null || (typeof receiver !== "object" && typeof receiver !== "function")) throw new TypeError("Cannot use 'in' operator on non-object");
    return typeof state === "function" ? receiver === state : state.has(receiver);
};
let C = (() => {
    var _C_method_get, _C_x_get, _C_x_set, _C_y, _C_z_accessor_storage, _C_z_get, _C_z_set, _C_z_1_accessor_storage;
    let _classDecorators = [dec, dec];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _staticExtraInitializers = [];
    let _instanceExtraInitializers = [];
    let _static_private_method_decorators;
    let _static_private_method_descriptor;
    let _static_private_get_x_decorators;
    let _static_private_get_x_descriptor;
    let _static_private_set_x_decorators;
    let _static_private_set_x_descriptor;
    let _static_private_y_decorators;
    let _static_private_y_initializers = [];
    let _static_private_y_extraInitializers = [];
    let _static_private_z_decorators;
    let _static_private_z_initializers = [];
    let _static_private_z_extraInitializers = [];
    let _static_private_z_descriptor;
    let _method_decorators;
    let _get_x_decorators;
    let _set_x_decorators;
    let _y_decorators;
    let _y_initializers = [];
    let _y_extraInitializers = [];
    let _z_decorators;
    let _z_initializers = [];
    let _z_extraInitializers = [];
    var C = _classThis = class {
        method() { }
        get x() { return 1; }
        set x(value) { }
        get z() { return __classPrivateFieldGet(this, _C_z_1_accessor_storage, "f"); }
        set z(value) { __classPrivateFieldSet(this, _C_z_1_accessor_storage, value, "f"); }
        constructor() {
            this.y = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _y_initializers, 1));
            _C_z_1_accessor_storage.set(this, (__runInitializers(this, _y_extraInitializers), __runInitializers(this, _z_initializers, 1)));
            __runInitializers(this, _z_extraInitializers);
        }
    };
    _C_z_1_accessor_storage = new WeakMap();
    _C_method_get = function _C_method_get() { return _static_private_method_descriptor.value; };
    _C_x_get = function _C_x_get() { return _static_private_get_x_descriptor.get.call(this); };
    _C_x_set = function _C_x_set(value) { return _static_private_set_x_descriptor.set.call(this, value); };
    _C_z_get = function _C_z_get() { return _static_private_z_descriptor.get.call(this); };
    _C_z_set = function _C_z_set(value) { return _static_private_z_descriptor.set.call(this, value); };
    __setFunctionName(_classThis, "C");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _method_decorators = [dec, dec];
        _get_x_decorators = [dec, dec];
        _set_x_decorators = [dec, dec];
        _y_decorators = [dec, dec];
        _z_decorators = [dec, dec];
        _static_private_method_decorators = [dec, dec];
        _static_private_get_x_decorators = [dec, dec];
        _static_private_set_x_decorators = [dec, dec];
        _static_private_y_decorators = [dec, dec];
        _static_private_z_decorators = [dec, dec];
        __esDecorate(_classThis, _static_private_method_descriptor = { value: __setFunctionName(function () { }, "#method") }, _static_private_method_decorators, { kind: "method", name: "#method", static: true, private: true, access: { has: obj => __classPrivateFieldIn(_classThis, obj), get: obj => __classPrivateFieldGet(obj, _classThis, "a", _C_method_get) }, metadata: _metadata }, null, _staticExtraInitializers);
        __esDecorate(_classThis, _static_private_get_x_descriptor = { get: __setFunctionName(function () { return 1; }, "#x", "get") }, _static_private_get_x_decorators, { kind: "getter", name: "#x", static: true, private: true, access: { has: obj => __classPrivateFieldIn(_classThis, obj), get: obj => __classPrivateFieldGet(obj, _classThis, "a", _C_x_get) }, metadata: _metadata }, null, _staticExtraInitializers);
        __esDecorate(_classThis, _static_private_set_x_descriptor = { set: __setFunctionName(function (value) { }, "#x", "set") }, _static_private_set_x_decorators, { kind: "setter", name: "#x", static: true, private: true, access: { has: obj => __classPrivateFieldIn(_classThis, obj), set: (obj, value) => { __classPrivateFieldSet(obj, _classThis, value, "a", _C_x_set); } }, metadata: _metadata }, null, _staticExtraInitializers);
        __esDecorate(_classThis, _static_private_z_descriptor = { get: __setFunctionName(function () { return __classPrivateFieldGet(_classThis, _classThis, "f", _C_z_accessor_storage); }, "#z", "get"), set: __setFunctionName(function (value) { __classPrivateFieldSet(_classThis, _classThis, value, "f", _C_z_accessor_storage); }, "#z", "set") }, _static_private_z_decorators, { kind: "accessor", name: "#z", static: true, private: true, access: { has: obj => __classPrivateFieldIn(_classThis, obj), get: obj => __classPrivateFieldGet(obj, _classThis, "a", _C_z_get), set: (obj, value) => { __classPrivateFieldSet(obj, _classThis, value, "a", _C_z_set); } }, metadata: _metadata }, _static_private_z_initializers, _static_private_z_extraInitializers);
        __esDecorate(_classThis, null, _method_decorators, { kind: "method", name: "method", static: false, private: false, access: { has: obj => "method" in obj, get: obj => obj.method }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_x_decorators, { kind: "getter", name: "x", static: false, private: false, access: { has: obj => "x" in obj, get: obj => obj.x }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _set_x_decorators, { kind: "setter", name: "x", static: false, private: false, access: { has: obj => "x" in obj, set: (obj, value) => { obj.x = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _z_decorators, { kind: "accessor", name: "z", static: false, private: false, access: { has: obj => "z" in obj, get: obj => obj.z, set: (obj, value) => { obj.z = value; } }, metadata: _metadata }, _z_initializers, _z_extraInitializers);
        __esDecorate(null, null, _static_private_y_decorators, { kind: "field", name: "#y", static: true, private: true, access: { has: obj => __classPrivateFieldIn(_classThis, obj), get: obj => __classPrivateFieldGet(obj, _classThis, "f", _C_y), set: (obj, value) => { __classPrivateFieldSet(obj, _classThis, value, "f", _C_y); } }, metadata: _metadata }, _static_private_y_initializers, _static_private_y_extraInitializers);
        __esDecorate(null, null, _y_decorators, { kind: "field", name: "y", static: false, private: false, access: { has: obj => "y" in obj, get: obj => obj.y, set: (obj, value) => { obj.y = value; } }, metadata: _metadata }, _y_initializers, _y_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        C = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    })();
    _C_y = { value: (__runInitializers(_classThis, _staticExtraInitializers), __runInitializers(_classThis, _static_private_y_initializers, 1)) };
    _C_z_accessor_storage = { value: (__runInitializers(_classThis, _static_private_y_extraInitializers), __runInitializers(_classThis, _static_private_z_initializers, 1)) };
    (() => {
        __runInitializers(_classThis, _static_private_z_extraInitializers);
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return C = _classThis;
})();
//# sourceMappingURL=esDecorators-classDeclaration-sourceMap.js.map

//// [esDecorators-classDeclaration-sourceMap.d.ts]
declare var dec: any;
declare class C {
    #private;
    method(): void;
    get x(): number;
    set x(value: number);
    y: number;
    accessor z: number;
}
//# sourceMappingURL=esDecorators-classDeclaration-sourceMap.d.ts.map