// @module: node12,nodenext
// @declaration: true
// @outDir: out
// @filename: index.ts
// esm format file
import * as mod from "inner";
mod.correctVersionApplied;

// @filename: index.mts
// esm format file
import * as mod from "inner";
mod.correctVersionApplied;

// @filename: index.cts
// cjs format file
import * as mod from "inner";
mod.correctVersionApplied;

// @filename: node_modules/inner/index.d.ts
// cjs format file
export const noConditionsApplied = true;
// @filename: node_modules/inner/index.d.mts
// esm format file
export const importConditionApplied = true;
// @filename: node_modules/inner/index.d.cts
// cjs format file
export const wrongConditionApplied = true;
// @filename: node_modules/inner/old-types.d.ts
export const noVersionApplied = true;
// @filename: node_modules/inner/new-types.d.ts
export const correctVersionApplied = true;
// @filename: node_modules/inner/future-types.d.ts
export const futureVersionApplied = true;
// @filename: package.json
{
    "name": "package",
    "private": true,
    "type": "module",
}
// @filename: node_modules/inner/package.json
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
        },
    }
}