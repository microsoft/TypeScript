//// [tests/cases/conformance/decorators/class/property/decoratorOnClassProperty13.ts] ////

//// [decoratorOnClassProperty13.ts]
declare function dec(target: any, propertyKey: string, desc: PropertyDescriptor): void;

class C {
    @dec accessor prop;
}

//// [decoratorOnClassProperty13.js]
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
class C {
    accessor prop;
}
__decorate([
    dec
], C.prototype, "prop", null);
