//// [tests/cases/compiler/metadataOfUnionWithNull.ts] ////

//// [metadataOfUnionWithNull.ts]
function PropDeco(target: Object, propKey: string | symbol) { }

class A {
}

class B {
    @PropDeco
    x: "foo" | null;

    @PropDeco
    y: true | never;

    @PropDeco
    z: "foo" | undefined;

    @PropDeco
    a: null;

    @PropDeco
    b: never;

    @PropDeco
    c: undefined;

    @PropDeco
    d: undefined | null;

    @PropDeco
    e: symbol | null;

    @PropDeco
    f: symbol | A;

    @PropDeco
    g: A | null;

    @PropDeco
    h: null | B;

    @PropDeco
    j: null | symbol;
}

//// [metadataOfUnionWithNull.js]
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
function PropDeco(target, propKey) { }
var A = /** @class */ (function () {
    function A() {
    }
    return A;
}());
var B = /** @class */ (function () {
    function B() {
    }
    __decorate([
        PropDeco,
        __metadata("design:type", String)
    ], B.prototype, "x", void 0);
    __decorate([
        PropDeco,
        __metadata("design:type", Boolean)
    ], B.prototype, "y", void 0);
    __decorate([
        PropDeco,
        __metadata("design:type", String)
    ], B.prototype, "z", void 0);
    __decorate([
        PropDeco,
        __metadata("design:type", void 0)
    ], B.prototype, "a", void 0);
    __decorate([
        PropDeco,
        __metadata("design:type", void 0)
    ], B.prototype, "b", void 0);
    __decorate([
        PropDeco,
        __metadata("design:type", void 0)
    ], B.prototype, "c", void 0);
    __decorate([
        PropDeco,
        __metadata("design:type", void 0)
    ], B.prototype, "d", void 0);
    __decorate([
        PropDeco,
        __metadata("design:type", typeof Symbol === "function" ? Symbol : Object)
    ], B.prototype, "e", void 0);
    __decorate([
        PropDeco,
        __metadata("design:type", Object)
    ], B.prototype, "f", void 0);
    __decorate([
        PropDeco,
        __metadata("design:type", A)
    ], B.prototype, "g", void 0);
    __decorate([
        PropDeco,
        __metadata("design:type", B)
    ], B.prototype, "h", void 0);
    __decorate([
        PropDeco,
        __metadata("design:type", typeof Symbol === "function" ? Symbol : Object)
    ], B.prototype, "j", void 0);
    return B;
}());
