//// [decoratorsOnComputedProperties.ts]
function x(o: object, k: PropertyKey) { }
let i = 0;
function foo(): string { return ++i + ""; }

const fieldNameA: string = "fieldName1";
const fieldNameB: string = "fieldName2";
const fieldNameC: string = "fieldName3";

class A {
    @x ["property"]: any;
    @x [Symbol.toStringTag]: any;
    @x ["property2"]: any = 2;
    @x [Symbol.iterator]: any = null;
    ["property3"]: any;
    [Symbol.isConcatSpreadable]: any;
    ["property4"]: any = 2;
    [Symbol.match]: any = null;
    [foo()]: any;
    @x [foo()]: any;
    @x [foo()]: any = null;
    [fieldNameA]: any;
    @x [fieldNameB]: any;
    @x [fieldNameC]: any = null;
}

void class B {
    @x ["property"]: any;
    @x [Symbol.toStringTag]: any;
    @x ["property2"]: any = 2;
    @x [Symbol.iterator]: any = null;
    ["property3"]: any;
    [Symbol.isConcatSpreadable]: any;
    ["property4"]: any = 2;
    [Symbol.match]: any = null;
    [foo()]: any;
    @x [foo()]: any;
    @x [foo()]: any = null;
    [fieldNameA]: any;
    @x [fieldNameB]: any;
    @x [fieldNameC]: any = null;
};

class C {
    @x ["property"]: any;
    @x [Symbol.toStringTag]: any;
    @x ["property2"]: any = 2;
    @x [Symbol.iterator]: any = null;
    ["property3"]: any;
    [Symbol.isConcatSpreadable]: any;
    ["property4"]: any = 2;
    [Symbol.match]: any = null;
    [foo()]: any;
    @x [foo()]: any;
    @x [foo()]: any = null;
    [fieldNameA]: any;
    @x [fieldNameB]: any;
    @x [fieldNameC]: any = null;
    ["some" + "method"]() {}
}

void class D {
    @x ["property"]: any;
    @x [Symbol.toStringTag]: any;
    @x ["property2"]: any = 2;
    @x [Symbol.iterator]: any = null;
    ["property3"]: any;
    [Symbol.isConcatSpreadable]: any;
    ["property4"]: any = 2;
    [Symbol.match]: any = null;
    [foo()]: any;
    @x [foo()]: any;
    @x [foo()]: any = null;
    [fieldNameA]: any;
    @x [fieldNameB]: any;
    @x [fieldNameC]: any = null;
    ["some" + "method"]() {}
};

class E {
    @x ["property"]: any;
    @x [Symbol.toStringTag]: any;
    @x ["property2"]: any = 2;
    @x [Symbol.iterator]: any = null;
    ["property3"]: any;
    [Symbol.isConcatSpreadable]: any;
    ["property4"]: any = 2;
    [Symbol.match]: any = null;
    [foo()]: any;
    @x [foo()]: any;
    @x [foo()]: any = null;
    ["some" + "method"]() {}
    [fieldNameA]: any;
    @x [fieldNameB]: any;
    @x [fieldNameC]: any = null;
}

void class F {
    @x ["property"]: any;
    @x [Symbol.toStringTag]: any;
    @x ["property2"]: any = 2;
    @x [Symbol.iterator]: any = null;
    ["property3"]: any;
    [Symbol.isConcatSpreadable]: any;
    ["property4"]: any = 2;
    [Symbol.match]: any = null;
    [foo()]: any;
    @x [foo()]: any;
    @x [foo()]: any = null;
    ["some" + "method"]() {}
    [fieldNameA]: any;
    @x [fieldNameB]: any;
    @x [fieldNameC]: any = null;
};

class G {
    @x ["property"]: any;
    @x [Symbol.toStringTag]: any;
    @x ["property2"]: any = 2;
    @x [Symbol.iterator]: any = null;
    ["property3"]: any;
    [Symbol.isConcatSpreadable]: any;
    ["property4"]: any = 2;
    [Symbol.match]: any = null;
    [foo()]: any;
    @x [foo()]: any;
    @x [foo()]: any = null;
    ["some" + "method"]() {}
    [fieldNameA]: any;
    @x [fieldNameB]: any;
    ["some" + "method2"]() {}
    @x [fieldNameC]: any = null;
}

