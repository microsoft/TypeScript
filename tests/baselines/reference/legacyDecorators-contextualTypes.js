//// [tests/cases/conformance/decorators/legacyDecorators-contextualTypes.ts] ////

//// [legacyDecorators-contextualTypes.ts]
@((t) => { })
class C {
    constructor(@((t, k, i) => {}) p: any) {}

    @((t, k, d) => { })
    static f() {}

    @((t, k, d) => { })
    static get x() { return 1; }
    static set x(value) { }

    @((t, k, d) => { })
    static accessor y = 1;

    @((t, k) => { })
    static z = 1;

    @((t, k, d) => { })
    g() {}

    @((t, k, d) => { })
    get a() { return 1; }
    set a(value) { }

    @((t, k, d) => { })
    accessor b = 1;

    @((t, k) => { })
    c = 1;

    static h(@((t, k, i) => {}) p: any) {}
    h(@((t, k, i) => {}) p: any) {}
}

//// [legacyDecorators-contextualTypes.js]
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
let C = class C {
    constructor(p) { }
    static f() { }
    static get x() { return 1; }
    static set x(value) { }
    static accessor y = 1;
    static z = 1;
    g() { }
    get a() { return 1; }
    set a(value) { }
    accessor b = 1;
    c = 1;
    static h(p) { }
    h(p) { }
};
__decorate([
    ((t, k, d) => { })
], C.prototype, "g", null);
__decorate([
    ((t, k, d) => { })
], C.prototype, "a", null);
__decorate([
    ((t, k, d) => { })
], C.prototype, "b", null);
__decorate([
    ((t, k) => { })
], C.prototype, "c", void 0);
__decorate([
    __param(0, ((t, k, i) => { }))
], C.prototype, "h", null);
__decorate([
    ((t, k, d) => { })
], C, "f", null);
__decorate([
    ((t, k, d) => { })
], C, "x", null);
__decorate([
    ((t, k, d) => { })
], C, "y", null);
__decorate([
    ((t, k) => { })
], C, "z", void 0);
__decorate([
    __param(0, ((t, k, i) => { }))
], C, "h", null);
C = __decorate([
    ((t) => { }),
    __param(0, ((t, k, i) => { }))
], C);
