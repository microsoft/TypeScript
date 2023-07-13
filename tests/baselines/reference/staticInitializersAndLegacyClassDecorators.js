//// [tests/cases/compiler/staticInitializersAndLegacyClassDecorators.ts] ////

//// [staticInitializersAndLegacyClassDecorators.ts]
// https://github.com/microsoft/TypeScript/issues/52004
declare var dec: any;

@dec
class C1
{
    static instance = new C1();
}

@dec
class C2
{
    static {
        new C2();
    }
}


//// [staticInitializersAndLegacyClassDecorators.js]
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var C1_1, C2_1;
let C1 = class C1 {
    static { C1_1 = this; }
    static instance = new C1_1();
};
C1 = C1_1 = __decorate([
    dec
], C1);
let C2 = class C2 {
    static { C2_1 = this; }
    static {
        new C2_1();
    }
};
C2 = C2_1 = __decorate([
    dec
], C2);
