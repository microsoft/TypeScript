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
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zzz = void 0;
exports.zzz = 123;
exports.default = exports.zzz;
//// [a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = void 0;
var b_1 = require("./b");
exports.default = b_1.default;
var x = { x: "" };
b_1.default;
//// [index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var a_1 = require("./a");
var x = { x: "" };
a_1.default;
var b_1 = require("./b");
b_1.default;
var y = x;
