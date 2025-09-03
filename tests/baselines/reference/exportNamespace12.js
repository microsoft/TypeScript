//// [tests/cases/conformance/externalModules/typeOnly/exportNamespace12.ts] ////

//// [main.ts]
import { c } from './types'
import * as types from './types'
console.log(c) // Fails as expected, import is still allowed though.
console.log(types.c) // Expected an error here.

//// [types.ts]
export type * from './values'

//// [values.ts]
export const c = 10

//// [values.js]
export const c = 10;
//// [types.js]
export {};
//// [main.js]
import * as types from './types';
console.log(c); // Fails as expected, import is still allowed though.
console.log(types.c); // Expected an error here.
