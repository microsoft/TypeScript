//// [tests/cases/conformance/node/nodePackageSelfNameScoped.ts] ////

//// [index.ts]
// esm format file
import * as self from "@scope/package";
self;
//// [index.mts]
// esm format file
import * as self from "@scope/package";
self;
//// [index.cts]
// cjs format file
import * as self from "@scope/package";
self;
//// [package.json]
{
    "name": "@scope/package",
    "private": true,
    "type": "module",
    "exports": "./index.js"
}

//// [index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// esm format file
const self = require("@scope/package");
self;
//// [index.mjs]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// esm format file
const self = require("@scope/package");
self;
//// [index.cjs]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// cjs format file
const self = require("@scope/package");
self;


//// [index.d.ts]
export {};
//// [index.d.mts]
export {};
//// [index.d.cts]
export {};
