//// [tests/cases/conformance/node/nodeModulesImportAssignments.ts] ////

//// [index.ts]
// cjs format file
import fs = require("fs");
fs.readFile;
export import fs2 = require("fs");
//// [index.ts]
// esm format file
import fs = require("fs");
fs.readFile;
export import fs2 = require("fs");
//// [file.ts]
// esm format file
const __require = null;
const _createRequire = null;
import fs = require("fs");
fs.readFile;
export import fs2 = require("fs");
//// [package.json]
{
    "name": "package",
    "private": true,
    "type": "module"
}
//// [package.json]
{
    "type": "commonjs"
}
//// [types.d.ts]
declare module "fs";

//// [index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// cjs format file
const fs = require("fs");
fs.readFile;
exports.fs2 = require("fs");
//// [index.js]
import { createRequire as _createRequire } from "module";
const __require = _createRequire(import.meta.url);
// esm format file
const fs = __require("fs");
fs.readFile;
const fs2 = __require("fs");
export { fs2 };
//// [file.js]
import { createRequire as _createRequire_1 } from "module";
const __require_1 = _createRequire_1(import.meta.url);
// esm format file
const __require = null;
const _createRequire = null;
const fs = __require_1("fs");
fs.readFile;
const fs2 = __require_1("fs");
export { fs2 };


//// [index.d.ts]
export import fs2 = require("fs");
//// [index.d.ts]
export import fs2 = require("fs");
//// [file.d.ts]
export import fs2 = require("fs");