void class H {
    @x ["property"]: any;
    @x [Symbol.toStringTag]: any;
    @x ["property2"]: any = 2;
    @x [Symbol.iterator]: any = null;
    ["property3"]: any;
    [Symbol.isConcatSpreadable]: any;
    ["property4"]: any = 2;
    [Symbol.match]: any = null;
    [foo()]: any;
    @x [foo()]: any;
    @x [foo()]: any = null;
    ["some" + "method"]() {}
    [fieldNameA]: any;
    @x [fieldNameB]: any;
    ["some" + "method2"]() {}
    @x [fieldNameC]: any = null;
};

class I {
    @x ["property"]: any;
    @x [Symbol.toStringTag]: any;
    @x ["property2"]: any = 2;
    @x [Symbol.iterator]: any = null;
    ["property3"]: any;
    [Symbol.isConcatSpreadable]: any;
    ["property4"]: any = 2;
    [Symbol.match]: any = null;
    [foo()]: any;
    @x [foo()]: any;
    @x [foo()]: any = null;
    @x ["some" + "method"]() {}
    [fieldNameA]: any;
    @x [fieldNameB]: any;
    ["some" + "method2"]() {}
    @x [fieldNameC]: any = null;
}

void class J {
    @x ["property"]: any;
    @x [Symbol.toStringTag]: any;
    @x ["property2"]: any = 2;
    @x [Symbol.iterator]: any = null;
    ["property3"]: any;
    [Symbol.isConcatSpreadable]: any;
    ["property4"]: any = 2;
    [Symbol.match]: any = null;
    [foo()]: any;
    @x [foo()]: any;
    @x [foo()]: any = null;
    @x ["some" + "method"]() {}
    [fieldNameA]: any;
    @x [fieldNameB]: any;
    ["some" + "method2"]() {}
    @x [fieldNameC]: any = null;
};

