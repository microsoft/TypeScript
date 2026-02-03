//// [tests/cases/conformance/classes/members/instanceAndStaticMembers/thisAndSuperInStaticMembers4.ts] ////

//// [thisAndSuperInStaticMembers4.ts]
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

//// [thisAndSuperInStaticMembers4.js]
let C = (() => {
    var _a;
    class C extends B {
        constructor() {
            super(...arguments);
            // these should be unaffected
            this.x = 1;
            this.y = this.x;
            this.z = super.f();
        }
    }
    _a = C;
    C.x = undefined;
    C.y1 = _a.x;
    C.y2 = _a.x();
    C.y3 = _a === null || _a === void 0 ? void 0 : _a.x();
    C.y4 = _a[("x")]();
    C.y5 = _a === null || _a === void 0 ? void 0 : _a[("x")]();
    C.z3 = super.f();
    C.z4 = super["f"]();
    return C;
})();
