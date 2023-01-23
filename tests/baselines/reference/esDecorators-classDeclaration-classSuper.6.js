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
    var C = class extends Base {
        static {
            __esDecorate(null, _classDescriptor = { value: this }, _classDecorators, { kind: "class", name: this.name }, null, _classExtraInitializers);
            C = _classThis = _classDescriptor.value;
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
