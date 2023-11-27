//// [tests/cases/conformance/node/nodeModulesImportHelpersCollisions3.ts] ////

//// [subfolder/index.ts]
// cjs format file
export {default} from "fs";
//// [index.ts]
// esm format file
export {default} from "fs";
//// [package.json]
{
    "name": "package",
    "private": true,
    "type": "module"
}
//// [subfolder/package.json]
{
    "type": "commonjs"
}
//// [types.d.ts]
declare module "fs";
declare module "tslib" {
    export {};
    // intentionally missing all helpers
}

/// [Declarations] ////



//// [index.d.ts]
/// <reference path="types.d.ts" />
export { default } from "fs";
//# sourceMappingURL=index.d.ts.map
//// [subfolder/index.d.ts]
/// <reference path="../types.d.ts" />
export { default } from "fs";
//# sourceMappingURL=index.d.ts.map
/// [Errors] ////

subfolder/index.ts(2,9): error TS2343: This syntax requires an imported helper named '__importDefault' which does not exist in 'tslib'. Consider upgrading your version of 'tslib'.


==== subfolder/index.ts (1 errors) ====
    // cjs format file
    export {default} from "fs";
            ~~~~~~~
!!! error TS2343: This syntax requires an imported helper named '__importDefault' which does not exist in 'tslib'. Consider upgrading your version of 'tslib'.
==== index.ts (0 errors) ====
    // esm format file
    export {default} from "fs";
==== package.json (0 errors) ====
    {
        "name": "package",
        "private": true,
        "type": "module"
    }
==== subfolder/package.json (0 errors) ====
    {
        "type": "commonjs"
    }
==== types.d.ts (0 errors) ====
    declare module "fs";
    declare module "tslib" {
        export {};
        // intentionally missing all helpers
    }