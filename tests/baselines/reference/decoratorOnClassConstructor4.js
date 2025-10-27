//// [tests/cases/conformance/decorators/class/constructor/decoratorOnClassConstructor4.ts] ////

//// [decoratorOnClassConstructor4.ts]
declare var dec: any;

@dec
class A {
}

@dec
class B {
    constructor(x: number) {}
}

@dec
class C extends A {
}

//// [decoratorOnClassConstructor4.js]
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
};
A = __decorate([
    dec
], A);
let B = class B {
    constructor(x) { }
};
B = __decorate([
    dec,
    __metadata("design:paramtypes", [Number])
], B);
let C = class C extends A {
};
C = __decorate([
    dec
], C);
