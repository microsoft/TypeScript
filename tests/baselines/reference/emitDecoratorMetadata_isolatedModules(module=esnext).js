//// [tests/cases/compiler/emitDecoratorMetadata_isolatedModules.ts] ////

//// [type1.ts]
interface T1 {}
export type { T1 }

//// [type2.ts]
export interface T2 {}

//// [class3.ts]
export class C3 {}

//// [index.ts]
import { T1 } from "./type1";
import * as t1 from "./type1";
import type { T2 } from "./type2";
import { C3 } from "./class3";
declare var EventListener: any;

class HelloWorld {
  @EventListener('1')
  handleEvent1(event: T1) {} // Error
  
  @EventListener('2')
  handleEvent2(event: T2) {} // Ok

  @EventListener('1')
  p1!: T1; // Error

  @EventListener('1')
  p1_ns!: t1.T1; // Ok

  @EventListener('2')
  p2!: T2; // Ok

  @EventListener('3')
  handleEvent3(event: C3): T1 { return undefined! } // Ok, Error
}


//// [type1.js]
export {};
//// [type2.js]
export {};
//// [class3.js]
var C3 = /** @class */ (function () {
    function C3() {
    }
    return C3;
}());
export { C3 };
//// [index.js]
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import * as t1 from "./type1";
import { C3 } from "./class3";
var HelloWorld = /** @class */ (function () {
    function HelloWorld() {
    }
    HelloWorld.prototype.handleEvent1 = function (event) { }; // Error
    HelloWorld.prototype.handleEvent2 = function (event) { }; // Ok
    HelloWorld.prototype.handleEvent3 = function (event) { return undefined; }; // Ok, Error
    __decorate([
        EventListener('1'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], HelloWorld.prototype, "handleEvent1", null);
    __decorate([
        EventListener('2'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], HelloWorld.prototype, "handleEvent2", null);
    __decorate([
        EventListener('1'),
        __metadata("design:type", Object)
    ], HelloWorld.prototype, "p1", void 0);
    __decorate([
        EventListener('1'),
        __metadata("design:type", Object)
    ], HelloWorld.prototype, "p1_ns", void 0);
    __decorate([
        EventListener('2'),
        __metadata("design:type", Object)
    ], HelloWorld.prototype, "p2", void 0);
    __decorate([
        EventListener('3'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [C3]),
        __metadata("design:returntype", Object)
    ], HelloWorld.prototype, "handleEvent3", null);
    return HelloWorld;
}());
