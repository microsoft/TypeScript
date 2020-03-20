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
var _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0;
function x(o, k) { }
let i = 0;
function foo() { return ++i + ""; }
const fieldNameA = "fieldName1";
const fieldNameB = "fieldName2";
const fieldNameC = "fieldName3";
let A = /** @class */ (() => {
    var _1, _2, _3, _4;
    class A {
        constructor() {
            this["property2"] = 2;
            this[Symbol.iterator] = null;
            this["property4"] = 2;
            this[Symbol.match] = null;
            this[_2] = null;
            this[_4] = null;
        }
    }
    foo(), _1 = foo(), _2 = foo(), _3 = fieldNameB, _4 = fieldNameC;
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
    ], A.prototype, _1, void 0);
    __decorate([
        x
    ], A.prototype, _2, void 0);
    __decorate([
        x
    ], A.prototype, _3, void 0);
    __decorate([
        x
    ], A.prototype, _4, void 0);
    return A;
})();
void (_a = class B {
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
    _a);
let C = /** @class */ (() => {
    var _1, _2, _3, _4;
    class C {
        constructor() {
            this["property2"] = 2;
            this[Symbol.iterator] = null;
            this["property4"] = 2;
            this[Symbol.match] = null;
            this[_2] = null;
            this[_4] = null;
        }
        [(foo(), _1 = foo(), _2 = foo(), _3 = fieldNameB, _4 = fieldNameC, "some" + "method")]() { }
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
    ], C.prototype, _1, void 0);
    __decorate([
        x
    ], C.prototype, _2, void 0);
    __decorate([
        x
    ], C.prototype, _3, void 0);
    __decorate([
        x
    ], C.prototype, _4, void 0);
    return C;
})();
void class D {
    constructor() {
        this["property2"] = 2;
        this[Symbol.iterator] = null;
        this["property4"] = 2;
        this[Symbol.match] = null;
        this[_k] = null;
        this[_m] = null;
    }
    [(foo(), _j = foo(), _k = foo(), _l = fieldNameB, _m = fieldNameC, "some" + "method")]() { }
};
let E = /** @class */ (() => {
    var _1, _2, _3, _4;
    class E {
        constructor() {
            this["property2"] = 2;
            this[Symbol.iterator] = null;
            this["property4"] = 2;
            this[Symbol.match] = null;
            this[_2] = null;
            this[_4] = null;
        }
        [(foo(), _1 = foo(), _2 = foo(), "some" + "method")]() { }
    }
    _3 = fieldNameB, _4 = fieldNameC;
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
    ], E.prototype, _1, void 0);
    __decorate([
        x
    ], E.prototype, _2, void 0);
    __decorate([
        x
    ], E.prototype, _3, void 0);
    __decorate([
        x
    ], E.prototype, _4, void 0);
    return E;
})();
void (_b = class F {
        constructor() {
            this["property2"] = 2;
            this[Symbol.iterator] = null;
            this["property4"] = 2;
            this[Symbol.match] = null;
            this[_p] = null;
            this[_r] = null;
        }
        [(foo(), _o = foo(), _p = foo(), "some" + "method")]() { }
    },
    _q = fieldNameB,
    _r = fieldNameC,
    _b);
let G = /** @class */ (() => {
    var _1, _2, _3, _4;
    class G {
        constructor() {
            this["property2"] = 2;
            this[Symbol.iterator] = null;
            this["property4"] = 2;
            this[Symbol.match] = null;
            this[_2] = null;
            this[_4] = null;
        }
        [(foo(), _1 = foo(), _2 = foo(), "some" + "method")]() { }
        [(_3 = fieldNameB, "some" + "method2")]() { }
    }
    _4 = fieldNameC;
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
    ], G.prototype, _1, void 0);
    __decorate([
        x
    ], G.prototype, _2, void 0);
    __decorate([
        x
    ], G.prototype, _3, void 0);
    __decorate([
        x
    ], G.prototype, _4, void 0);
    return G;
})();
void (_c = class H {
        constructor() {
            this["property2"] = 2;
            this[Symbol.iterator] = null;
            this["property4"] = 2;
            this[Symbol.match] = null;
            this[_t] = null;
            this[_v] = null;
        }
        [(foo(), _s = foo(), _t = foo(), "some" + "method")]() { }
        [(_u = fieldNameB, "some" + "method2")]() { }
    },
    _v = fieldNameC,
    _c);
let I = /** @class */ (() => {
    var _1, _2, _3, _4, _5;
    class I {
        constructor() {
            this["property2"] = 2;
            this[Symbol.iterator] = null;
            this["property4"] = 2;
            this[Symbol.match] = null;
            this[_2] = null;
            this[_5] = null;
        }
        [(foo(), _1 = foo(), _2 = foo(), _3 = "some" + "method")]() { }
        [(_4 = fieldNameB, "some" + "method2")]() { }
    }
    _5 = fieldNameC;
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
    ], I.prototype, _1, void 0);
    __decorate([
        x
    ], I.prototype, _2, void 0);
    __decorate([
        x
    ], I.prototype, _3, null);
    __decorate([
        x
    ], I.prototype, _4, void 0);
    __decorate([
        x
    ], I.prototype, _5, void 0);
    return I;
})();
void (_d = class J {
        constructor() {
            this["property2"] = 2;
            this[Symbol.iterator] = null;
            this["property4"] = 2;
            this[Symbol.match] = null;
            this[_x] = null;
            this[_0] = null;
        }
        [(foo(), _w = foo(), _x = foo(), _y = "some" + "method")]() { }
        [(_z = fieldNameB, "some" + "method2")]() { }
    },
    _0 = fieldNameC,
    _d);
