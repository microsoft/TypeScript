//// [declarationsSimple.ts] ////
export const c: number = 1;

export interface A {
    x: number;
}

let expr: { x: number; };

expr = {
    x: 12,
}

export default expr;
//// [declarationsSimple.js] ////
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.c = void 0;
exports.c = 1;
var expr;
expr = {
    x: 12,
};
exports.default = expr;
