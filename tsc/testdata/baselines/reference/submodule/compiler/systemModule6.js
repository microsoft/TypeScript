//// [tests/cases/compiler/systemModule6.ts] ////

//// [systemModule6.ts]
export class C {}
function foo() {
    new C();
}


//// [systemModule6.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.C = void 0;
class C {
}
exports.C = C;
function foo() {
    new C();
}
