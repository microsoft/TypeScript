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
var _a = foo(), _b = foo(), _c = foo(), _d = fieldNameA, _e = fieldNameB, _f = fieldNameC;
class A {
    constructor() {
        this["property2"] = 2;
        this[Symbol.iterator] = null;
        this["property4"] = 2;
        this[Symbol.match] = null;
        this[_c] = null;
        this[_f] = null;
    }
}
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
], A.prototype, _b, void 0);
__decorate([
    x
], A.prototype, _c, void 0);
__decorate([
    x
], A.prototype, _e, void 0);
__decorate([
    x
], A.prototype, _f, void 0);
void (_g = foo(), _h = foo(), _j = foo(), _k = fieldNameA, _l = fieldNameB, _m = fieldNameC,
    _o = class B {
            constructor() {
                this["property2"] = 2;
                this[Symbol.iterator] = null;
                this["property4"] = 2;
                this[Symbol.match] = null;
                this[_j] = null;
                this[_m] = null;
            }
        },
    _o);
var _o;
