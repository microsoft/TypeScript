//// [tests/cases/conformance/externalModules/typeOnly/exportNamespace9.ts] ////

//// [a.ts]
export type A = number;

//// [b.ts]
export type * from "./a";

//// [c.ts]
import { A } from "./b";
const A = 1;
export { A };

//// [d.ts]
import { A } from "./c";
A; // Ok
type _ = A;

//// [e.ts]
export const A = 1;

//// [f.ts]
export * from "./e";
export type * from "./a"; // Collision error

//// [g.ts]
import { A } from "./f";
A;
type _ = A; // Follow-on from collision error


//// [a.js]
export {};
//// [b.js]
export {};
//// [c.js]
const A = 1;
export { A };
//// [d.js]
import { A } from "./c";
A; // Ok
//// [e.js]
export const A = 1;
//// [f.js]
export * from "./e";
//// [g.js]
import { A } from "./f";
A;
