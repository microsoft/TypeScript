//// [tests/cases/compiler/allowImportClausesToMergeWithTypes.ts] ////

//// [b.ts]
export const zzz = 123;
export default zzz;

//// [a.ts]
export default interface zzz {
    x: string;
}

import zzz from "./b";

const x: zzz = { x: "" };
zzz;

export { zzz as default };

//// [index.ts]
import zzz from "./a";

const x: zzz = { x: "" };
zzz;

import originalZZZ from "./b";
originalZZZ;

const y: originalZZZ = x;

//// [b.js]
export const zzz = 123;
export default zzz;
//// [a.js]
import zzz from "./b";
const x = { x: "" };
zzz;
export { zzz as default };
//// [index.js]
import zzz from "./a";
const x = { x: "" };
zzz;
import originalZZZ from "./b";
originalZZZ;
const y = x;
