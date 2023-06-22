// @allowImportingTsExtensions: false
// @target: esnext
// @module: esnext

// @Filename: a.ts
export class A {}

// @Filename: b.ts
import type { A } from "./a.ts"; // ok
import {} from "./a.ts"; // error
import { type A as _A } from "./a.ts"; // error
type __A = import("./a.ts").A; // ok
const aPromise = import("./a.ts"); // error
