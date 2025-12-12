//// [tests/cases/conformance/decorators/class/accessor/decoratorOnClassAccessor8.ts] ////

//// [decoratorOnClassAccessor8.ts]
declare function dec<T>(target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<T>): TypedPropertyDescriptor<T>;

class A {
    @dec get x() { return 0; }
    set x(value: number) { }
}

class B {
    get x() { return 0; }
    @dec set x(value: number) { }
}

class C {
    @dec set x(value: number) { }
    get x() { return 0; }
}

class D {
    set x(value: number) { }
    @dec get x() { return 0; }
}

class E {
    @dec get x() { return 0; }
}

class F {
    @dec set x(value: number) { }
}

//// [decoratorOnClassAccessor8.js]
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
    get x() { return 0; }
    set x(value) { }
}
__decorate([
    dec,
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Number])
], A.prototype, "x", null);
class B {
    get x() { return 0; }
    set x(value) { }
}
__decorate([
    dec,
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Number])
], B.prototype, "x", null);
class C {
    set x(value) { }
    get x() { return 0; }
}
__decorate([
    dec,
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Number])
], C.prototype, "x", null);
class D {
    set x(value) { }
    get x() { return 0; }
}
__decorate([
    dec,
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Number])
], D.prototype, "x", null);
class E {
    get x() { return 0; }
}
__decorate([
    dec,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], E.prototype, "x", null);
class F {
    set x(value) { }
}
__decorate([
    dec,
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Number])
], F.prototype, "x", null);
