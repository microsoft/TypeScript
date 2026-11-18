//// [tests/cases/compiler/malformedDestructuringAssignmentTransformVariants.ts] ////

//// [malformedDestructuringAssignmentTransformVariants.ts]
declare function dec(...args: any[]): any;
declare const value: any;

class Base {
    static x: any;
}

@dec
class C extends Base {
    static #x: any;

    static {
        // Invalid array targets must still visit private and super accesses.
        [super.x, 0, this.#x] = value;
        [super.x, 1 + 2, this.#x] = value;
        [super.x, (() => {}), this.#x] = value;
        [super.x, value(), this.#x] = value;
        [super.x, , ...this.#x] = value;

        // Object methods/accessors are not destructuring assignment elements.
        ({ x: super.x, m() {}, private: this.#x } = value);
        ({ x: super.x, get g() { return 1; }, private: this.#x } = value);
        ({ x: super.x, set s(v) {}, private: this.#x } = value);
        ({ x: [super.x, 0, this.#x], m() {} } = value);
    }
}


//// [malformedDestructuringAssignmentTransformVariants.js]
"use strict";
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
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
class Base {
    static x;
}
let C = (() => {
    var _C_x;
    let _classDecorators = [dec];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = Base;
    var C = class extends _classSuper {
        static { _classThis = this; }
        static { __setFunctionName(this, "C"); }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            C = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static {
            _C_x = { value: void 0 };
        }
        static {
            // Invalid array targets must still visit private and super accesses.
            [({ set value(_a) { Reflect.set(_classSuper, "x", _a, _classThis); } }).value, 0, ({ set value(_a) { __classPrivateFieldSet(_classThis, _classThis, _a, "f", _C_x); } }).value] = value;
            [({ set value(_a) { Reflect.set(_classSuper, "x", _a, _classThis); } }).value, 1 + 2, ({ set value(_a) { __classPrivateFieldSet(_classThis, _classThis, _a, "f", _C_x); } }).value] = value;
            [({ set value(_a) { Reflect.set(_classSuper, "x", _a, _classThis); } }).value, (() => { }), ({ set value(_a) { __classPrivateFieldSet(_classThis, _classThis, _a, "f", _C_x); } }).value] = value;
            [({ set value(_a) { Reflect.set(_classSuper, "x", _a, _classThis); } }).value, value(), ({ set value(_a) { __classPrivateFieldSet(_classThis, _classThis, _a, "f", _C_x); } }).value] = value;
            [({ set value(_a) { Reflect.set(_classSuper, "x", _a, _classThis); } }).value, , ...({ set value(_a) { __classPrivateFieldSet(_classThis, _classThis, _a, "f", _C_x); } }).value] = value;
            // Object methods/accessors are not destructuring assignment elements.
            ({ x: ({ set value(_a) { Reflect.set(_classSuper, "x", _a, _classThis); } }).value, m() { }, private: ({ set value(_a) { __classPrivateFieldSet(_classThis, _classThis, _a, "f", _C_x); } }).value } = value);
            ({ x: ({ set value(_a) { Reflect.set(_classSuper, "x", _a, _classThis); } }).value, get g() { return 1; }, private: ({ set value(_a) { __classPrivateFieldSet(_classThis, _classThis, _a, "f", _C_x); } }).value } = value);
            ({ x: ({ set value(_a) { Reflect.set(_classSuper, "x", _a, _classThis); } }).value, set s(v) { }, private: ({ set value(_a) { __classPrivateFieldSet(_classThis, _classThis, _a, "f", _C_x); } }).value } = value);
            ({ x: [({ set value(_a) { Reflect.set(_classSuper, "x", _a, _classThis); } }).value, 0, ({ set value(_a) { __classPrivateFieldSet(_classThis, _classThis, _a, "f", _C_x); } }).value], m() { } } = value);
        }
        static {
            __runInitializers(_classThis, _classExtraInitializers);
        }
    };
    return C = _classThis;
})();
