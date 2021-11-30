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
var _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
class C extends (_c = B) {
    constructor() {
        super(...arguments);
        // these should be unaffected
        this.x = 1;
        this.y = this.x;
        this.z = super.f();
    }
}
_b = C;
C.x = undefined;
C.y1 = _b.x;
C.y2 = _b.x();
C.y3 = _b === null || _b === void 0 ? void 0 : _b.x();
C.y4 = _b[("x")]();
C.y5 = _b === null || _b === void 0 ? void 0 : _b[("x")]();
C.z1 = Reflect.get(_c, "a", _b);
C.z2 = Reflect.get(_c, "a", _b);
C.z3 = Reflect.get(_c, "f", _b).call(_b);
C.z4 = Reflect.get(_c, "f", _b).call(_b);
C.z5 = (Reflect.set(_c, "a", _d = 0, _b), _d);
C.z6 = (Reflect.set(_c, "a", _e = Reflect.get(_c, "a", _b) + 1, _b), _e);
C.z7 = (() => { Reflect.set(_c, "a", 0, _b); })();
C.z8 = [({ set value(_a) { Reflect.set(_c, "a", _a, _b); } }).value] = [0];
C.z9 = [({ set value(_a) { Reflect.set(_c, "a", _a, _b); } }).value = 0] = [0];
C.z10 = [...({ set value(_a) { Reflect.set(_c, "a", _a, _b); } }).value] = [0];
C.z11 = { x: ({ set value(_a) { Reflect.set(_c, "a", _a, _b); } }).value } = { x: 0 };
C.z12 = { x: ({ set value(_a) { Reflect.set(_c, "a", _a, _b); } }).value = 0 } = { x: 0 };
C.z13 = (_a = { x: 0 }, ({ set value(_a) { Reflect.set(_c, "a", _a, _b); } }).value = __rest(_a, []), _a);
C.z14 = (Reflect.set(_c, "a", (_g = Reflect.get(_c, "a", _b), _f = ++_g), _b), _f);
C.z15 = (Reflect.set(_c, "a", (_j = Reflect.get(_c, "a", _b), _h = --_j), _b), _h);
C.z16 = (Reflect.set(_c, _k = ("a"), (_m = Reflect.get(_c, _k, _b), _l = ++_m), _b), _l);
C.z17 = (Reflect.set(_c, "a", (_p = Reflect.get(_c, "a", _b), _o = _p++, _p), _b), _o);
C.z18 = Reflect.get(_c, "a", _b).bind(_b) ``;
