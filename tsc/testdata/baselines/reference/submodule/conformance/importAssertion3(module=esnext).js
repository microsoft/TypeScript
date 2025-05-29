//// [tests/cases/conformance/importAssertion/importAssertion3.ts] ////

//// [0.ts]
export interface I { }

//// [1.ts]
export type {} from './0' assert { type: "json" }
export type { I } from './0' assert { type: "json" }

//// [2.ts]
import type { I } from './0'  assert { type: "json" }
import type * as foo from './0' assert { type: "json" }



//// [0.js]
export {};
//// [1.js]
export {};
//// [2.js]
export {};


//// [0.d.ts]
export interface I {
}
//// [1.d.ts]
export type {} from './0';
export type { I } from './0';
//// [2.d.ts]
export {};
