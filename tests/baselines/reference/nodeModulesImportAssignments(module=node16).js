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
var fs = require("fs");
fs.readFile;
exports.fs2 = require("fs");
//// [index.js]
import { createRequire as _createRequire } from "module";
var __require = _createRequire(import.meta.url);
// esm format file
var fs = __require("fs");
fs.readFile;
var fs2 = __require("fs");
export { fs2 };
//// [file.js]
import { createRequire as _createRequire_1 } from "module";
var __require_1 = _createRequire_1(import.meta.url);
// esm format file
var __require = null;
var _createRequire = null;
var fs = __require_1("fs");
fs.readFile;
var fs2 = __require_1("fs");
export { fs2 };


//// [index.d.ts]
/// <reference path="../types.d.ts" />
export import fs2 = require("fs");
//// [index.d.ts]
/// <reference path="types.d.ts" />
export import fs2 = require("fs");
//// [file.d.ts]
/// <reference path="types.d.ts" />
export import fs2 = require("fs");
