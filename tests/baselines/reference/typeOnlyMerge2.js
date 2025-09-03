//// [tests/cases/conformance/externalModules/typeOnlyMerge2.ts] ////

//// [a.ts]
const A = {}
export { A };

//// [b.ts]
import { A } from "./a";
type A = any;
export type { A };

//// [c.ts]
import { A } from "./b";
namespace A {}
export { A };

//// [d.ts]
import { A } from "./c";
A;


//// [a.js]
const A = {};
export { A };
//// [b.js]
export {};
//// [c.js]
export {};
//// [d.js]
A;
export {};
