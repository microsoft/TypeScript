//// [tests/cases/conformance/esDecorators/classDeclaration/classSuper/esDecorators-classDeclaration-classSuper.6.ts] ////

//// [esDecorators-classDeclaration-classSuper.6.ts]
declare var dec: any;

declare class Base {
    static method(...args: any[]): number;
    method(...args: any[]): number;
}

// none of the following should result in caching `super`
@dec
class C extends Base {
    static m() { super.method(); }
    static get x() { return super.method(); }
    static set x(v: number) { super.method(); }

    constructor() {
        super();
        super.method();
    }

    a = super.method();
    m() { super.method(); }
    get x() { return super.method(); }
    set x(v: number) { super.method(); }
}


//// [esDecorators-classDeclaration-classSuper.6.js]
// none of the following should result in caching `super`
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
            __runInitializers(_classThis, _classExtraInitializers);
        }
        static m() { super.method(); }
        static get x() { return super.method(); }
        static set x(v) { super.method(); }
        constructor() {
            super();
            super.method();
        }
        a = super.method();
        m() { super.method(); }
        get x() { return super.method(); }
        set x(v) { super.method(); }
    };
    return C = _classThis;
})();
