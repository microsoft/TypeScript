/// <reference path="fourslash.ts" />

// @Filename: /module.ts
////import type { ZodType } from './declaration';
////
/////** Intended to be used in combination with {@link ZodType} */
////export function fun() { /* ... */ }

// @Filename: /declaration.ts
//// type ZodType = {};
//// export type { ZodType }


verify.organizeImports(`import type { ZodType } from './declaration';

/** Intended to be used in combination with {@link ZodType} */
export function fun() { /* ... */ }`
);
