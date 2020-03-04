//// [tests/cases/compiler/decoratorReferenceOnOtherProperty.ts] ////

//// [yoha.ts]
// https://github.com/Microsoft/TypeScript/issues/19799
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
"use strict";
exports.__esModule = true;
exports.Yoha = void 0;
// https://github.com/Microsoft/TypeScript/issues/19799
var Yoha = /** @class */ (function () {
    function Yoha() {
    }
    return Yoha;
}());
exports.Yoha = Yoha;
//// [index.js]
"use strict";
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
exports.__esModule = true;
var yoha_1 = require("./yoha");
function foo() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
}
var Bar = /** @class */ (function () {
    function Bar() {
    }
    Bar.prototype.yoha = function (yoha, bar) { };
    __decorate([
        __param(0, foo),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, yoha_1.Yoha]),
        __metadata("design:returntype", void 0)
    ], Bar.prototype, "yoha");
    return Bar;
}());
//// [index2.js]
"use strict";
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
exports.__esModule = true;
var yoha_1 = require("./yoha");
function foo() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
}
var Bar = /** @class */ (function () {
    function Bar() {
    }
    Bar.prototype.yoha = function (yoha) {
        var bar = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            bar[_i - 1] = arguments[_i];
        }
    };
    __decorate([
        __param(0, foo),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, yoha_1.Yoha]),
        __metadata("design:returntype", void 0)
    ], Bar.prototype, "yoha");
    return Bar;
}());
