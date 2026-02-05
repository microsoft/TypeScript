//// [tests/cases/compiler/decoratorMetadataPromise.ts] ////

//// [decoratorMetadataPromise.ts]
declare const decorator: MethodDecorator;

class A {
    @decorator
    async foo() {}
    @decorator
    async bar(): Promise<number> { return 0; }
    @decorator
    baz(n: Promise<number>): Promise<number> { return n; }
}


//// [decoratorMetadataPromise.js]
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
class A {
    async foo() { }
    async bar() { return 0; }
    baz(n) { return n; }
}
__decorate([
    decorator,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], A.prototype, "foo", null);
__decorate([
    decorator,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], A.prototype, "bar", null);
__decorate([
    decorator,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Promise]),
    __metadata("design:returntype", Promise)
], A.prototype, "baz", null);
