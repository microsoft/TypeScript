//// [tests/cases/conformance/node/allowJs/nodeModulesAllowJsPackageExports.ts] ////

//// [index.js]
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
//// [index.mjs]
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
//// [index.cjs]
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

//// [index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// esm format file
const cjs = require("package/cjs");
const mjs = require("package/mjs");
const type = require("package");
cjs;
mjs;
type;
const cjsi = require("inner/cjs");
const mjsi = require("inner/mjs");
const typei = require("inner");
cjsi;
mjsi;
typei;
//// [index.mjs]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// esm format file
const cjs = require("package/cjs");
const mjs = require("package/mjs");
const type = require("package");
cjs;
mjs;
type;
const cjsi = require("inner/cjs");
const mjsi = require("inner/mjs");
const typei = require("inner");
cjsi;
mjsi;
typei;
//// [index.cjs]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// cjs format file
const cjs = require("package/cjs");
const mjs = require("package/mjs");
const type = require("package");
cjs;
mjs;
type;
const cjsi = require("inner/cjs");
const mjsi = require("inner/mjs");
const typei = require("inner");
cjsi;
mjsi;
typei;


//// [index.d.ts]
export {};
//// [index.d.mts]
export {};
//// [index.d.cts]
export {};
