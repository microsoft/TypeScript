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
function x(o, k) { }
let i = 0;
function foo() { return ++i + ""; }
const fieldNameA = "fieldName1";
const fieldNameB = "fieldName2";
const fieldNameC = "fieldName3";
class A {
    constructor() {
        this["property2"] = 2;
        this[Symbol.iterator] = null;
        this["property4"] = 2;
        this[Symbol.match] = null;
        this[_a] = null;
        this[_b] = null;
    }
}
_c = foo(), _d = foo(), _a = foo(), _e = fieldNameA, _f = fieldNameB, _b = fieldNameC;
__decorate([
    x
], A.prototype, "property", void 0);
__decorate([
    x
], A.prototype, Symbol.toStringTag, void 0);
__decorate([
    x
], A.prototype, "property2", void 0);
__decorate([
    x
], A.prototype, Symbol.iterator, void 0);
__decorate([
    x
], A.prototype, _d, void 0);
__decorate([
    x
], A.prototype, _a, void 0);
__decorate([
    x
], A.prototype, _f, void 0);
__decorate([
    x
], A.prototype, _b, void 0);
void (_g = class B {
        constructor() {
            this["property2"] = 2;
            this[Symbol.iterator] = null;
            this["property4"] = 2;
            this[Symbol.match] = null;
            this[_h] = null;
            this[_j] = null;
        }
    }, _k = foo(), _l = foo(), _h = foo(), _m = fieldNameA, _o = fieldNameB, _j = fieldNameC,
    _g);
class C {
    constructor() {
        this["property2"] = 2;
        this[Symbol.iterator] = null;
        this["property4"] = 2;
        this[Symbol.match] = null;
        this[_p] = null;
        this[_q] = null;
    }
    [_r = foo(), _s = foo(), _p = foo(), _t = fieldNameA, _u = fieldNameB, _q = fieldNameC, "some" + "method"]() { }
}
__decorate([
    x
], C.prototype, "property", void 0);
__decorate([
    x
], C.prototype, Symbol.toStringTag, void 0);
__decorate([
    x
], C.prototype, "property2", void 0);
__decorate([
    x
], C.prototype, Symbol.iterator, void 0);
__decorate([
    x
], C.prototype, _s, void 0);
__decorate([
    x
], C.prototype, _p, void 0);
__decorate([
    x
], C.prototype, _u, void 0);
__decorate([
    x
], C.prototype, _q, void 0);
void class D {
    constructor() {
        this["property2"] = 2;
        this[Symbol.iterator] = null;
        this["property4"] = 2;
        this[Symbol.match] = null;
        this[_v] = null;
        this[_w] = null;
    }
    [_x = foo(), _y = foo(), _v = foo(), _z = fieldNameA, _0 = fieldNameB, _w = fieldNameC, "some" + "method"]() { }
};
class E {
    constructor() {
        this["property2"] = 2;
        this[Symbol.iterator] = null;
        this["property4"] = 2;
        this[Symbol.match] = null;
        this[_1] = null;
        this[_2] = null;
    }
    [_3 = foo(), _4 = foo(), _1 = foo(), "some" + "method"]() { }
}
_5 = fieldNameA, _6 = fieldNameB, _2 = fieldNameC;
__decorate([
    x
], E.prototype, "property", void 0);
__decorate([
    x
], E.prototype, Symbol.toStringTag, void 0);
__decorate([
    x
], E.prototype, "property2", void 0);
__decorate([
    x
], E.prototype, Symbol.iterator, void 0);
__decorate([
    x
], E.prototype, _4, void 0);
__decorate([
    x
], E.prototype, _1, void 0);
__decorate([
    x
], E.prototype, _6, void 0);
__decorate([
    x
], E.prototype, _2, void 0);
void (_7 = class F {
        constructor() {
            this["property2"] = 2;
            this[Symbol.iterator] = null;
            this["property4"] = 2;
            this[Symbol.match] = null;
            this[_8] = null;
            this[_9] = null;
        }
        [_10 = foo(), _11 = foo(), _8 = foo(), "some" + "method"]() { }
    }, _12 = fieldNameA, _13 = fieldNameB, _9 = fieldNameC,
    _7);
class G {
    constructor() {
        this["property2"] = 2;
        this[Symbol.iterator] = null;
        this["property4"] = 2;
        this[Symbol.match] = null;
        this[_14] = null;
        this[_15] = null;
    }
    [_16 = foo(), _17 = foo(), _14 = foo(), "some" + "method"]() { }
    [_18 = fieldNameA, _19 = fieldNameB, "some" + "method2"]() { }
}
_15 = fieldNameC;
__decorate([
    x
], G.prototype, "property", void 0);
__decorate([
    x
], G.prototype, Symbol.toStringTag, void 0);
__decorate([
    x
], G.prototype, "property2", void 0);
__decorate([
    x
], G.prototype, Symbol.iterator, void 0);
__decorate([
    x
], G.prototype, _17, void 0);
__decorate([
    x
], G.prototype, _14, void 0);
__decorate([
    x
], G.prototype, _19, void 0);
__decorate([
    x
], G.prototype, _15, void 0);
void (_20 = class H {
        constructor() {
            this["property2"] = 2;
            this[Symbol.iterator] = null;
            this["property4"] = 2;
            this[Symbol.match] = null;
            this[_21] = null;
            this[_22] = null;
        }
        [_23 = foo(), _24 = foo(), _21 = foo(), "some" + "method"]() { }
        [_25 = fieldNameA, _26 = fieldNameB, "some" + "method2"]() { }
    }, _22 = fieldNameC,
    _20);
class I {
    constructor() {
        this["property2"] = 2;
        this[Symbol.iterator] = null;
        this["property4"] = 2;
        this[Symbol.match] = null;
        this[_27] = null;
        this[_28] = null;
    }
    [_29 = foo(), _30 = foo(), _27 = foo(), _31 = "some" + "method"]() { }
    [_32 = fieldNameA, _33 = fieldNameB, "some" + "method2"]() { }
}
_28 = fieldNameC;
__decorate([
    x
], I.prototype, "property", void 0);
__decorate([
    x
], I.prototype, Symbol.toStringTag, void 0);
__decorate([
    x
], I.prototype, "property2", void 0);
__decorate([
    x
], I.prototype, Symbol.iterator, void 0);
__decorate([
    x
], I.prototype, _30, void 0);
__decorate([
    x
], I.prototype, _27, void 0);
__decorate([
    x
], I.prototype, _31, null);
__decorate([
    x
], I.prototype, _33, void 0);
__decorate([
    x
], I.prototype, _28, void 0);
void (_34 = class J {
        constructor() {
            this["property2"] = 2;
            this[Symbol.iterator] = null;
            this["property4"] = 2;
            this[Symbol.match] = null;
            this[_35] = null;
            this[_36] = null;
        }
        [_37 = foo(), _38 = foo(), _35 = foo(), _39 = "some" + "method"]() { }
        [_40 = fieldNameA, _41 = fieldNameB, "some" + "method2"]() { }
    }, _36 = fieldNameC,
    _34);
var _c, _d, _a, _e, _f, _b, _k, _l, _h, _m, _o, _j, _g, _r, _s, _p, _t, _u, _q, _x, _y, _v, _z, _0, _w, _3, _4, _1, _5, _6, _2, _10, _11, _8, _12, _13, _9, _7, _16, _17, _14, _18, _19, _15, _23, _24, _21, _25, _26, _22, _20, _29, _30, _27, _31, _32, _33, _28, _37, _38, _35, _39, _40, _41, _36, _34;
