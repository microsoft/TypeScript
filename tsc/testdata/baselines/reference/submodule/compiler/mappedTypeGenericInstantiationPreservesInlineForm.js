//// [tests/cases/compiler/mappedTypeGenericInstantiationPreservesInlineForm.ts] ////

//// [mappedTypeGenericInstantiationPreservesInlineForm.ts]
// repro from #53109

export const test1 = <T = Record<string, never>>(schema: {
    [K in keyof Required<T>]: T[K];
}) => {}

export function test2<T = Record<string, never>>(schema: {
    [K in keyof Required<T>]: T[K];
}) {};


//// [mappedTypeGenericInstantiationPreservesInlineForm.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.test1 = void 0;
exports.test2 = test2;
// repro from #53109
const test1 = (schema) => { };
exports.test1 = test1;
function test2(schema) { }
;
