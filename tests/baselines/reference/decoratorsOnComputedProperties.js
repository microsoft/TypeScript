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
var _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20, _21, _22, _23, _24, _25, _26, _27, _28, _29, _30, _31, _32, _33, _34, _35, _36, _37, _38, _39, _40, _41, _42, _43, _44, _45, _46, _47, _48, _49, _50, _51;
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
void (_c = class B {
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
    _c);
class C {
    constructor() {
        this["property2"] = 2;
        this[_3] = null;
        this["property4"] = 2;
        this[_d] = null;
        this[_5] = null;
        this[_7] = null;
    }
    [(_2 = Symbol.toStringTag, _3 = Symbol.iterator, Symbol.isConcatSpreadable, _d = Symbol.match, foo(), _4 = foo(), _5 = foo(), _6 = fieldNameB, _7 = fieldNameC, "some" + "method")]() { }
}
__decorate([
    x
], C.prototype, "property", void 0);
__decorate([
    x
], C.prototype, _2, void 0);
__decorate([
    x
], C.prototype, "property2", void 0);
__decorate([
    x
], C.prototype, _3, void 0);
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
void class D {
    constructor() {
        this["property2"] = 2;
        this[_9] = null;
        this["property4"] = 2;
        this[_e] = null;
        this[_11] = null;
        this[_13] = null;
    }
    [(_8 = Symbol.toStringTag, _9 = Symbol.iterator, Symbol.isConcatSpreadable, _e = Symbol.match, foo(), _10 = foo(), _11 = foo(), _12 = fieldNameB, _13 = fieldNameC, "some" + "method")]() { }
};
class E {
    constructor() {
        this["property2"] = 2;
        this[_15] = null;
        this["property4"] = 2;
        this[_f] = null;
        this[_17] = null;
        this[_19] = null;
    }
    [(_14 = Symbol.toStringTag, _15 = Symbol.iterator, Symbol.isConcatSpreadable, _f = Symbol.match, foo(), _16 = foo(), _17 = foo(), "some" + "method")]() { }
}
_18 = fieldNameB, _19 = fieldNameC;
__decorate([
    x
], E.prototype, "property", void 0);
__decorate([
    x
], E.prototype, _14, void 0);
__decorate([
    x
], E.prototype, "property2", void 0);
__decorate([
    x
], E.prototype, _15, void 0);
__decorate([
    x
], E.prototype, _16, void 0);
__decorate([
    x
], E.prototype, _17, void 0);
__decorate([
    x
], E.prototype, _18, void 0);
__decorate([
    x
], E.prototype, _19, void 0);
void (_h = class F {
        constructor() {
            this["property2"] = 2;
            this[_21] = null;
            this["property4"] = 2;
            this[_g] = null;
            this[_23] = null;
            this[_25] = null;
        }
        [(_20 = Symbol.toStringTag, _21 = Symbol.iterator, Symbol.isConcatSpreadable, _g = Symbol.match, foo(), _22 = foo(), _23 = foo(), "some" + "method")]() { }
    },
    _24 = fieldNameB,
    _25 = fieldNameC,
    _h);
class G {
    constructor() {
        this["property2"] = 2;
        this[_27] = null;
        this["property4"] = 2;
        this[_j] = null;
        this[_29] = null;
        this[_31] = null;
    }
    [(_26 = Symbol.toStringTag, _27 = Symbol.iterator, Symbol.isConcatSpreadable, _j = Symbol.match, foo(), _28 = foo(), _29 = foo(), "some" + "method")]() { }
    [(_30 = fieldNameB, "some" + "method2")]() { }
}
_31 = fieldNameC;
__decorate([
    x
], G.prototype, "property", void 0);
__decorate([
    x
], G.prototype, _26, void 0);
__decorate([
    x
], G.prototype, "property2", void 0);
__decorate([
    x
], G.prototype, _27, void 0);
__decorate([
    x
], G.prototype, _28, void 0);
__decorate([
    x
], G.prototype, _29, void 0);
__decorate([
    x
], G.prototype, _30, void 0);
__decorate([
    x
], G.prototype, _31, void 0);
void (_l = class H {
        constructor() {
            this["property2"] = 2;
            this[_33] = null;
            this["property4"] = 2;
            this[_k] = null;
            this[_35] = null;
            this[_37] = null;
        }
        [(_32 = Symbol.toStringTag, _33 = Symbol.iterator, Symbol.isConcatSpreadable, _k = Symbol.match, foo(), _34 = foo(), _35 = foo(), "some" + "method")]() { }
        [(_36 = fieldNameB, "some" + "method2")]() { }
    },
    _37 = fieldNameC,
    _l);
class I {
    constructor() {
        this["property2"] = 2;
        this[_39] = null;
        this["property4"] = 2;
        this[_m] = null;
        this[_41] = null;
        this[_44] = null;
    }
    [(_38 = Symbol.toStringTag, _39 = Symbol.iterator, Symbol.isConcatSpreadable, _m = Symbol.match, foo(), _40 = foo(), _41 = foo(), _42 = "some" + "method")]() { }
    [(_43 = fieldNameB, "some" + "method2")]() { }
}
_44 = fieldNameC;
__decorate([
    x
], I.prototype, "property", void 0);
__decorate([
    x
], I.prototype, _38, void 0);
__decorate([
    x
], I.prototype, "property2", void 0);
__decorate([
    x
], I.prototype, _39, void 0);
__decorate([
    x
], I.prototype, _40, void 0);
__decorate([
    x
], I.prototype, _41, void 0);
__decorate([
    x
], I.prototype, _42, null);
__decorate([
    x
], I.prototype, _43, void 0);
__decorate([
    x
], I.prototype, _44, void 0);
void (_p = class J {
        constructor() {
            this["property2"] = 2;
            this[_46] = null;
            this["property4"] = 2;
            this[_o] = null;
            this[_48] = null;
            this[_51] = null;
        }
        [(_45 = Symbol.toStringTag, _46 = Symbol.iterator, Symbol.isConcatSpreadable, _o = Symbol.match, foo(), _47 = foo(), _48 = foo(), _49 = "some" + "method")]() { }
        [(_50 = fieldNameB, "some" + "method2")]() { }
    },
    _51 = fieldNameC,
    _p);
