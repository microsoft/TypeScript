//// [decoratorOnClassComputedMethodParameter1.ts]
// https://github.com/microsoft/TypeScript/issues/50305

declare function dec(target: Object, propertyKey: PropertyKey, parameterIndex: number): void;

const s = Symbol();
function f() { return s };
function add(a: number, b: number) { return a + b }
function concat(a: string, b: string) { return a + b }

class C {
    [s](@dec a: any) {}
    [f()](@dec a: any) {}
    ['method'](@dec a: any) {}
    ['some' + 'method'](@dec a: any) {}
    [concat('hello', 'world')](@dec a: any) {}
    [1](@dec a: any) {}
    [Math.PI](@dec a: any) {}
    [1 + 1](@dec a: any) {}
    [add(1, 2)](@dec a: any) {}
}


//// [decoratorOnClassComputedMethodParameter1.js]
// https://github.com/microsoft/TypeScript/issues/50305
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e, _f, _g;
const s = Symbol();
function f() { return s; }
;
function add(a, b) { return a + b; }
function concat(a, b) { return a + b; }
class C {
    [_a = s](a) { }
    [_b = f()](a) { }
    ['method'](a) { }
    [_c = 'some' + 'method'](a) { }
    [_d = concat('hello', 'world')](a) { }
    [1](a) { }
    [_e = Math.PI](a) { }
    [_f = 1 + 1](a) { }
    [_g = add(1, 2)](a) { }
}
__decorate([
    __param(0, dec)
], C.prototype, _a, null);
__decorate([
    __param(0, dec)
], C.prototype, _b, null);
__decorate([
    __param(0, dec)
], C.prototype, 'method', null);
__decorate([
    __param(0, dec)
], C.prototype, _c, null);
__decorate([
    __param(0, dec)
], C.prototype, _d, null);
__decorate([
    __param(0, dec)
], C.prototype, 1, null);
__decorate([
    __param(0, dec)
], C.prototype, _e, null);
__decorate([
    __param(0, dec)
], C.prototype, _f, null);
__decorate([
    __param(0, dec)
], C.prototype, _g, null);
