//// [tests/cases/conformance/node/nodeModulesPackagePatternExportsTrailers.ts] ////

//// [index.ts]
// esm format file
import * as cjsi from "inner/cjs/index.cjs";
import * as mjsi from "inner/mjs/index.mjs";
import * as typei from "inner/js/index.js";
cjsi;
mjsi;
typei;
//// [index.mts]
// esm format file
import * as cjsi from "inner/cjs/index.cjs";
import * as mjsi from "inner/mjs/index.mjs";
import * as typei from "inner/js/index.js";
cjsi;
mjsi;
typei;
//// [index.cts]
// cjs format file
import * as cjsi from "inner/cjs/index.cjs";
import * as mjsi from "inner/mjs/index.mjs";
import * as typei from "inner/js/index.js";
cjsi;
mjsi;
typei;
//// [index.d.ts]
// cjs format file
import * as cjs from "inner/cjs/index.cjs";
import * as mjs from "inner/mjs/index.mjs";
import * as type from "inner/js/index.js";
export { cjs };
export { mjs };
export { type };
//// [index.d.mts]
// esm format file
import * as cjs from "inner/cjs/index.cjs";
import * as mjs from "inner/mjs/index.mjs";
import * as type from "inner/js/index.js";
export { cjs };
export { mjs };
export { type };
//// [index.d.cts]
// cjs format file
import * as cjs from "inner/cjs/index.cjs";
import * as mjs from "inner/mjs/index.mjs";
import * as type from "inner/js/index.js";
export { cjs };
export { mjs };
export { type };
//// [package.json]
{
    "name": "package",
    "private": true,
    "type": "module",
}
//// [package.json]
{
    "name": "inner",
    "private": true,
    "exports": {
        "./cjs/*.cjs": "./*.cjs",
        "./mjs/*.mjs": "./*.mjs",
        "./js/*.js": "./*.js"
    }
}

//// [index.js]
import * as cjsi from "inner/cjs/index.cjs";
import * as mjsi from "inner/mjs/index.mjs";
import * as typei from "inner/js/index.js";
cjsi;
mjsi;
typei;
//// [index.mjs]
import * as cjsi from "inner/cjs/index.cjs";
import * as mjsi from "inner/mjs/index.mjs";
import * as typei from "inner/js/index.js";
cjsi;
mjsi;
typei;
//// [index.cjs]
import * as cjsi from "inner/cjs/index.cjs";
import * as mjsi from "inner/mjs/index.mjs";
import * as typei from "inner/js/index.js";
cjsi;
mjsi;
typei;
