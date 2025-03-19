//// [tests/cases/compiler/declarationEmitMappedTypePropertyFromNumericStringKey.ts] ////

//// [declarationEmitMappedTypePropertyFromNumericStringKey.ts]
export const f = (<T>(arg: {[K in keyof T]: T[K] | string}) => arg)({'0': 0}); // Original prop uses string syntax

//// [declarationEmitMappedTypePropertyFromNumericStringKey.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.f = void 0;
exports.f = ((arg) => arg)({ '0': 0 }); // Original prop uses string syntax
