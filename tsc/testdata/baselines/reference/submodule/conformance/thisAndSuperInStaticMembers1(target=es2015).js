//// [tests/cases/conformance/classes/members/instanceAndStaticMembers/thisAndSuperInStaticMembers1.ts] ////

//// [thisAndSuperInStaticMembers1.ts]
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


//// [thisAndSuperInStaticMembers1.js]
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var _a;
class C extends B {
    static x = undefined;
    static y1 = this.x;
    static y2 = this.x();
    static y3 = this === null || this === void 0 ? void 0 : this.x();
    static y4 = this[("x")]();
    static y5 = this === null || this === void 0 ? void 0 : this[("x")]();
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
    static z13 = (_a = { x: 0 }, super.a = __rest(_a, []));
    static z14 = ++super.a;
    static z15 = --super.a;
    static z16 = ++super[("a")];
    static z17 = super.a++;
    static z18 = super.a ``;
    // these should be unaffected
    x = 1;
    y = this.x;
    z = super.f();
}
