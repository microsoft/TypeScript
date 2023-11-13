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
export declare const a: invalid;
//# sourceMappingURL=index.d.ts.map

/// [Errors] ////

index.ts(1,18): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.


==== index.ts (1 errors) ====
    export const a = async () => (await import("inner")).x();
                     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
==== node_modules/inner/index.d.ts (0 errors) ====
    export { x } from "./other.js";
==== node_modules/inner/other.d.ts (0 errors) ====
    import { Thing } from "./private.js"
    export const x: () => Thing;
==== node_modules/inner/private.d.ts (0 errors) ====
    export interface Thing {} // not exported in export map, inaccessible under new module modes
==== package.json (0 errors) ====
    {
        "name": "package",
        "private": true,
        "type": "module",
        "exports": "./index.js"
    }
==== node_modules/inner/package.json (0 errors) ====
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