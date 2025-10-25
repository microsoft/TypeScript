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
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zzz = void 0;
exports.zzz = 123;
//// [a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.B = void 0;
const B = require("./b");
exports.B = B;
const x = { x: "" };
B.zzz;
//// [index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const a_1 = require("./a");
const x = { x: "" };
a_1.B.zzz;
const OriginalB = require("./b");
OriginalB.zzz;
const y = x;
