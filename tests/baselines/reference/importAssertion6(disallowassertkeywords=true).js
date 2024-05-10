//// [tests/cases/conformance/importAssertion/importAssertion6.ts] ////

//// [a.ts]
export const a = 1;
export const b = 2;

//// [b.ts]
import './a' assert { type: "json" }

//// [c.ts]
const b = import('./a', { assert: { type: "json" } });


//// [a.js]
export const a = 1;
export const b = 2;
//// [b.js]
import './a' assert { type: "json" };
//// [c.js]
const b = import('./a', { assert: { type: "json" } });
