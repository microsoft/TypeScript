//// [tests/cases/compiler/emitHelpersWithLocalCollisions.ts] ////

//// [a.ts]
declare var dec: any, __decorate: any;
@dec export class A {
}

const o = { a: 1 };
const y = { ...o };


//// [a.js]
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.A = void 0;
let A = class A {
};
exports.A = A;
exports.A = A = __decorate([
    dec
], A);
const o = { a: 1 };
const y = Object.assign({}, o);
