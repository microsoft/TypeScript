//// [tests/cases/conformance/classes/propertyMemberDeclarations/staticAutoAccessorsWithDecorators.ts] ////

//// [staticAutoAccessorsWithDecorators.ts]
// https://github.com/microsoft/TypeScript/issues/53752

class A {
    // uses class reference
    @((t, c) => {})
    static accessor x = 1;

    // uses 'this'
    @((t, c) => {})
    accessor y = 2;
}


//// [staticAutoAccessorsWithDecorators.js]
// https://github.com/microsoft/TypeScript/issues/53752
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
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
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
let A = (() => {
    var _a, _A_x_accessor_storage, _A_y_accessor_storage;
    let _static_x_decorators;
    let _static_x_initializers = [];
    let _static_x_extraInitializers = [];
    let _y_decorators;
    let _y_initializers = [];
    let _y_extraInitializers = [];
    return _a = class A {
            // uses class reference
            static get x() { return __classPrivateFieldGet(_a, _a, "f", _A_x_accessor_storage); }
            static set x(value) { __classPrivateFieldSet(_a, _a, value, "f", _A_x_accessor_storage); }
            // uses 'this'
            get y() { return __classPrivateFieldGet(this, _A_y_accessor_storage, "f"); }
            set y(value) { __classPrivateFieldSet(this, _A_y_accessor_storage, value, "f"); }
            constructor() {
                _A_y_accessor_storage.set(this, __runInitializers(this, _y_initializers, 2));
                __runInitializers(this, _y_extraInitializers);
            }
        },
        _A_y_accessor_storage = new WeakMap(),
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _static_x_decorators = [((t, c) => { })];
            _y_decorators = [((t, c) => { })];
            __esDecorate(_a, null, _static_x_decorators, { kind: "accessor", name: "x", static: true, private: false, access: { has: obj => "x" in obj, get: obj => obj.x, set: (obj, value) => { obj.x = value; } }, metadata: _metadata }, _static_x_initializers, _static_x_extraInitializers);
            __esDecorate(_a, null, _y_decorators, { kind: "accessor", name: "y", static: false, private: false, access: { has: obj => "y" in obj, get: obj => obj.y, set: (obj, value) => { obj.y = value; } }, metadata: _metadata }, _y_initializers, _y_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        // uses class reference
        _A_x_accessor_storage = { value: __runInitializers(_a, _static_x_initializers, 1) },
        (() => {
            __runInitializers(_a, _static_x_extraInitializers);
        })(),
        _a;
})();
