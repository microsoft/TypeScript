//// [tests/cases/compiler/decoratorReferenceOnOtherProperty.ts] ////

//// [yoha.ts]
export class Yoha {}

//// [index.ts]
import {Yoha} from './yoha';

function foo(...args: any[]) {}

class Bar {
  yoha(@foo yoha, bar: Yoha) {}
  //                   ^^^^
}

//// [index2.ts]
import {Yoha} from './yoha';

function foo(...args: any[]) {}

class Bar {
  yoha(@foo yoha, ...bar: Yoha[]) {}
  //                      ^^^^
}

//// [yoha.js]
export class Yoha {
}
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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Yoha } from './yoha';
function foo(...args) { }
class Bar {
    yoha(yoha, bar) { }
}
__decorate([
    __param(0, foo),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Yoha]),
    __metadata("design:returntype", void 0)
], Bar.prototype, "yoha", null);
//// [index2.js]
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Yoha } from './yoha';
function foo(...args) { }
class Bar {
    yoha(yoha, ...bar) { }
}
__decorate([
    __param(0, foo),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Yoha]),
    __metadata("design:returntype", void 0)
], Bar.prototype, "yoha", null);
