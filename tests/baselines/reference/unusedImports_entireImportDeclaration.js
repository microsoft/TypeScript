//// [tests/cases/compiler/unusedImports_entireImportDeclaration.ts] ////

//// [a.ts]
export const a = 0;
export const b = 0;
export default 0;

//// [b.ts]
import d1, { a as a1, b as b1 } from "./a";
import d2, * as ns from "./a";

import d3, { a as a2, b as b2 } from "./a";
d3;
import d4, * as ns2 from "./a";
d4;
import d5, * as ns3 from "./a";
ns3;


//// [a.js]
export const a = 0;
export const b = 0;
export default 0;
//// [b.js]
import d3 from "./a";
d3;
import d4 from "./a";
d4;
import * as ns3 from "./a";
ns3;
