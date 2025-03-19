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
Object.defineProperty(exports, "__esModule", { value: true });
exports.expr2 = exports.expr = void 0;
// https://github.com/microsoft/TypeScript/issues/54809
const s = "X";
const expr = () => { };
exports.expr = expr;
exports.expr[s] = 0;
const expr2 = function () { };
exports.expr2 = expr2;
exports.expr2[s] = 0;
