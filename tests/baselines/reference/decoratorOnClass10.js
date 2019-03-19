//// [decoratorOnClass10.ts]
// https://github.com/Microsoft/TypeScript/issues/28603
type T = number;
type U = number;
declare function decorator(fn: (param: T) => T): any;

@decorator((param: T) => param)
class C<T> {
    @decorator((param: U) => param)
    method<U>() {}
}

//// [decoratorOnClass10.js]
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var C = /** @class */ (function () {
    function C() {
    }
    C.prototype.method = function () { };
    __decorate([
        decorator(function (param) { return param; })
    ], C.prototype, "method", null);
    C = __decorate([
        decorator(function (param) { return param; })
    ], C);
    return C;
}());
