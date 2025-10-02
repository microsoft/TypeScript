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
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// esm format file
const type = require("#type");
type;
//// [index.mjs]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// esm format file
const type = require("#type");
type;
//// [index.cjs]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// esm format file
const type = require("#type");
type;


//// [index.d.ts]
export {};
//// [index.d.mts]
export {};
//// [index.d.cts]
export {};
