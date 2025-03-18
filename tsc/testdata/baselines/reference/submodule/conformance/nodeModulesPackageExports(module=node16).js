//// [tests/cases/conformance/node/nodeModulesPackageExports.ts] ////

//// [index.ts]
// esm format file
import * as cjs from "package/cjs";
import * as mjs from "package/mjs";
import * as type from "package";
cjs;
mjs;
type;
import * as cjsi from "inner/cjs";
import * as mjsi from "inner/mjs";
import * as typei from "inner";
cjsi;
mjsi;
typei;
//// [index.mts]
// esm format file
import * as cjs from "package/cjs";
import * as mjs from "package/mjs";
import * as type from "package";
cjs;
mjs;
type;
import * as cjsi from "inner/cjs";
import * as mjsi from "inner/mjs";
import * as typei from "inner";
cjsi;
mjsi;
typei;
//// [index.cts]
// cjs format file
import * as cjs from "package/cjs";
import * as mjs from "package/mjs";
import * as type from "package";
cjs;
mjs;
type;
import * as cjsi from "inner/cjs";
import * as mjsi from "inner/mjs";
import * as typei from "inner";
cjsi;
mjsi;
typei;
//// [index.d.ts]
// cjs format file
import * as cjs from "inner/cjs";
import * as mjs from "inner/mjs";
import * as type from "inner";
export { cjs };
export { mjs };
export { type };
//// [index.d.mts]
// esm format file
import * as cjs from "inner/cjs";
import * as mjs from "inner/mjs";
import * as type from "inner";
export { cjs };
export { mjs };
export { type };
//// [index.d.cts]
// cjs format file
import * as cjs from "inner/cjs";
import * as mjs from "inner/mjs";
import * as type from "inner";
export { cjs };
export { mjs };
export { type };
//// [package.json]
{
    "name": "package",
    "private": true,
    "type": "module",
    "exports": {
        "./cjs": "./index.cjs",
        "./mjs": "./index.mjs",
        ".": "./index.js"
    }
}
//// [package.json]
{
    "name": "inner",
    "private": true,
    "exports": {
        "./cjs": "./index.cjs",
        "./mjs": "./index.mjs",
        ".": "./index.js"
    }
}

//// [index.mjs]
import * as cjs from "package/cjs";
import * as mjs from "package/mjs";
import * as type from "package";
cjs;
mjs;
type;
import * as cjsi from "inner/cjs";
import * as mjsi from "inner/mjs";
import * as typei from "inner";
cjsi;
mjsi;
typei;
//// [index.cjs]
import * as cjs from "package/cjs";
import * as mjs from "package/mjs";
import * as type from "package";
cjs;
mjs;
type;
import * as cjsi from "inner/cjs";
import * as mjsi from "inner/mjs";
import * as typei from "inner";
cjsi;
mjsi;
typei;
//// [index.js]
import * as cjs from "package/cjs";
import * as mjs from "package/mjs";
import * as type from "package";
cjs;
mjs;
type;
import * as cjsi from "inner/cjs";
import * as mjsi from "inner/mjs";
import * as typei from "inner";
cjsi;
mjsi;
typei;
