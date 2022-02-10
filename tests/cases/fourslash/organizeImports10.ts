/// <reference path="fourslash.ts" />

////import type { ZodType } from 'zod';
////
/////** Intended to be used in combination with {@link ZodType} */
////export function fun() { /* ... */ }

verify.organizeImports(`import type { ZodType } from 'zod';

/** Intended to be used in combination with {@link ZodType} */
export function fun() { /* ... */ }`
);
