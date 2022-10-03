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
        __metadata("design:type", Object)
    ], B.prototype, "x");
    __decorate([
        PropDeco,
        __metadata("design:type", Boolean)
    ], B.prototype, "y");
    __decorate([
        PropDeco,
        __metadata("design:type", Object)
    ], B.prototype, "z");
    return B;
}());
var E;
(function (E) {
    E[E["A"] = 0] = "A";
    E[E["B"] = 1] = "B";
    E[E["C"] = 2] = "C";
    E[E["D"] = 3] = "D";
})(E || (E = {}));
var D = /** @class */ (function () {
    function D() {
    }
    __decorate([
        PropDeco,
        __metadata("design:type", Number)
    ], D.prototype, "a");
    __decorate([
        PropDeco,
        __metadata("design:type", Number)
    ], D.prototype, "b");
    __decorate([
        PropDeco,
        __metadata("design:type", Number)
    ], D.prototype, "c");
    __decorate([
        PropDeco,
        __metadata("design:type", Number)
    ], D.prototype, "d");
    return D;
}());
