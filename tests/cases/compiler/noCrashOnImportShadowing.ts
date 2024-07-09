// @filename: b.ts
export const zzz = 123;

// @filename: a.ts
import * as B from "./b";

interface B {
    x: string;
}

const x: B = { x: "" };
B.zzz;

export { B };

// @filename: index.ts
import { B } from "./a";

const x: B = { x: "" };
B.zzz;

import * as OriginalB from "./b";
OriginalB.zzz;

const y: OriginalB = x;