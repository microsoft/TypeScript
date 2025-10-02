//// [tests/cases/conformance/node/allowJs/nodeModulesAllowJsPackageImports.ts] ////

//// [index.js]
// esm format file
import * as cjs from "#cjs";
import * as mjs from "#mjs";
import * as type from "#type";
cjs;
mjs;
type;
//// [index.mjs]
// esm format file
import * as cjs from "#cjs";
import * as mjs from "#mjs";
import * as type from "#type";
cjs;
mjs;
type;
//// [index.cjs]
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

//// [index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// esm format file
const cjs = require("#cjs");
const mjs = require("#mjs");
const type = require("#type");
cjs;
mjs;
type;
//// [index.mjs]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// esm format file
const cjs = require("#cjs");
const mjs = require("#mjs");
const type = require("#type");
cjs;
mjs;
type;
//// [index.cjs]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// esm format file
const cjs = require("#cjs");
const mjs = require("#mjs");
const type = require("#type");
cjs;
mjs;
type;


//// [index.d.ts]
export {};
//// [index.d.mts]
export {};
//// [index.d.cts]
export {};
