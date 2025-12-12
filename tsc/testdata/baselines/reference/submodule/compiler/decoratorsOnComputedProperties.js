//// [tests/cases/compiler/decoratorsOnComputedProperties.ts] ////

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
    ["property"];
    [Symbol.toStringTag];
    ["property2"] = 2;
    [Symbol.iterator] = null;
    ["property3"];
    [Symbol.isConcatSpreadable];
    ["property4"] = 2;
    [Symbol.match] = null;
    [foo()];
    [foo()];
    [foo()] = null;
    [fieldNameA];
    [fieldNameB];
    [fieldNameC] = null;
}
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
], A.prototype, _c, void 0);
__decorate([
    x
], A.prototype, _d, void 0);
__decorate([
    x
], A.prototype, _e, void 0);
__decorate([
    x
], A.prototype, _f, void 0);
void class B {
    ["property"];
    [Symbol.toStringTag];
    ["property2"] = 2;
    [Symbol.iterator] = null;
    ["property3"];
    [Symbol.isConcatSpreadable];
    ["property4"] = 2;
    [Symbol.match] = null;
    [foo()];
    [foo()];
    [foo()] = null;
    [fieldNameA];
    [fieldNameB];
    [fieldNameC] = null;
};
class C {
    ["property"];
    [Symbol.toStringTag];
    ["property2"] = 2;
    [Symbol.iterator] = null;
    ["property3"];
    [Symbol.isConcatSpreadable];
    ["property4"] = 2;
    [Symbol.match] = null;
    [foo()];
    [foo()];
    [foo()] = null;
    [fieldNameA];
    [fieldNameB];
    [fieldNameC] = null;
    ["some" + "method"]() { }
}
__decorate([
    x
], C.prototype, "property", void 0);
__decorate([
    x
], C.prototype, _g, void 0);
__decorate([
    x
], C.prototype, "property2", void 0);
__decorate([
    x
], C.prototype, _h, void 0);
__decorate([
    x
], C.prototype, _j, void 0);
__decorate([
    x
], C.prototype, _k, void 0);
__decorate([
    x
], C.prototype, _l, void 0);
__decorate([
    x
], C.prototype, _m, void 0);
void class D {
    ["property"];
    [Symbol.toStringTag];
    ["property2"] = 2;
    [Symbol.iterator] = null;
    ["property3"];
    [Symbol.isConcatSpreadable];
    ["property4"] = 2;
    [Symbol.match] = null;
    [foo()];
    [foo()];
    [foo()] = null;
    [fieldNameA];
    [fieldNameB];
    [fieldNameC] = null;
    ["some" + "method"]() { }
};
class E {
    ["property"];
    [Symbol.toStringTag];
    ["property2"] = 2;
    [Symbol.iterator] = null;
    ["property3"];
    [Symbol.isConcatSpreadable];
    ["property4"] = 2;
    [Symbol.match] = null;
    [foo()];
    [foo()];
    [foo()] = null;
    ["some" + "method"]() { }
    [fieldNameA];
    [fieldNameB];
    [fieldNameC] = null;
}
__decorate([
    x
], E.prototype, "property", void 0);
__decorate([
    x
], E.prototype, _o, void 0);
__decorate([
    x
], E.prototype, "property2", void 0);
__decorate([
    x
], E.prototype, _p, void 0);
__decorate([
    x
], E.prototype, _q, void 0);
__decorate([
    x
], E.prototype, _r, void 0);
__decorate([
    x
], E.prototype, _s, void 0);
__decorate([
    x
], E.prototype, _t, void 0);
void class F {
    ["property"];
    [Symbol.toStringTag];
    ["property2"] = 2;
    [Symbol.iterator] = null;
    ["property3"];
    [Symbol.isConcatSpreadable];
    ["property4"] = 2;
    [Symbol.match] = null;
    [foo()];
    [foo()];
    [foo()] = null;
    ["some" + "method"]() { }
    [fieldNameA];
    [fieldNameB];
    [fieldNameC] = null;
};
class G {
    ["property"];
    [Symbol.toStringTag];
    ["property2"] = 2;
    [Symbol.iterator] = null;
    ["property3"];
    [Symbol.isConcatSpreadable];
    ["property4"] = 2;
    [Symbol.match] = null;
    [foo()];
    [foo()];
    [foo()] = null;
    ["some" + "method"]() { }
    [fieldNameA];
    [fieldNameB];
    ["some" + "method2"]() { }
    [fieldNameC] = null;
}
__decorate([
    x
], G.prototype, "property", void 0);
__decorate([
    x
], G.prototype, _u, void 0);
__decorate([
    x
], G.prototype, "property2", void 0);
__decorate([
    x
], G.prototype, _v, void 0);
__decorate([
    x
], G.prototype, _w, void 0);
__decorate([
    x
], G.prototype, _x, void 0);
__decorate([
    x
], G.prototype, _y, void 0);
__decorate([
    x
], G.prototype, _z, void 0);
void class H {
    ["property"];
    [Symbol.toStringTag];
    ["property2"] = 2;
    [Symbol.iterator] = null;
    ["property3"];
    [Symbol.isConcatSpreadable];
    ["property4"] = 2;
    [Symbol.match] = null;
    [foo()];
    [foo()];
    [foo()] = null;
    ["some" + "method"]() { }
    [fieldNameA];
    [fieldNameB];
    ["some" + "method2"]() { }
    [fieldNameC] = null;
};
class I {
    ["property"];
    [Symbol.toStringTag];
    ["property2"] = 2;
    [Symbol.iterator] = null;
    ["property3"];
    [Symbol.isConcatSpreadable];
    ["property4"] = 2;
    [Symbol.match] = null;
    [foo()];
    [foo()];
    [foo()] = null;
    ["some" + "method"]() { }
    [fieldNameA];
    [fieldNameB];
    ["some" + "method2"]() { }
    [fieldNameC] = null;
}
__decorate([
    x
], I.prototype, "property", void 0);
__decorate([
    x
], I.prototype, _0, void 0);
__decorate([
    x
], I.prototype, "property2", void 0);
__decorate([
    x
], I.prototype, _1, void 0);
__decorate([
    x
], I.prototype, _2, void 0);
__decorate([
    x
], I.prototype, _3, void 0);
__decorate([
    x
], I.prototype, _4, null);
__decorate([
    x
], I.prototype, _5, void 0);
__decorate([
    x
], I.prototype, _6, void 0);
void class J {
    ["property"];
    [Symbol.toStringTag];
    ["property2"] = 2;
    [Symbol.iterator] = null;
    ["property3"];
    [Symbol.isConcatSpreadable];
    ["property4"] = 2;
    [Symbol.match] = null;
    [foo()];
    [foo()];
    [foo()] = null;
    ["some" + "method"]() { }
    [fieldNameA];
    [fieldNameB];
    ["some" + "method2"]() { }
    [fieldNameC] = null;
};
