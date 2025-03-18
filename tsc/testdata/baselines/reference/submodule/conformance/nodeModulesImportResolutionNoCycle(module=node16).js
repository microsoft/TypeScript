//// [tests/cases/conformance/node/nodeModulesImportResolutionNoCycle.ts] ////

//// [index.ts]
// esm format file
import * as type from "#type";
type;
//// [index.mts]
// esm format file
import * as type from "#type";
type;
//// [index.cts]
// esm format file
import * as type from "#type";
type;
//// [package.json]
{
    "name": "package",
    "private": true,
    "type": "module",
    "exports": "package",
    "imports": {
        "#type": "package"
    }
}

//// [index.js]
import * as type from "#type";
type;
//// [index.mjs]
import * as type from "#type";
type;
//// [index.cjs]
import * as type from "#type";
type;
