//// [tests/cases/compiler/expandoFunctionExpressionsWithDynamicNames.ts] ////

//// [expandoFunctionExpressionsWithDynamicNames.ts]
// https://github.com/microsoft/TypeScript/issues/54809

const s = "X";

export const expr = () => {}
expr[s] = 0

export const expr2 = function () {}
expr2[s] = 0


//// [expandoFunctionExpressionsWithDynamicNames.js]
"use strict";
// https://github.com/microsoft/TypeScript/issues/54809
Object.defineProperty(exports, "__esModule", { value: true });
exports.expr2 = exports.expr = void 0;
var s = "X";
var expr = function () { };
exports.expr = expr;
exports.expr[s] = 0;
var expr2 = function () { };
exports.expr2 = expr2;
exports.expr2[s] = 0;


//// [expandoFunctionExpressionsWithDynamicNames.d.ts]
export declare const expr: {
    (): void;
    X: number;
};
export declare const expr2: {
    (): void;
    X: number;
};
