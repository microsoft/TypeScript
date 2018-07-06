//// [tests/cases/compiler/experimentalDecoratorMetadataUnresolvedTypeObjectInEmit.ts] ////

//// [types.d.ts]
declare namespace A {
    export namespace B {
        export namespace C {
            export namespace D {
            }
        }
    }
}
//// [usage.ts]
class Foo {
    f(@decorate user: A.B.C.D.E): void {}
}


//// [usage.js]
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
var Foo = /** @class */ (function () {
    function Foo() {
    }
    Foo.prototype.f = function (user) { };
    var _a, _b, _c, _d;
    __decorate([
        __param(0, decorate),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [typeof (_d = typeof A !== "undefined" && (_a = A.B) !== void 0 && (_b = _a.C) !== void 0 && (_c = _b.D) !== void 0 && _c.E) === "function" ? _d : Object]),
        __metadata("design:returntype", void 0)
    ], Foo.prototype, "f");
    return Foo;
}());
