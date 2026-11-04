//// [tests/cases/compiler/legacyDecoratorAbstractPropertyDefine.ts] ////

//// [legacyDecoratorAbstractPropertyDefine.ts]
function dec(target: object, key: string) {
  Object.defineProperty(target, key, { get: () => 'from prototype', configurable: true });
}

abstract class Base {
  @dec abstract data: string;
}

class Sub extends Base {
  declare data: string;
}


//// [legacyDecoratorAbstractPropertyDefine.js]
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function dec(target, key) {
    Object.defineProperty(target, key, { get: () => 'from prototype', configurable: true });
}
class Base {
}
__decorate([
    dec
], Base.prototype, "data", void 0);
class Sub extends Base {
}
