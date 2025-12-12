//// [tests/cases/conformance/decorators/class/decoratorOnClass9.ts] ////

//// [decoratorOnClass9.ts]
declare var dec: any;

class A {}

// https://github.com/Microsoft/TypeScript/issues/16417
@dec
class B extends A {
    static x = 1;
    static y = B.x;
    m() {
        return B.x;
    }
}

//// [decoratorOnClass9.js]
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var B_1;
class A {
}
// https://github.com/Microsoft/TypeScript/issues/16417
let B = B_1 = class B extends A {
    static x = 1;
    static y = B_1.x;
    m() {
        return B_1.x;
    }
};
B = B_1 = __decorate([
    dec
], B);
