//// [esDecorators-classExpression-classSuper.1.ts]
declare var dec: any;

declare class Base {
    static method(...args: any[]): void;
}

const method = "method";

(@dec
class C extends Base {
    static {
        super.method();
        super["method"]();
        super[method]();

        super.method``;
        super["method"]``;
        super[method]``;
    }
});

//// [esDecorators-classExpression-classSuper.1.js]
const method = "method";
((() => {
    let _classDecorators = [dec];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = Base;
    var C = class extends _classSuper {
        static {
            __esDecorate(null, _classDescriptor = { value: this }, _classDecorators, { kind: "class", name: this.name }, null, _classExtraInitializers);
            C = _classThis = _classDescriptor.value;
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
})());