//// [decoratorsOnComputedProperties.js]
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
var _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20, _21, _22, _23, _24, _25, _26, _27, _28, _29, _30, _31, _32, _33, _34, _35, _36, _37, _38, _39, _40, _41, _42, _43, _44, _45, _46, _47, _48, _49, _50, _51, _52, _53, _54, _55, _56;
function x(o, k) { }
let i = 0;
function foo() { return ++i + ""; }
const fieldNameA = "fieldName1";
const fieldNameB = "fieldName2";
const fieldNameC = "fieldName3";
class A {
    constructor() {
        this["property2"] = 2;
        this[_r] = null;
        this["property4"] = 2;
        this[_a] = null;
        this[_t] = null;
        this[_v] = null;
    }
}
_q = Symbol.toStringTag, _r = Symbol.iterator, Symbol.isConcatSpreadable, _a = Symbol.match, foo(), _s = foo(), _t = foo(), _u = fieldNameB, _v = fieldNameC;
__decorate([
    x
], A.prototype, "property", void 0);
__decorate([
    x
], A.prototype, _q, void 0);
__decorate([
    x
], A.prototype, "property2", void 0);
__decorate([
    x
], A.prototype, _r, void 0);
__decorate([
    x
], A.prototype, _s, void 0);
__decorate([
    x
], A.prototype, _t, void 0);
__decorate([
    x
], A.prototype, _u, void 0);
__decorate([
    x
], A.prototype, _v, void 0);
void (_2 = (_c = class B {
        constructor() {
            this["property2"] = 2;
            this[_x] = null;
            this["property4"] = 2;
            this[_b] = null;
            this[_z] = null;
            this[_1] = null;
        }
    },
    _w = Symbol.toStringTag,
    _x = Symbol.iterator,
    Symbol.isConcatSpreadable,
    _b = Symbol.match,
    foo(),
    _y = foo(),
    _z = foo(),
    _0 = fieldNameB,
    _1 = fieldNameC,
    _c), __decorate([
    x
], _2.prototype, "property", void 0), __decorate([
    x
], _2.prototype, _w, void 0), __decorate([
    x
], _2.prototype, "property2", void 0), __decorate([
    x
], _2.prototype, _x, void 0), __decorate([
    x
], _2.prototype, _y, void 0), __decorate([
    x
], _2.prototype, _z, void 0), __decorate([
    x
], _2.prototype, _0, void 0), __decorate([
    x
], _2.prototype, _1, void 0), _2);
class C {
    constructor() {
        this["property2"] = 2;
        this[_4] = null;
        this["property4"] = 2;
        this[_d] = null;
        this[_6] = null;
        this[_8] = null;
    }
    [(_3 = Symbol.toStringTag, _4 = Symbol.iterator, Symbol.isConcatSpreadable, _d = Symbol.match, foo(), _5 = foo(), _6 = foo(), _7 = fieldNameB, _8 = fieldNameC, "some" + "method")]() { }
}
__decorate([
    x
], C.prototype, "property", void 0);
__decorate([
    x
], C.prototype, _3, void 0);
__decorate([
    x
], C.prototype, "property2", void 0);
__decorate([
    x
], C.prototype, _4, void 0);
__decorate([
    x
], C.prototype, _5, void 0);
__decorate([
    x
], C.prototype, _6, void 0);
__decorate([
    x
], C.prototype, _7, void 0);
__decorate([
    x
], C.prototype, _8, void 0);
void (_15 = class D {
    constructor() {
        this["property2"] = 2;
        this[_10] = null;
        this["property4"] = 2;
        this[_e] = null;
        this[_12] = null;
        this[_14] = null;
    }
    [(_9 = Symbol.toStringTag, _10 = Symbol.iterator, Symbol.isConcatSpreadable, _e = Symbol.match, foo(), _11 = foo(), _12 = foo(), _13 = fieldNameB, _14 = fieldNameC, "some" + "method")]() { }
}, __decorate([
    x
], _15.prototype, "property", void 0), __decorate([
    x
], _15.prototype, _9, void 0), __decorate([
    x
], _15.prototype, "property2", void 0), __decorate([
    x
], _15.prototype, _10, void 0), __decorate([
    x
], _15.prototype, _11, void 0), __decorate([
    x
], _15.prototype, _12, void 0), __decorate([
    x
], _15.prototype, _13, void 0), __decorate([
    x
], _15.prototype, _14, void 0), _15);
class E {
    constructor() {
        this["property2"] = 2;
        this[_17] = null;
        this["property4"] = 2;
        this[_f] = null;
        this[_19] = null;
        this[_21] = null;
    }
    [(_16 = Symbol.toStringTag, _17 = Symbol.iterator, Symbol.isConcatSpreadable, _f = Symbol.match, foo(), _18 = foo(), _19 = foo(), "some" + "method")]() { }
}
_20 = fieldNameB, _21 = fieldNameC;
__decorate([
    x
], E.prototype, "property", void 0);
__decorate([
    x
], E.prototype, _16, void 0);
__decorate([
    x
], E.prototype, "property2", void 0);
__decorate([
    x
], E.prototype, _17, void 0);
__decorate([
    x
], E.prototype, _18, void 0);
__decorate([
    x
], E.prototype, _19, void 0);
__decorate([
    x
], E.prototype, _20, void 0);
__decorate([
    x
], E.prototype, _21, void 0);
void (_28 = (_h = class F {
        constructor() {
            this["property2"] = 2;
            this[_23] = null;
            this["property4"] = 2;
            this[_g] = null;
            this[_25] = null;
            this[_27] = null;
        }
        [(_22 = Symbol.toStringTag, _23 = Symbol.iterator, Symbol.isConcatSpreadable, _g = Symbol.match, foo(), _24 = foo(), _25 = foo(), "some" + "method")]() { }
    },
    _26 = fieldNameB,
    _27 = fieldNameC,
    _h), __decorate([
    x
], _28.prototype, "property", void 0), __decorate([
    x
], _28.prototype, _22, void 0), __decorate([
    x
], _28.prototype, "property2", void 0), __decorate([
    x
], _28.prototype, _23, void 0), __decorate([
    x
], _28.prototype, _24, void 0), __decorate([
    x
], _28.prototype, _25, void 0), __decorate([
    x
], _28.prototype, _26, void 0), __decorate([
    x
], _28.prototype, _27, void 0), _28);
class G {
    constructor() {
        this["property2"] = 2;
        this[_30] = null;
        this["property4"] = 2;
        this[_j] = null;
        this[_32] = null;
        this[_34] = null;
    }
    [(_29 = Symbol.toStringTag, _30 = Symbol.iterator, Symbol.isConcatSpreadable, _j = Symbol.match, foo(), _31 = foo(), _32 = foo(), "some" + "method")]() { }
    [(_33 = fieldNameB, "some" + "method2")]() { }
}
_34 = fieldNameC;
__decorate([
    x
], G.prototype, "property", void 0);
__decorate([
    x
], G.prototype, _29, void 0);
__decorate([
    x
], G.prototype, "property2", void 0);
__decorate([
    x
], G.prototype, _30, void 0);
__decorate([
    x
], G.prototype, _31, void 0);
__decorate([
    x
], G.prototype, _32, void 0);
__decorate([
    x
], G.prototype, _33, void 0);
__decorate([
    x
], G.prototype, _34, void 0);
void (_41 = (_l = class H {
        constructor() {
            this["property2"] = 2;
            this[_36] = null;
            this["property4"] = 2;
            this[_k] = null;
            this[_38] = null;
            this[_40] = null;
        }
        [(_35 = Symbol.toStringTag, _36 = Symbol.iterator, Symbol.isConcatSpreadable, _k = Symbol.match, foo(), _37 = foo(), _38 = foo(), "some" + "method")]() { }
        [(_39 = fieldNameB, "some" + "method2")]() { }
    },
    _40 = fieldNameC,
    _l), __decorate([
    x
], _41.prototype, "property", void 0), __decorate([
    x
], _41.prototype, _35, void 0), __decorate([
    x
], _41.prototype, "property2", void 0), __decorate([
    x
], _41.prototype, _36, void 0), __decorate([
    x
], _41.prototype, _37, void 0), __decorate([
    x
], _41.prototype, _38, void 0), __decorate([
    x
], _41.prototype, _39, void 0), __decorate([
    x
], _41.prototype, _40, void 0), _41);
class I {
    constructor() {
        this["property2"] = 2;
        this[_43] = null;
        this["property4"] = 2;
        this[_m] = null;
        this[_45] = null;
        this[_48] = null;
    }
    [(_42 = Symbol.toStringTag, _43 = Symbol.iterator, Symbol.isConcatSpreadable, _m = Symbol.match, foo(), _44 = foo(), _45 = foo(), _46 = "some" + "method")]() { }
    [(_47 = fieldNameB, "some" + "method2")]() { }
}
_48 = fieldNameC;
__decorate([
    x
], I.prototype, "property", void 0);
__decorate([
    x
], I.prototype, _42, void 0);
__decorate([
    x
], I.prototype, "property2", void 0);
__decorate([
    x
], I.prototype, _43, void 0);
__decorate([
    x
], I.prototype, _44, void 0);
__decorate([
    x
], I.prototype, _45, void 0);
__decorate([
    x
], I.prototype, _46, null);
__decorate([
    x
], I.prototype, _47, void 0);
__decorate([
    x
], I.prototype, _48, void 0);
void (_56 = (_p = class J {
        constructor() {
            this["property2"] = 2;
            this[_50] = null;
            this["property4"] = 2;
            this[_o] = null;
            this[_52] = null;
            this[_55] = null;
        }
        [(_49 = Symbol.toStringTag, _50 = Symbol.iterator, Symbol.isConcatSpreadable, _o = Symbol.match, foo(), _51 = foo(), _52 = foo(), _53 = "some" + "method")]() { }
        [(_54 = fieldNameB, "some" + "method2")]() { }
    },
    _55 = fieldNameC,
    _p), __decorate([
    x
], _56.prototype, "property", void 0), __decorate([
    x
], _56.prototype, _49, void 0), __decorate([
    x
], _56.prototype, "property2", void 0), __decorate([
    x
], _56.prototype, _50, void 0), __decorate([
    x
], _56.prototype, _51, void 0), __decorate([
    x
], _56.prototype, _52, void 0), __decorate([
    x
], _56.prototype, _53, null), __decorate([
    x
], _56.prototype, _54, void 0), __decorate([
    x
], _56.prototype, _55, void 0), _56);
