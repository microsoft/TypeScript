//// [tests/cases/compiler/emitHelpersWithLocalCollisions.ts] ////

//// [a.ts]
declare var dec: any, __decorate: any;
@dec export class A {
}

const o = { a: 1 };
const y = { ...o };


//// [a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.A = void 0;
@dec
class A {
}
exports.A = A;
const o = { a: 1 };
const y = { ...o };
