//// [decoratorOnClass7.es6.ts]
declare function dec<T>(target: T): T;

@dec
export default class C {
    static x() { return C.y; }
    static y = 1;
}

let c = new C();

//// [decoratorOnClass7.es6.js]
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
let C = C_1 = class C {
    static x() { return C_1.y; }
};
C.y = 1;
C = C_1 = __decorate([
    dec
], C);
export default C;
let c = new C();
var C_1;
