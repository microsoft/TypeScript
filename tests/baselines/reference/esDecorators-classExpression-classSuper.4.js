//// [tests/cases/conformance/esDecorators/classExpression/classSuper/esDecorators-classExpression-classSuper.4.ts] ////

//// [esDecorators-classExpression-classSuper.4.ts]
declare var dec: any;

declare class Base {
    static method(...args: any[]): number;
}

const method = "method";

(@dec
class C extends Base {
    static a = super.method();
    static b = super["method"]();
    static c = super[method]();
    static d = super.method``;
    static e = super["method"]``;
    static f = super[method]``;
});


//// [esDecorators-classExpression-classSuper.4.js]
const method = "method";
((() => {
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
        static a = Reflect.get(_classSuper, "method", _classThis).call(_classThis);
        static b = Reflect.get(_classSuper, "method", _classThis).call(_classThis);
        static c = Reflect.get(_classSuper, method, _classThis).call(_classThis);
        static d = Reflect.get(_classSuper, "method", _classThis).bind(_classThis) ``;
        static e = Reflect.get(_classSuper, "method", _classThis).bind(_classThis) ``;
        static f = Reflect.get(_classSuper, method, _classThis).bind(_classThis) ``;
        static {
            __runInitializers(_classThis, _classExtraInitializers);
        }
    };
    return C = _classThis;
})());
