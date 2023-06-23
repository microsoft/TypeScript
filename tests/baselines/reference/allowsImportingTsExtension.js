//// [tests/cases/conformance/externalModules/typeOnly/allowsImportingTsExtension.ts] ////

//// [a.ts]
export class A {}

//// [a.d.ts]
export class A {}

//// [b.ts]
import type { A } from "./a.ts"; // ok
import {} from "./a.ts"; // error
import { type A as _A } from "./a.ts"; // error
type __A = import("./a.ts").A; // ok
const aPromise = import("./a.ts"); // error

//// [c.ts]
import type { A } from "./a.d.ts"; // ok
import {} from "./a.d.ts"; // error
import { type A as _A } from "./a.d.ts"; // error
type __A = import("./a.d.ts").A; // ok
const aPromise = import("./a.d.ts"); // error


//// [a.js]
export class A {
}
//// [b.js]
const aPromise = import("./a.ts"); // error
export {};
//// [c.js]
const aPromise = import("./a.d.ts"); // error
export {};
