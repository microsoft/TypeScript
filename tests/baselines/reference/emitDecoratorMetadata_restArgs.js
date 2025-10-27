//// [tests/cases/compiler/emitDecoratorMetadata_restArgs.ts] ////

//// [emitDecoratorMetadata_restArgs.ts]
declare const MyClassDecorator: ClassDecorator;
declare const MyMethodDecorator: MethodDecorator;

@MyClassDecorator
class A {
    constructor(...args) {}
    @MyMethodDecorator
    method(...args) {}
}

@MyClassDecorator
class B {
    constructor(...args: number[]) {}
    @MyMethodDecorator
    method(this: this, ...args: string[]) {}
}


//// [emitDecoratorMetadata_restArgs.js]
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
let A = class A {
    constructor(...args) { }
    method(...args) { }
};
__decorate([
    MyMethodDecorator,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], A.prototype, "method", null);
A = __decorate([
    MyClassDecorator,
    __metadata("design:paramtypes", [Object])
], A);
let B = class B {
    constructor(...args) { }
    method(...args) { }
};
__decorate([
    MyMethodDecorator,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], B.prototype, "method", null);
B = __decorate([
    MyClassDecorator,
    __metadata("design:paramtypes", [Number])
], B);
