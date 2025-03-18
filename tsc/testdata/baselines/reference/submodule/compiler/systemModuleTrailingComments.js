//// [tests/cases/compiler/systemModuleTrailingComments.ts] ////

//// [systemModuleTrailingComments.ts]
export const test = "TEST";

//some comment

//// [systemModuleTrailingComments.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.test = void 0;
exports.test = "TEST";
