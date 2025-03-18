//// [tests/cases/conformance/node/nodeModulesPackageImports.ts] ////

//// [index.ts]
// esm format file
import * as cjs from "#cjs";
import * as mjs from "#mjs";
import * as type from "#type";
cjs;
mjs;
type;
//// [index.mts]
// esm format file
import * as cjs from "#cjs";
import * as mjs from "#mjs";
import * as type from "#type";
cjs;
mjs;
type;
//// [index.cts]
// esm format file
import * as cjs from "#cjs";
import * as mjs from "#mjs";
import * as type from "#type";
cjs;
mjs;
type;
//// [package.json]
{
    "name": "package",
    "private": true,
    "type": "module",
    "exports": "./index.js",
    "imports": {
        "#cjs": "./index.cjs",
        "#mjs": "./index.mjs",
        "#type": "./index.js"
    }
}

//// [index.mjs]
import * as cjs from "#cjs";
import * as mjs from "#mjs";
import * as type from "#type";
cjs;
mjs;
type;
//// [index.cjs]
import * as cjs from "#cjs";
import * as mjs from "#mjs";
import * as type from "#type";
cjs;
mjs;
type;
//// [index.js]
import * as cjs from "#cjs";
import * as mjs from "#mjs";
import * as type from "#type";
cjs;
mjs;
type;
