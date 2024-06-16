//// [tests/cases/compiler/esDecoratorsClassFieldsCrash.ts] ////

//// [esDecoratorsClassFieldsCrash.ts]
// https://github.com/microsoft/TypeScript/issues/58436
const dec = (x: number, y: number, z: number, t: number) => (_: any, ctx: DecoratorContext): any => { };
const Foo = class {
    @dec(1, 3, 3, 1) field: undefined
    @dec(2, 2, 0, 0) static field: undefined
    @dec(3, 1, 4, 1) accessor accessor: undefined
    @dec(4, 0, 1, 0) static accessor accessor: undefined
    //               ~~~~~~~~~~~~~~~ along with compiler options above caused the following crash:
    //
    // Error: Debug Failure.
    //  at getClassThis (src\compiler\transformers\classFields.ts:906:22)
    //  at transformAutoAccessor (src\compiler\transformers\classFields.ts:948:43
    //  ...
}


//// [esDecoratorsClassFieldsCrash.js]
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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
// https://github.com/microsoft/TypeScript/issues/58436
const dec = (x, y, z, t) => (_, ctx) => { };
const Foo = (() => {
    let _static_field_decorators;
    let _static_field_initializers = [];
    let _static_field_extraInitializers = [];
    let _static_accessor_decorators;
    let _static_accessor_initializers = [];
    let _static_accessor_extraInitializers = [];
    let _field_decorators;
    let _field_initializers = [];
    let _field_extraInitializers = [];
    let _accessor_decorators;
    let _accessor_initializers = [];
    let _accessor_extraInitializers = [];
    return class {
        static { __setFunctionName(this, "Foo"); }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _field_decorators = [dec(1, 3, 3, 1)];
            _static_field_decorators = [dec(2, 2, 0, 0)];
            _accessor_decorators = [dec(3, 1, 4, 1)];
            _static_accessor_decorators = [dec(4, 0, 1, 0)];
            __esDecorate(this, null, _static_accessor_decorators, { kind: "accessor", name: "accessor", static: true, private: false, access: { has: obj => "accessor" in obj, get: obj => obj.accessor, set: (obj, value) => { obj.accessor = value; } }, metadata: _metadata }, _static_accessor_initializers, _static_accessor_extraInitializers);
            __esDecorate(this, null, _accessor_decorators, { kind: "accessor", name: "accessor", static: false, private: false, access: { has: obj => "accessor" in obj, get: obj => obj.accessor, set: (obj, value) => { obj.accessor = value; } }, metadata: _metadata }, _accessor_initializers, _accessor_extraInitializers);
            __esDecorate(null, null, _static_field_decorators, { kind: "field", name: "field", static: true, private: false, access: { has: obj => "field" in obj, get: obj => obj.field, set: (obj, value) => { obj.field = value; } }, metadata: _metadata }, _static_field_initializers, _static_field_extraInitializers);
            __esDecorate(null, null, _field_decorators, { kind: "field", name: "field", static: false, private: false, access: { has: obj => "field" in obj, get: obj => obj.field, set: (obj, value) => { obj.field = value; } }, metadata: _metadata }, _field_initializers, _field_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static { this.field = __runInitializers(this, _static_field_initializers, void 0); }
        #accessor_accessor_storage;
        get accessor() { return this.#accessor_accessor_storage; }
        set accessor(value) { this.#accessor_accessor_storage = value; }
        static #accessor_1_accessor_storage = (__runInitializers(this, _static_field_extraInitializers), __runInitializers(this, _static_accessor_initializers, void 0));
        static get accessor() { return this.#accessor_1_accessor_storage; }
        static set accessor(value) { this.#accessor_1_accessor_storage = value; }
        constructor() {
            this.field = __runInitializers(this, _field_initializers, void 0);
            this.#accessor_accessor_storage = (__runInitializers(this, _field_extraInitializers), __runInitializers(this, _accessor_initializers, void 0));
            __runInitializers(this, _accessor_extraInitializers);
        }
        static {
            __runInitializers(this, _static_accessor_extraInitializers);
        }
    };
})();
