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
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20, _21;
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
        this[_b] = null;
        this[_d] = null;
    }
}
foo(), _a = foo(), _b = foo(), _c = fieldNameB, _d = fieldNameC;
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
], A.prototype, _a, void 0);
__decorate([
    x
], A.prototype, _b, void 0);
__decorate([
    x
], A.prototype, _c, void 0);
__decorate([
    x
], A.prototype, _d, void 0);
void (_j = class B {
        constructor() {
            this["property2"] = 2;
            this[Symbol.iterator] = null;
            this["property4"] = 2;
            this[Symbol.match] = null;
            this[_f] = null;
            this[_h] = null;
        }
    },
    foo(),
    _e = foo(),
    _f = foo(),
    _g = fieldNameB,
    _h = fieldNameC,
    _j);
class C {
    constructor() {
        this["property2"] = 2;
        this[Symbol.iterator] = null;
        this["property4"] = 2;
        this[Symbol.match] = null;
        this[_l] = null;
        this[_o] = null;
    }
    [(foo(), _k = foo(), _l = foo(), _m = fieldNameB, _o = fieldNameC, "some" + "method")]() { }
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
], C.prototype, _k, void 0);
__decorate([
    x
], C.prototype, _l, void 0);
__decorate([
    x
], C.prototype, _m, void 0);
__decorate([
    x
], C.prototype, _o, void 0);
void class D {
    constructor() {
        this["property2"] = 2;
        this[Symbol.iterator] = null;
        this["property4"] = 2;
        this[Symbol.match] = null;
        this[_q] = null;
        this[_s] = null;
    }
    [(foo(), _p = foo(), _q = foo(), _r = fieldNameB, _s = fieldNameC, "some" + "method")]() { }
};
class E {
    constructor() {
        this["property2"] = 2;
        this[Symbol.iterator] = null;
        this["property4"] = 2;
        this[Symbol.match] = null;
        this[_u] = null;
        this[_w] = null;
    }
    [(foo(), _t = foo(), _u = foo(), "some" + "method")]() { }
}
_v = fieldNameB, _w = fieldNameC;
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
], E.prototype, _t, void 0);
__decorate([
    x
], E.prototype, _u, void 0);
__decorate([
    x
], E.prototype, _v, void 0);
__decorate([
    x
], E.prototype, _w, void 0);
void (_1 = class F {
        constructor() {
            this["property2"] = 2;
            this[Symbol.iterator] = null;
            this["property4"] = 2;
            this[Symbol.match] = null;
            this[_y] = null;
            this[_0] = null;
        }
        [(foo(), _x = foo(), _y = foo(), "some" + "method")]() { }
    },
    _z = fieldNameB,
    _0 = fieldNameC,
    _1);
class G {
    constructor() {
        this["property2"] = 2;
        this[Symbol.iterator] = null;
        this["property4"] = 2;
        this[Symbol.match] = null;
        this[_3] = null;
        this[_5] = null;
    }
    [(foo(), _2 = foo(), _3 = foo(), "some" + "method")]() { }
    [(_4 = fieldNameB, "some" + "method2")]() { }
}
_5 = fieldNameC;
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
], G.prototype, _2, void 0);
__decorate([
    x
], G.prototype, _3, void 0);
__decorate([
    x
], G.prototype, _4, void 0);
__decorate([
    x
], G.prototype, _5, void 0);
void (_10 = class H {
        constructor() {
            this["property2"] = 2;
            this[Symbol.iterator] = null;
            this["property4"] = 2;
            this[Symbol.match] = null;
            this[_7] = null;
            this[_9] = null;
        }
        [(foo(), _6 = foo(), _7 = foo(), "some" + "method")]() { }
        [(_8 = fieldNameB, "some" + "method2")]() { }
    },
    _9 = fieldNameC,
    _10);
class I {
    constructor() {
        this["property2"] = 2;
        this[Symbol.iterator] = null;
        this["property4"] = 2;
        this[Symbol.match] = null;
        this[_12] = null;
        this[_15] = null;
    }
    [(foo(), _11 = foo(), _12 = foo(), _13 = "some" + "method")]() { }
    [(_14 = fieldNameB, "some" + "method2")]() { }
}
_15 = fieldNameC;
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
], I.prototype, _11, void 0);
__decorate([
    x
], I.prototype, _12, void 0);
__decorate([
    x
], I.prototype, _13, null);
__decorate([
    x
], I.prototype, _14, void 0);
__decorate([
    x
], I.prototype, _15, void 0);
void (_21 = class J {
        constructor() {
            this["property2"] = 2;
            this[Symbol.iterator] = null;
            this["property4"] = 2;
            this[Symbol.match] = null;
            this[_17] = null;
            this[_20] = null;
        }
        [(foo(), _16 = foo(), _17 = foo(), _18 = "some" + "method")]() { }
        [(_19 = fieldNameB, "some" + "method2")]() { }
    },
    _20 = fieldNameC,
    _21);
