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
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20, _21, _22, _23, _24, _25, _26, _27, _28, _29, _30, _31, _32, _33, _34, _35, _36, _37, _38, _39, _40, _41, _42, _43, _44, _45, _46, _47, _48, _49, _50, _51;
function x(o, k) { }
let i = 0;
function foo() { return ++i + ""; }
const fieldNameA = "fieldName1";
const fieldNameB = "fieldName2";
const fieldNameC = "fieldName3";
class A {
    constructor() {
        this["property2"] = 2;
        this[_b] = null;
        this["property4"] = 2;
        this[_c] = null;
        this[_e] = null;
        this[_g] = null;
    }
}
_a = Symbol.toStringTag, _b = Symbol.iterator, Symbol.isConcatSpreadable, _c = Symbol.match, foo(), _d = foo(), _e = foo(), _f = fieldNameB, _g = fieldNameC;
__decorate([
    x
], A.prototype, "property", void 0);
__decorate([
    x
], A.prototype, _a, void 0);
__decorate([
    x
], A.prototype, "property2", void 0);
__decorate([
    x
], A.prototype, _b, void 0);
__decorate([
    x
], A.prototype, _d, void 0);
__decorate([
    x
], A.prototype, _e, void 0);
__decorate([
    x
], A.prototype, _f, void 0);
__decorate([
    x
], A.prototype, _g, void 0);
void (_q = class B {
        constructor() {
            this["property2"] = 2;
            this[_j] = null;
            this["property4"] = 2;
            this[_k] = null;
            this[_m] = null;
            this[_p] = null;
        }
    },
    _h = Symbol.toStringTag,
    _j = Symbol.iterator,
    Symbol.isConcatSpreadable,
    _k = Symbol.match,
    foo(),
    _l = foo(),
    _m = foo(),
    _o = fieldNameB,
    _p = fieldNameC,
    _q);
class C {
    constructor() {
        this["property2"] = 2;
        this[_s] = null;
        this["property4"] = 2;
        this[_t] = null;
        this[_v] = null;
        this[_x] = null;
    }
    [(_r = Symbol.toStringTag, _s = Symbol.iterator, Symbol.isConcatSpreadable, _t = Symbol.match, foo(), _u = foo(), _v = foo(), _w = fieldNameB, _x = fieldNameC, "some" + "method")]() { }
}
__decorate([
    x
], C.prototype, "property", void 0);
__decorate([
    x
], C.prototype, _r, void 0);
__decorate([
    x
], C.prototype, "property2", void 0);
__decorate([
    x
], C.prototype, _s, void 0);
__decorate([
    x
], C.prototype, _u, void 0);
__decorate([
    x
], C.prototype, _v, void 0);
__decorate([
    x
], C.prototype, _w, void 0);
__decorate([
    x
], C.prototype, _x, void 0);
void class D {
    constructor() {
        this["property2"] = 2;
        this[_z] = null;
        this["property4"] = 2;
        this[_0] = null;
        this[_2] = null;
        this[_4] = null;
    }
    [(_y = Symbol.toStringTag, _z = Symbol.iterator, Symbol.isConcatSpreadable, _0 = Symbol.match, foo(), _1 = foo(), _2 = foo(), _3 = fieldNameB, _4 = fieldNameC, "some" + "method")]() { }
};
class E {
    constructor() {
        this["property2"] = 2;
        this[_6] = null;
        this["property4"] = 2;
        this[_7] = null;
        this[_9] = null;
        this[_11] = null;
    }
    [(_5 = Symbol.toStringTag, _6 = Symbol.iterator, Symbol.isConcatSpreadable, _7 = Symbol.match, foo(), _8 = foo(), _9 = foo(), "some" + "method")]() { }
}
_10 = fieldNameB, _11 = fieldNameC;
__decorate([
    x
], E.prototype, "property", void 0);
__decorate([
    x
], E.prototype, _5, void 0);
__decorate([
    x
], E.prototype, "property2", void 0);
__decorate([
    x
], E.prototype, _6, void 0);
__decorate([
    x
], E.prototype, _8, void 0);
__decorate([
    x
], E.prototype, _9, void 0);
__decorate([
    x
], E.prototype, _10, void 0);
__decorate([
    x
], E.prototype, _11, void 0);
void (_19 = class F {
        constructor() {
            this["property2"] = 2;
            this[_13] = null;
            this["property4"] = 2;
            this[_14] = null;
            this[_16] = null;
            this[_18] = null;
        }
        [(_12 = Symbol.toStringTag, _13 = Symbol.iterator, Symbol.isConcatSpreadable, _14 = Symbol.match, foo(), _15 = foo(), _16 = foo(), "some" + "method")]() { }
    },
    _17 = fieldNameB,
    _18 = fieldNameC,
    _19);
