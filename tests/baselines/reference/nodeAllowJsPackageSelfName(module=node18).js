//// [tests/cases/conformance/node/allowJs/nodeAllowJsPackageSelfName.ts] ////

//// [index.js]
// esm format file
import * as self from "package";
self;
//// [index.mjs]
// esm format file
import * as self from "package";
self;
//// [index.cjs]
// esm format file
import * as self from "package";
self;
//// [package.json]
{
    "name": "package",
    "private": true,
    "type": "module",
    "exports": "./index.js"
}

//// [index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// esm format file
const self = require("package");
self;
//// [index.mjs]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// esm format file
const self = require("package");
self;
//// [index.cjs]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// esm format file
const self = require("package");
self;


//// [index.d.ts]
export {};
//// [index.d.mts]
export {};
//// [index.d.cts]
export {};
