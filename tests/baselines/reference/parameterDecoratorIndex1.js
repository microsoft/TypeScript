//// [parameterDecoratorIndex1.ts]
const decorator = (target: any, key: string, index: 0) => {};

class A {
	method(
		@decorator param1: string,
		@decorator param2: string
	) {}
}


//// [parameterDecoratorIndex1.js]
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
    function A() {
    }
    A.prototype.method = function (param1, param2) { };
    __decorate([
        __param(0, decorator),
        __param(1, decorator)
    ], A.prototype, "method");
    return A;
}());
