//// [tests/cases/conformance/esDecorators/metadata/esDecoratorsMetadata4.ts] ////

//// [foo.ts]
const PRIVATE_METADATA = new WeakMap();

function meta(key: string, value: string) {
    return (_, context) => {
        let metadata = PRIVATE_METADATA.get(context.metadata);

        if (!metadata) {
            metadata = {};
            PRIVATE_METADATA.set(context.metadata, metadata);
        }

        metadata[key] = value;
    };
}

@meta('a', 'x')
class C {
    @meta('b', 'y')
    m() { }
}

PRIVATE_METADATA.get(C[Symbol.metadata]).a; // 'x'
PRIVATE_METADATA.get(C[Symbol.metadata]).b; // 'y'


//// [foo.js]
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
const PRIVATE_METADATA = new WeakMap();
function meta(key, value) {
    return (_, context) => {
        let metadata = PRIVATE_METADATA.get(context.metadata);
        if (!metadata) {
            metadata = {};
            PRIVATE_METADATA.set(context.metadata, metadata);
        }
        metadata[key] = value;
    };
}
let C = (() => {
    let _classDecorators = [meta('a', 'x')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _m_decorators;
    var C = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _m_decorators = [meta('b', 'y')];
            __esDecorate(this, null, _m_decorators, { kind: "method", name: "m", static: false, private: false, access: { has: obj => "m" in obj, get: obj => obj.m }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            C = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        m() { }
        constructor() {
            __runInitializers(this, _instanceExtraInitializers);
        }
    };
    return C = _classThis;
})();
PRIVATE_METADATA.get(C[Symbol.metadata]).a; // 'x'
PRIVATE_METADATA.get(C[Symbol.metadata]).b; // 'y'
