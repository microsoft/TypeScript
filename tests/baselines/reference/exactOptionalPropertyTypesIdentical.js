//// [tests/cases/compiler/exactOptionalPropertyTypesIdentical.ts] ////

//// [exactOptionalPropertyTypesIdentical.ts]
export let a: <T>() => T extends {a?: string} ? 0 : 1 = null!;
export let b: <T>() => T extends {a?: string | undefined} ? 0 : 1 = a;


//// [exactOptionalPropertyTypesIdentical.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.b = exports.a = void 0;
exports.a = null;
exports.b = exports.a;
