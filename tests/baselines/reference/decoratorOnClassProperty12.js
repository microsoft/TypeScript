//// [tests/cases/conformance/decorators/class/property/decoratorOnClassProperty12.ts] ////

//// [decoratorOnClassProperty12.ts]
declare function dec(): <T>(target: any, propertyKey: string) => void;

class A {
    @dec()
    foo: `${string}`
}


//// [decoratorOnClassProperty12.js]
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var A = /** @class */ (function () {
    function A() {
    }
    __decorate([
        dec(),
        __metadata("design:type", String)
    ], A.prototype, "foo", void 0);
    return A;
}());
