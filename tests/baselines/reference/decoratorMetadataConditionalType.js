//// [tests/cases/compiler/decoratorMetadataConditionalType.ts] ////

//// [decoratorMetadataConditionalType.ts]
declare function d(): PropertyDecorator;
abstract class BaseEntity<T> {
    @d()
    public attributes: T extends { attributes: infer A } ? A : undefined;
}
class C {
    @d()
    x: number extends string ? false : true;
}

//// [decoratorMetadataConditionalType.js]
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
class BaseEntity {
}
__decorate([
    d(),
    __metadata("design:type", Object)
], BaseEntity.prototype, "attributes", void 0);
class C {
}
__decorate([
    d(),
    __metadata("design:type", Boolean)
], C.prototype, "x", void 0);
