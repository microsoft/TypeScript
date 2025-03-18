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
class C extends B {
    static x = undefined;
    static y1 = this.x;
    static y2 = this.x();
    static y3 = this?.x();
    static y4 = this[("x")]();
    static y5 = this?.[("x")]();
    static z3 = super.f();
    static z4 = super["f"]();
    x = 1;
    y = this.x;
    z = super.f();
}
