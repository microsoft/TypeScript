//// [tests/cases/conformance/esDecorators/classDeclaration/esDecorators-classDeclaration-classDecoratorContextNameStaticGetter.ts] ////

//// [esDecorators-classDeclaration-classDecoratorContextNameStaticGetter.ts]
// https://github.com/microsoft/TypeScript/issues/62870
// ClassDecoratorContext.name should use the actual class name, not the static name getter

const decorate = (_: unknown, ctx: ClassDecoratorContext) => {
    console.log('decorate(%o)', ctx.name);
};

// Named class with static name getter - ctx.name should be "A", not the getter value
@decorate
class A {
    static get name() {
        return 2434;
    }
}

// Named class with static name property - ctx.name should be "B", not the property value
@decorate
class B {
    static name = "not B";
}

// Named class without overriding name - ctx.name should be "C"
@decorate
class C {
}


//// [esDecorators-classDeclaration-classDecoratorContextNameStaticGetter.js]
// https://github.com/microsoft/TypeScript/issues/62870
// ClassDecoratorContext.name should use the actual class name, not the static name getter
const decorate = (_, ctx) => {
    console.log('decorate(%o)', ctx.name);
};
// Named class with static name getter - ctx.name should be "A", not the getter value
let A = (() => {
    let _classDecorators = [decorate];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var A = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: "A", metadata: _metadata }, null, _classExtraInitializers);
            A = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        static get name() {
            return 2434;
        }
    };
    return A = _classThis;
})();
// Named class with static name property - ctx.name should be "B", not the property value
let B = (() => {
    let _classDecorators = [decorate];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var B = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: "B", metadata: _metadata }, null, _classExtraInitializers);
            B = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static name = "not B";
        static {
            __runInitializers(_classThis, _classExtraInitializers);
        }
    };
    return B = _classThis;
})();
// Named class without overriding name - ctx.name should be "C"
let C = (() => {
    let _classDecorators = [decorate];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var C = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: "C", metadata: _metadata }, null, _classExtraInitializers);
            C = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
    };
    return C = _classThis;
})();
