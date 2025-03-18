//// [tests/cases/compiler/umdNamedAmdMode.ts] ////

//// [main.ts]
/// <amd-module name="a"/>
export const a = 1;

//// [main.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.a = void 0;
exports.a = 1;
