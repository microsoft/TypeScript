//// [tests/cases/conformance/classes/members/instanceAndStaticMembers/thisAndSuperInStaticMembers2.ts] ////

//// [thisAndSuperInStaticMembers2.ts]
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
    static z1 = super.a;
    static z2 = super["a"];
    static z3 = super.f();
    static z4 = super["f"]();
    static z5 = super.a = 0;
    static z6 = super.a += 1;
    static z7 = (() => { super.a = 0; })();
    static z8 = [super.a] = [0];
    static z9 = [super.a = 0] = [0];
    static z10 = [...super.a] = [0];
    static z11 = { x: super.a } = { x: 0 };
    static z12 = { x: super.a = 0 } = { x: 0 };
    static z13 = { ...super.a } = { x: 0 };
    static z14 = ++super.a;
    static z15 = --super.a;
    static z16 = ++super[("a")];
    static z17 = super.a++;
    static z18 = super.a``;

    // these should be unaffected
    x = 1;
    y = this.x;
    z = super.f();
}


//// [thisAndSuperInStaticMembers2.js]
class C extends B {
    constructor() {
        super(...arguments);
        // these should be unaffected
        this.x = 1;
        this.y = this.x;
        this.z = super.f();
    }
    static { this.x = undefined; }
    static { this.y1 = this.x; }
    static { this.y2 = this.x(); }
    static { this.y3 = this?.x(); }
    static { this.y4 = this[("x")](); }
    static { this.y5 = this?.[("x")](); }
    static { this.z1 = super.a; }
    static { this.z2 = super["a"]; }
    static { this.z3 = super.f(); }
    static { this.z4 = super["f"](); }
    static { this.z5 = super.a = 0; }
    static { this.z6 = super.a += 1; }
    static { this.z7 = (() => { super.a = 0; })(); }
    static { this.z8 = [super.a] = [0]; }
    static { this.z9 = [super.a = 0] = [0]; }
    static { this.z10 = [...super.a] = [0]; }
    static { this.z11 = { x: super.a } = { x: 0 }; }
    static { this.z12 = { x: super.a = 0 } = { x: 0 }; }
    static { this.z13 = { ...super.a } = { x: 0 }; }
    static { this.z14 = ++super.a; }
    static { this.z15 = --super.a; }
    static { this.z16 = ++super[("a")]; }
    static { this.z17 = super.a++; }
    static { this.z18 = super.a ``; }
}
