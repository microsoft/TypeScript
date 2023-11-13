//// [tests/cases/conformance/node/legacyNodeModulesExportsSpecifierGenerationConditions.ts] ////

//// [index.ts]
export const a = async () => (await import("inner")).x();
//// [node_modules/inner/index.d.ts]
export { x } from "./other.js";
//// [node_modules/inner/other.d.ts]
import { Thing } from "./private.js"
export const x: () => Thing;
//// [node_modules/inner/private.d.ts]
export interface Thing {} // not exported in export map, inaccessible under new module modes
//// [package.json]
{
    "name": "package",
    "private": true,
    "type": "module",
    "exports": "./index.js"
}
//// [node_modules/inner/package.json]
{
    "name": "inner",
    "private": true,
    "type": "module",
    "exports": {
        ".": {
            "default": "./index.js"
        },
        "./other": {
            "default": "./other.js"
        }
    }
}

/// [Declarations] ////



//// [index.d.ts]
export declare const a: () => Promise<import("inner/private").Thing>;
//# sourceMappingURL=index.d.ts.map