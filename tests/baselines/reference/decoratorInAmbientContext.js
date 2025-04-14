//// [tests/cases/conformance/decorators/decoratorInAmbientContext.ts] ////

//// [decoratorInAmbientContext.ts]
declare function decorator(target: any, key: any): any;

const b = Symbol('b');
class Foo {
    @decorator declare a: number;
    @decorator declare [b]: number;
}


//// [decoratorInAmbientContext.js]
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const b = Symbol('b');
class Foo {
}
__decorate([
    decorator
], Foo.prototype, "a", void 0);
__decorate([
    decorator
], Foo.prototype, b, void 0);
