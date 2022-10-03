//// [tests/cases/conformance/importAssertion/importAssertion2.ts] ////

//// [0.ts]
export const a = 1;
export const b = 2;

//// [1.ts]
export {} from './0' assert { type: "json" }
export { a, b } from './0' assert { type: "json" }
export * from './0' assert { type: "json" }
export * as ns from './0' assert { type: "json" }

//// [2.ts]
export { a, b } from './0' assert {}
export { a as c, b as d } from './0' assert { a: "a", b: "b", c: "c" }


//// [0.js]
export const a = 1;
export const b = 2;
//// [1.js]
export { a, b } from './0' assert { type: "json" };
export * from './0' assert { type: "json" };
import * as ns_1 from './0' assert { type: "json" };
export { ns_1 as ns };
//// [2.js]
export { a, b } from './0' assert {};
export { a as c, b as d } from './0' assert { a: "a", b: "b", c: "c" };


//// [0.d.ts]
export declare const a = 1;
export declare const b = 2;
//// [1.d.ts]
export {} from './0';
export { a, b } from './0';
export * from './0';
export * as ns from './0';
//// [2.d.ts]
export { a, b } from './0';
export { a as c, b as d } from './0';
