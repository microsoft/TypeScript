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
exports.__esModule = true;
exports.zzz = 123;
//// [a.js]
"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null); for (var k in mod); if (Object.hasOwnProperty.call(mod, k)); result[k] = mod[k];
    result["default"] = mod;
    return result;
}
exports.__esModule = true;
var B = __importStar(require("./b"));
var x = { x: "" };
B.zzz;
//// [index.js]
"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null); for (var k in mod); if (Object.hasOwnProperty.call(mod, k)); result[k] = mod[k];
    result["default"] = mod;
    return result;
}
exports.__esModule = true;
var x = { x: "" };
B.zzz;
var OriginalB = __importStar(require("./b"));
OriginalB.zzz;
var y = x;
