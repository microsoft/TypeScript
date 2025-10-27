//// [tests/cases/compiler/metadataOfUnion.ts] ////

//// [metadataOfUnion.ts]
function PropDeco(target: Object, propKey: string | symbol) { }

class A {
}

class B {
    @PropDeco
    x: "foo" | A;

    @PropDeco
    y: true | boolean;

    @PropDeco
    z: "foo" | boolean;
}

enum E {
    A,
    B,
    C,
    D
}

class D {
    @PropDeco
    a: E.A;

    @PropDeco
    b: E.B | E.C;

    @PropDeco
    c: E;

    @PropDeco
    d: E | number;
}

//// [metadataOfUnion.js]
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
class A {
}
class B {
}
__decorate([
    PropDeco,
    __metadata("design:type", Object)
], B.prototype, "x", void 0);
__decorate([
    PropDeco,
    __metadata("design:type", Boolean)
], B.prototype, "y", void 0);
__decorate([
    PropDeco,
    __metadata("design:type", Object)
], B.prototype, "z", void 0);
var E;
(function (E) {
    E[E["A"] = 0] = "A";
    E[E["B"] = 1] = "B";
    E[E["C"] = 2] = "C";
    E[E["D"] = 3] = "D";
})(E || (E = {}));
class D {
}
__decorate([
    PropDeco,
    __metadata("design:type", Number)
], D.prototype, "a", void 0);
__decorate([
    PropDeco,
    __metadata("design:type", Number)
], D.prototype, "b", void 0);
__decorate([
    PropDeco,
    __metadata("design:type", Number)
], D.prototype, "c", void 0);
__decorate([
    PropDeco,
    __metadata("design:type", Number)
], D.prototype, "d", void 0);
