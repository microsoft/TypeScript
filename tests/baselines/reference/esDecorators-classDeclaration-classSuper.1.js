//// [tests/cases/conformance/esDecorators/classDeclaration/classSuper/esDecorators-classDeclaration-classSuper.1.ts] ////

//// [esDecorators-classDeclaration-classSuper.1.ts]
declare var dec: any;

declare class Base {
    static method(...args: any[]): void;
}

const method = "method";

@dec
class C extends Base {
    static {
        super.method();
        super["method"]();
        super[method]();

        super.method``;
        super["method"]``;
        super[method]``;
    }
}


//// [esDecorators-classDeclaration-classSuper.1.js]
const method = "method";
let C = (() => {
    let _classDecorators = [dec];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = Base;
    var C = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            C = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static {
            Reflect.get(_classSuper, "method", _classThis).call(_classThis);
            Reflect.get(_classSuper, "method", _classThis).call(_classThis);
            Reflect.get(_classSuper, method, _classThis).call(_classThis);
            Reflect.get(_classSuper, "method", _classThis).bind(_classThis) ``;
            Reflect.get(_classSuper, "method", _classThis).bind(_classThis) ``;
            Reflect.get(_classSuper, method, _classThis).bind(_classThis) ``;
        }
        static {
            __runInitializers(_classThis, _classExtraInitializers);
        }
    };
    return C = _classThis;
})();
