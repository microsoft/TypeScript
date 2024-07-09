// @filename: b.ts
export const zzz = 123;
export default zzz;

// @filename: a.ts
export default interface zzz {
    x: string;
}

import zzz from "./b";

const x: zzz = { x: "" };
zzz;

export { zzz as default };

// @filename: index.ts
import zzz from "./a";

const x: zzz = { x: "" };
zzz;

import originalZZZ from "./b";
originalZZZ;

const y: originalZZZ = x;