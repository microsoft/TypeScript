//// [tests/cases/conformance/node/allowJs/nodeModulesAllowJsPackagePatternExportsExclude.ts] ////

//// [index.js]
// esm format file
import * as cjsi from "inner/cjs/exclude/index";
import * as mjsi from "inner/mjs/exclude/index";
import * as typei from "inner/js/exclude/index";
cjsi;
mjsi;
typei;
//// [index.mjs]
// esm format file
import * as cjsi from "inner/cjs/exclude/index";
import * as mjsi from "inner/mjs/exclude/index";
import * as typei from "inner/js/exclude/index";
cjsi;
mjsi;
typei;
//// [index.cjs]
// cjs format file
import * as cjsi from "inner/cjs/exclude/index";
import * as mjsi from "inner/mjs/exclude/index";
import * as typei from "inner/js/exclude/index";
cjsi;
mjsi;
typei;
//// [index.d.ts]
// cjs format file
import * as cjs from "inner/cjs/exclude/index";
import * as mjs from "inner/mjs/exclude/index";
import * as type from "inner/js/exclude/index";
export { cjs };
export { mjs };
export { type };
//// [index.d.mts]
// esm format file
import * as cjs from "inner/cjs/exclude/index";
import * as mjs from "inner/mjs/exclude/index";
import * as type from "inner/js/exclude/index";
export { cjs };
export { mjs };
export { type };
//// [index.d.cts]
// cjs format file
import * as cjs from "inner/cjs/exclude/index";
import * as mjs from "inner/mjs/exclude/index";
import * as type from "inner/js/exclude/index";
export { cjs };
export { mjs };
export { type };
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
        "./cjs/*": "./*.cjs",
        "./cjs/exclude/*": null,
        "./mjs/*": "./*.mjs",
        "./mjs/exclude/*": null,
        "./js/*": "./*.js",
        "./js/exclude/*": null
    }
} 

//// [index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// esm format file
const cjsi = require("inner/cjs/exclude/index");
const mjsi = require("inner/mjs/exclude/index");
const typei = require("inner/js/exclude/index");
cjsi;
mjsi;
typei;
//// [index.mjs]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// esm format file
const cjsi = require("inner/cjs/exclude/index");
const mjsi = require("inner/mjs/exclude/index");
const typei = require("inner/js/exclude/index");
cjsi;
mjsi;
typei;
//// [index.cjs]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// cjs format file
const cjsi = require("inner/cjs/exclude/index");
const mjsi = require("inner/mjs/exclude/index");
const typei = require("inner/js/exclude/index");
cjsi;
mjsi;
typei;


//// [index.d.ts]
export {};
//// [index.d.mts]
export {};
//// [index.d.cts]
export {};
