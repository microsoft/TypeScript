//// [tests/cases/compiler/noCrashOnImportShadowing.ts] ////

//// [b.ts]
export const zzz = 123;

//// [a.ts]
import * as B from "./b";

interface B {
    x: string;
}

const x: B = { x: "" };
B.zzz;

export { B };

//// [index.ts]
import { B } from "./a";

const x: B = { x: "" };
B.zzz;

import * as OriginalB from "./b";
OriginalB.zzz;

const y: OriginalB = x;

//// [b.js]
export const zzz = 123;
//// [a.js]
import * as B from "./b";
const x = { x: "" };
B.zzz;
export { B };
//// [index.js]
import { B } from "./a";
const x = { x: "" };
B.zzz;
import * as OriginalB from "./b";
OriginalB.zzz;
const y = x;
