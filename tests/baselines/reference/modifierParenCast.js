//// [tests/cases/compiler/modifierParenCast.ts] ////

//// [modifierParenCast.ts]
let readonly: any = undefined;
let override: any = undefined;
let out: any = undefined;
let declare: any = undefined;

export const a = (readonly as number);
export const b = (override as number);
export const c = (out as number);
export const d = (declare as number);

//// [modifierParenCast.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.d = exports.c = exports.b = exports.a = void 0;
var readonly = undefined;
var override = undefined;
var out = undefined;
var declare = undefined;
exports.a = readonly;
exports.b = override;
exports.c = out;
exports.d = declare;
