/// <reference path="fourslash.ts" />

////import type { TypeA, TypeB, UnreferencedType } from 'my-types';
////
/////** Intended to be used in combination with {@link TypeA} */
////export function function() { /* ... */ }
////
/////** Intended to be used in combination with {@link TypeB} */
////export function anotherFunction() { /* ... */ }

verify.organizeImports(`import type { TypeA, TypeB } from 'my-types';

/** Intended to be used in combination with {@link TypeA} */
export function function() { /* ... */ }

/** Intended to be used in combination with {@link TypeB} */
export function anotherFunction() { /* ... */ }`
);
