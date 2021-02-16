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
var _a, _b, _c, _d;
var _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20, _21;
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
        this[_f] = null;
        this[_h] = null;
    }
}
foo(), _e = foo(), _f = foo(), _g = fieldNameB, _h = fieldNameC;
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
], A.prototype, _e, void 0);
__decorate([
    x
], A.prototype, _f, void 0);
__decorate([
    x
], A.prototype, _g, void 0);
__decorate([
    x
], A.prototype, _h, void 0);
void (_a = class B {
        constructor() {
            this["property2"] = 2;
            this[Symbol.iterator] = null;
            this["property4"] = 2;
            this[Symbol.match] = null;
            this[_k] = null;
            this[_m] = null;
        }
    },
    foo(),
    _j = foo(),
    _k = foo(),
    _l = fieldNameB,
    _m = fieldNameC,
    _a);
class C {
    constructor() {
        this["property2"] = 2;
        this[Symbol.iterator] = null;
        this["property4"] = 2;
        this[Symbol.match] = null;
        this[_p] = null;
        this[_r] = null;
    }
    [(foo(), _o = foo(), _p = foo(), _q = fieldNameB, _r = fieldNameC, "some" + "method")]() { }
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
], C.prototype, _o, void 0);
__decorate([
    x
], C.prototype, _p, void 0);
__decorate([
    x
], C.prototype, _q, void 0);
__decorate([
    x
], C.prototype, _r, void 0);
void class D {
    constructor() {
        this["property2"] = 2;
        this[Symbol.iterator] = null;
        this["property4"] = 2;
        this[Symbol.match] = null;
        this[_t] = null;
        this[_v] = null;
    }
    [(foo(), _s = foo(), _t = foo(), _u = fieldNameB, _v = fieldNameC, "some" + "method")]() { }
};
class E {
    constructor() {
        this["property2"] = 2;
        this[Symbol.iterator] = null;
        this["property4"] = 2;
        this[Symbol.match] = null;
        this[_x] = null;
        this[_z] = null;
    }
    [(foo(), _w = foo(), _x = foo(), "some" + "method")]() { }
}
_y = fieldNameB, _z = fieldNameC;
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
], E.prototype, _w, void 0);
__decorate([
    x
], E.prototype, _x, void 0);
__decorate([
    x
], E.prototype, _y, void 0);
__decorate([
    x
], E.prototype, _z, void 0);
void (_b = class F {
        constructor() {
            this["property2"] = 2;
            this[Symbol.iterator] = null;
            this["property4"] = 2;
            this[Symbol.match] = null;
            this[_1] = null;
            this[_3] = null;
        }
        [(foo(), _0 = foo(), _1 = foo(), "some" + "method")]() { }
    },
    _2 = fieldNameB,
    _3 = fieldNameC,
    _b);
class G {
    constructor() {
        this["property2"] = 2;
        this[Symbol.iterator] = null;
        this["property4"] = 2;
        this[Symbol.match] = null;
        this[_5] = null;
        this[_7] = null;
    }
    [(foo(), _4 = foo(), _5 = foo(), "some" + "method")]() { }
    [(_6 = fieldNameB, "some" + "method2")]() { }
}
_7 = fieldNameC;
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
], G.prototype, _4, void 0);
__decorate([
    x
], G.prototype, _5, void 0);
__decorate([
    x
], G.prototype, _6, void 0);
__decorate([
    x
], G.prototype, _7, void 0);
void (_c = class H {
        constructor() {
            this["property2"] = 2;
            this[Symbol.iterator] = null;
            this["property4"] = 2;
            this[Symbol.match] = null;
            this[_9] = null;
            this[_11] = null;
        }
        [(foo(), _8 = foo(), _9 = foo(), "some" + "method")]() { }
        [(_10 = fieldNameB, "some" + "method2")]() { }
    },
    _11 = fieldNameC,
    _c);
class I {
    constructor() {
        this["property2"] = 2;
        this[Symbol.iterator] = null;
        this["property4"] = 2;
        this[Symbol.match] = null;
        this[_13] = null;
        this[_16] = null;
    }
    [(foo(), _12 = foo(), _13 = foo(), _14 = "some" + "method")]() { }
    [(_15 = fieldNameB, "some" + "method2")]() { }
}
_16 = fieldNameC;
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
], I.prototype, _12, void 0);
__decorate([
    x
], I.prototype, _13, void 0);
__decorate([
    x
], I.prototype, _14, null);
__decorate([
    x
], I.prototype, _15, void 0);
__decorate([
    x
], I.prototype, _16, void 0);
void (_d = class J {
        constructor() {
            this["property2"] = 2;
            this[Symbol.iterator] = null;
            this["property4"] = 2;
            this[Symbol.match] = null;
            this[_18] = null;
            this[_21] = null;
        }
        [(foo(), _17 = foo(), _18 = foo(), _19 = "some" + "method")]() { }
        [(_20 = fieldNameB, "some" + "method2")]() { }
    },
    _21 = fieldNameC,
    _d);
