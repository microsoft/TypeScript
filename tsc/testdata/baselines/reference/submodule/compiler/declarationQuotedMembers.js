//// [tests/cases/compiler/declarationQuotedMembers.ts] ////

//// [declarationQuotedMembers.ts]
export declare const mapped: { [K in 'a-b-c']: number }
export const example = mapped;

//// [declarationQuotedMembers.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.example = void 0;
exports.example = exports.mapped;
