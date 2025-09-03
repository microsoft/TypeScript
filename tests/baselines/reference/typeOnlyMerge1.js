//// [tests/cases/conformance/externalModules/typeOnlyMerge1.ts] ////

//// [a.ts]
interface A {}
export type { A };

//// [b.ts]
import { A } from "./a";
const A = 0;
export { A };

//// [c.ts]
import { A } from "./b";
A;


//// [a.js]
export {};
//// [b.js]
const A = 0;
export { A };
//// [c.js]
import { A } from "./b";
A;
