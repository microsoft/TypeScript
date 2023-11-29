//// [tests/cases/conformance/esDecorators/classExpression/classSuper/esDecorators-classExpression-classSuper.2.ts] ////

//// [esDecorators-classExpression-classSuper.2.ts]
declare var dec: any;

// class expression in extends should not get an assigned name
(@dec
class C1 extends class { } {
    static {
        super.name;
    }
});

// function expression in extends should not get an assigned name
(@dec
class C2 extends (function() {} as any) {
    static {
        super.name;
    }
});

// arrow function in extends should not get an assigned name
(@dec
class C3 extends ((() => {}) as any) {
    static {
        super.name;
    }
});


//// [esDecorators-classExpression-classSuper.2.js]
// class expression in extends should not get an assigned name
((() => {
    let _classDecorators = [dec];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = (0, class {
    });
    var C1 = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            C1 = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static {
            Reflect.get(_classSuper, "name", _classThis);
        }
        static {
            __runInitializers(_classThis, _classExtraInitializers);
        }
    };
    return C1 = _classThis;
})());
// function expression in extends should not get an assigned name
((() => {
    let _classDecorators = [dec];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = (0, function () { });
    var C2 = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            C2 = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static {
            Reflect.get(_classSuper, "name", _classThis);
        }
        static {
            __runInitializers(_classThis, _classExtraInitializers);
        }
    };
    return C2 = _classThis;
})());
// arrow function in extends should not get an assigned name
((() => {
    let _classDecorators = [dec];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = (0, (() => { }));
    var C3 = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            C3 = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static {
            Reflect.get(_classSuper, "name", _classThis);
        }
        static {
            __runInitializers(_classThis, _classExtraInitializers);
        }
    };
    return C3 = _classThis;
})());
