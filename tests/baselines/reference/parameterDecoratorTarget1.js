//// [parameterDecoratorTarget1.ts]
const decorator = (target: typeof A, key: string, index: number) => {};

class A {
	method(@decorator param1: string) {}
	static staticMethod(@decorator param1: string) {}
	constructor(@decorator param1: string) {}
}


//// [parameterDecoratorTarget1.js]
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var decorator = function (target, key, index) { };
var A = /** @class */ (function () {
    function A(param1) {
    }
    A.prototype.method = function (param1) { };
    A.staticMethod = function (param1) { };
    __decorate([
        __param(0, decorator)
    ], A.prototype, "method");
    __decorate([
        __param(0, decorator)
    ], A, "staticMethod");
    A = __decorate([
        __param(0, decorator)
    ], A);
    return A;
}());
