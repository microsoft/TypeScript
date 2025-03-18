//// [tests/cases/compiler/noCheckDoesNotReportError.ts] ////

//// [noCheckDoesNotReportError.ts]
export const a: number = "not ok";


//// [noCheckDoesNotReportError.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.a = void 0;
exports.a = "not ok";
