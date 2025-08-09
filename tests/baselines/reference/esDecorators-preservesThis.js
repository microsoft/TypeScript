//// [tests/cases/conformance/esDecorators/esDecorators-preservesThis.ts] ////

//// [esDecorators-preservesThis.ts]
// https://github.com/microsoft/TypeScript/issues/53752

declare class DecoratorProvider {
    decorate<T>(this: DecoratorProvider, v: T, ctx: DecoratorContext): T;
}

declare const instance: DecoratorProvider;

// preserve `this` for access
class C {
    @instance.decorate
    method1() { }

    @(instance["decorate"])
    method2() { }

    // even in parens
    @((instance.decorate))
    method3() { }
}

// preserve `this` for `super` access
class D extends DecoratorProvider {
    m() {
        class C {
            @(super.decorate)
            method1() { }

            @(super["decorate"])
            method2() { }

            @((super.decorate))
            method3() { }
        }
    }
}


//// [esDecorators-preservesThis.js]
// https://github.com/microsoft/TypeScript/issues/53752
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
// preserve `this` for access
let C = (() => {
    var _a, _b, _c;
    let _instanceExtraInitializers = [];
    let _method1_decorators;
    let _method2_decorators;
    let _method3_decorators;
    return class C {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _method1_decorators = [(_a = instance).decorate.bind(_a)];
            _method2_decorators = [((_b = instance)["decorate"].bind(_b))];
            _method3_decorators = [(((_c = instance).decorate.bind(_c)))];
            __esDecorate(this, null, _method1_decorators, { kind: "method", name: "method1", static: false, private: false, access: { has: obj => "method1" in obj, get: obj => obj.method1 }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _method2_decorators, { kind: "method", name: "method2", static: false, private: false, access: { has: obj => "method2" in obj, get: obj => obj.method2 }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _method3_decorators, { kind: "method", name: "method3", static: false, private: false, access: { has: obj => "method3" in obj, get: obj => obj.method3 }, metadata: _metadata }, null, _instanceExtraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        method1() { }
        method2() { }
        // even in parens
        method3() { }
        constructor() {
            __runInitializers(this, _instanceExtraInitializers);
        }
    };
})();
// preserve `this` for `super` access
class D extends DecoratorProvider {
    m() {
        let C = (() => {
            let _outerThis = this;
            let _instanceExtraInitializers = [];
            let _method1_decorators;
            let _method2_decorators;
            let _method3_decorators;
            return class C {
                static {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _method1_decorators = [(super.decorate.bind(_outerThis))];
                    _method2_decorators = [(super["decorate"].bind(_outerThis))];
                    _method3_decorators = [((super.decorate.bind(_outerThis)))];
                    __esDecorate(this, null, _method1_decorators, { kind: "method", name: "method1", static: false, private: false, access: { has: obj => "method1" in obj, get: obj => obj.method1 }, metadata: _metadata }, null, _instanceExtraInitializers);
                    __esDecorate(this, null, _method2_decorators, { kind: "method", name: "method2", static: false, private: false, access: { has: obj => "method2" in obj, get: obj => obj.method2 }, metadata: _metadata }, null, _instanceExtraInitializers);
                    __esDecorate(this, null, _method3_decorators, { kind: "method", name: "method3", static: false, private: false, access: { has: obj => "method3" in obj, get: obj => obj.method3 }, metadata: _metadata }, null, _instanceExtraInitializers);
                    if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                }
                method1() { }
                method2() { }
                method3() { }
                constructor() {
                    __runInitializers(this, _instanceExtraInitializers);
                }
            };
        })();
    }
}
