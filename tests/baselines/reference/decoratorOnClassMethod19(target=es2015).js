//// [tests/cases/conformance/decorators/class/method/decoratorOnClassMethod19.ts] ////

//// [decoratorOnClassMethod19.ts]
// https://github.com/microsoft/TypeScript/issues/48515
declare var decorator: any;

class C1 {
    #x

    @decorator((x: C1) => x.#x)
    y() {}
}

class C2 {
    #x

    y(@decorator((x: C2) => x.#x) p) {}
}


//// [decoratorOnClassMethod19.js]
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _C1_x, _C2_x;
class C1 {
    constructor() {
        _C1_x.set(this, void 0);
    }
    y() { }
}
_C1_x = new WeakMap();
(() => {
    __decorate([
        decorator((x) => __classPrivateFieldGet(x, _C1_x, "f")),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], C1.prototype, "y", null);
})();
class C2 {
    constructor() {
        _C2_x.set(this, void 0);
    }
    y(p) { }
}
_C2_x = new WeakMap();
(() => {
    __decorate([
        __param(0, decorator((x) => __classPrivateFieldGet(x, _C2_x, "f"))),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], C2.prototype, "y", null);
})();
