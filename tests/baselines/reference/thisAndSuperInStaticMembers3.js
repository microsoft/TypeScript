//// [tests/cases/conformance/classes/members/instanceAndStaticMembers/thisAndSuperInStaticMembers3.ts] ////

//// [thisAndSuperInStaticMembers3.ts]
declare class B {
    static a: any;
    static f(): number;
    a: number;
    f(): number;
}

class C extends B {
    static x: any = undefined!;
    static y1 = this.x;
    static y2 = this.x();
    static y3 = this?.x();
    static y4 = this[("x")]();
    static y5 = this?.[("x")]();
    static z3 = super.f();
    static z4 = super["f"]();
    
    // these should be unaffected
    x = 1;
    y = this.x;
    z = super.f();
}

//// [thisAndSuperInStaticMembers3.js]
let C = (() => {
    var _a;
    class C extends B {
        constructor() {
            super(...arguments);
            // these should be unaffected
            Object.defineProperty(this, "x", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: 1
            });
            Object.defineProperty(this, "y", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: this.x
            });
            Object.defineProperty(this, "z", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: super.f()
            });
        }
    }
    _a = C;
    Object.defineProperty(C, "x", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: undefined
    });
    Object.defineProperty(C, "y1", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: _a.x
    });
    Object.defineProperty(C, "y2", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: _a.x()
    });
    Object.defineProperty(C, "y3", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: _a === null || _a === void 0 ? void 0 : _a.x()
    });
    Object.defineProperty(C, "y4", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: _a[("x")]()
    });
    Object.defineProperty(C, "y5", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: _a === null || _a === void 0 ? void 0 : _a[("x")]()
    });
    Object.defineProperty(C, "z3", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: super.f()
    });
    Object.defineProperty(C, "z4", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: super["f"]()
    });
    return C;
})();