class G {
    constructor() {
        this["property2"] = 2;
        this[_21] = null;
        this["property4"] = 2;
        this[_22] = null;
        this[_24] = null;
        this[_26] = null;
    }
    [(_20 = Symbol.toStringTag, _21 = Symbol.iterator, Symbol.isConcatSpreadable, _22 = Symbol.match, foo(), _23 = foo(), _24 = foo(), "some" + "method")]() { }
    [(_25 = fieldNameB, "some" + "method2")]() { }
}
_26 = fieldNameC;
__decorate([
    x
], G.prototype, "property", void 0);
__decorate([
    x
], G.prototype, _20, void 0);
__decorate([
    x
], G.prototype, "property2", void 0);
__decorate([
    x
], G.prototype, _21, void 0);
__decorate([
    x
], G.prototype, _23, void 0);
__decorate([
    x
], G.prototype, _24, void 0);
__decorate([
    x
], G.prototype, _25, void 0);
__decorate([
    x
], G.prototype, _26, void 0);
void (_34 = class H {
        constructor() {
            this["property2"] = 2;
            this[_28] = null;
            this["property4"] = 2;
            this[_29] = null;
            this[_31] = null;
            this[_33] = null;
        }
        [(_27 = Symbol.toStringTag, _28 = Symbol.iterator, Symbol.isConcatSpreadable, _29 = Symbol.match, foo(), _30 = foo(), _31 = foo(), "some" + "method")]() { }
        [(_32 = fieldNameB, "some" + "method2")]() { }
    },
    _33 = fieldNameC,
    _34);
class I {
    constructor() {
        this["property2"] = 2;
        this[_36] = null;
        this["property4"] = 2;
        this[_37] = null;
        this[_39] = null;
        this[_42] = null;
    }
    [(_35 = Symbol.toStringTag, _36 = Symbol.iterator, Symbol.isConcatSpreadable, _37 = Symbol.match, foo(), _38 = foo(), _39 = foo(), _40 = "some" + "method")]() { }
    [(_41 = fieldNameB, "some" + "method2")]() { }
}
_42 = fieldNameC;
__decorate([
    x
], I.prototype, "property", void 0);
__decorate([
    x
], I.prototype, _35, void 0);
__decorate([
    x
], I.prototype, "property2", void 0);
__decorate([
    x
], I.prototype, _36, void 0);
__decorate([
    x
], I.prototype, _38, void 0);
__decorate([
    x
], I.prototype, _39, void 0);
__decorate([
    x
], I.prototype, _40, null);
__decorate([
    x
], I.prototype, _41, void 0);
__decorate([
    x
], I.prototype, _42, void 0);
void (_51 = class J {
        constructor() {
            this["property2"] = 2;
            this[_44] = null;
            this["property4"] = 2;
            this[_45] = null;
            this[_47] = null;
            this[_50] = null;
        }
        [(_43 = Symbol.toStringTag, _44 = Symbol.iterator, Symbol.isConcatSpreadable, _45 = Symbol.match, foo(), _46 = foo(), _47 = foo(), _48 = "some" + "method")]() { }
        [(_49 = fieldNameB, "some" + "method2")]() { }
    },
    _50 = fieldNameC,
    _51);
