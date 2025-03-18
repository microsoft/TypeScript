//// [tests/cases/conformance/node/nodeModulesPackagePatternExports.ts] ////

//// [index.ts]
// esm format file
import * as cjsi from "inner/cjs/index";
import * as mjsi from "inner/mjs/index";
import * as typei from "inner/js/index";
cjsi;
mjsi;
typei;
//// [index.mts]
// esm format file
import * as cjsi from "inner/cjs/index";
import * as mjsi from "inner/mjs/index";
import * as typei from "inner/js/index";
cjsi;
mjsi;
typei;
//// [index.cts]
// cjs format file
import * as cjsi from "inner/cjs/index";
import * as mjsi from "inner/mjs/index";
import * as typei from "inner/js/index";
cjsi;
mjsi;
typei;
//// [index.d.ts]
// cjs format file
import * as cjs from "inner/cjs/index";
import * as mjs from "inner/mjs/index";
import * as type from "inner/js/index";
export { cjs };
export { mjs };
export { type };
//// [index.d.mts]
// esm format file
import * as cjs from "inner/cjs/index";
import * as mjs from "inner/mjs/index";
import * as type from "inner/js/index";
export { cjs };
export { mjs };
export { type };
//// [index.d.cts]
// cjs format file
import * as cjs from "inner/cjs/index";
import * as mjs from "inner/mjs/index";
import * as type from "inner/js/index";
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
        "./cjs/*": "./*.cjs",
        "./mjs/*": "./*.mjs",
        "./js/*": "./*.js"
    }
}

//// [index.js]
import * as cjsi from "inner/cjs/index";
import * as mjsi from "inner/mjs/index";
import * as typei from "inner/js/index";
cjsi;
mjsi;
typei;
//// [index.mjs]
import * as cjsi from "inner/cjs/index";
import * as mjsi from "inner/mjs/index";
import * as typei from "inner/js/index";
cjsi;
mjsi;
typei;
//// [index.cjs]
import * as cjsi from "inner/cjs/index";
import * as mjsi from "inner/mjs/index";
import * as typei from "inner/js/index";
cjsi;
mjsi;
typei;
