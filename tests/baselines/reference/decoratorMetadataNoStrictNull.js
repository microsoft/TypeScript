//// [tests/cases/compiler/decoratorMetadataNoStrictNull.ts] ////

//// [decoratorMetadataNoStrictNull.ts]
const dec = (obj: {}, prop: string) => undefined

class Foo {
  @dec public foo: string | null;
  @dec public bar: string;
}

//// [decoratorMetadataNoStrictNull.js]
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var dec = function (obj, prop) { return undefined; };
var Foo = /** @class */ (function () {
    function Foo() {
    }
    __decorate([
        dec,
        __metadata("design:type", String)
    ], Foo.prototype, "foo", void 0);
    __decorate([
        dec,
        __metadata("design:type", String)
    ], Foo.prototype, "bar", void 0);
    return Foo;
}());
