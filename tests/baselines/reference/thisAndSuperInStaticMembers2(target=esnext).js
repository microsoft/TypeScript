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
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
class C extends (_b = B) {
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
C.y3 = _a?.x();
C.y4 = _a[("x")]();
C.y5 = _a?.[("x")]();
C.z1 = Reflect.get(_b, "a", _a);
C.z2 = Reflect.get(_b, "a", _a);
C.z3 = Reflect.get(_b, "f", _a).call(_a);
C.z4 = Reflect.get(_b, "f", _a).call(_a);
C.z5 = (Reflect.set(_b, "a", _c = 0, _a), _c);
C.z6 = (Reflect.set(_b, "a", _d = Reflect.get(_b, "a", _a) + 1, _a), _d);
C.z7 = (() => { Reflect.set(_b, "a", 0, _a); })();
C.z8 = [({ set value(_c) { Reflect.set(_b, "a", _c, _a); } }).value] = [0];
C.z9 = [({ set value(_c) { Reflect.set(_b, "a", _c, _a); } }).value = 0] = [0];
C.z10 = [...({ set value(_c) { Reflect.set(_b, "a", _c, _a); } }).value] = [0];
C.z11 = { x: ({ set value(_c) { Reflect.set(_b, "a", _c, _a); } }).value } = { x: 0 };
C.z12 = { x: ({ set value(_c) { Reflect.set(_b, "a", _c, _a); } }).value = 0 } = { x: 0 };
C.z13 = { ...({ set value(_c) { Reflect.set(_b, "a", _c, _a); } }).value } = { x: 0 };
C.z14 = (Reflect.set(_b, "a", (_f = Reflect.get(_b, "a", _a), _e = ++_f), _a), _e);
C.z15 = (Reflect.set(_b, "a", (_h = Reflect.get(_b, "a", _a), _g = --_h), _a), _g);
C.z16 = (Reflect.set(_b, _j = ("a"), (_l = Reflect.get(_b, _j, _a), _k = ++_l), _a), _k);
C.z17 = (Reflect.set(_b, "a", (_o = Reflect.get(_b, "a", _a), _m = _o++, _o), _a), _m);
C.z18 = Reflect.get(_b, "a", _a).bind(_a) ``;
