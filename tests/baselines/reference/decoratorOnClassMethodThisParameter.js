//// [decoratorOnClassMethodThisParameter.ts]
declare function dec(target: Object, propertyKey: string | symbol, parameterIndex: number): void;

class C {
    method(@dec this: C) {}
}

class C2 {
    method(@dec allowed: C2, @dec this: C2) {}
}

//// [decoratorOnClassMethodThisParameter.js]
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var C = /** @class */ (function () {
    function C() {
    }
    C.prototype.method = function () { };
    return C;
}());
var C2 = /** @class */ (function () {
    function C2() {
    }
    C2.prototype.method = function (allowed) { };
    __decorate([
        __param(0, dec),
        __param(1, dec)
    ], C2.prototype, "method", null);
    return C2;
}());
