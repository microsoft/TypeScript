//// [tests/cases/conformance/node/nodeModulesTypesVersionPackageExports.ts] ////

//// [index.ts]
// esm format file
import * as mod from "inner";
mod.correctVersionApplied;

//// [index.mts]
// esm format file
import * as mod from "inner";
mod.correctVersionApplied;

//// [index.cts]
// cjs format file
import * as mod from "inner";
mod.correctVersionApplied;

//// [index.d.ts]
// cjs format file
export const noConditionsApplied = true;
//// [index.d.mts]
// esm format file
export const importConditionApplied = true;
//// [index.d.cts]
// cjs format file
export const wrongConditionApplied = true;
//// [old-types.d.ts]
export const noVersionApplied = true;
//// [new-types.d.ts]
export const correctVersionApplied = true;
//// [future-types.d.ts]
export const futureVersionApplied = true;
//// [package.json]
{
    "name": "package",
    "private": true,
    "type": "module"
}
//// [package.json]
{
    "name": "inner",
    "private": true,
    "exports": {
        ".": {
            "types@>=10000": "./future-types.d.ts",
            "types@>=1": "./new-types.d.ts",
            "types": "./old-types.d.ts",
            "import": "./index.mjs",
            "node": "./index.js"
        }
    }
}


//// [index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// esm format file
const mod = require("inner");
mod.correctVersionApplied;
//// [index.mjs]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// esm format file
const mod = require("inner");
mod.correctVersionApplied;
//// [index.cjs]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// cjs format file
const mod = require("inner");
mod.correctVersionApplied;


//// [index.d.ts]
export {};
//// [index.d.mts]
export {};
//// [index.d.cts]
export {};
