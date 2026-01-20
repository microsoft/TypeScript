//// [tests/cases/conformance/externalModules/rewriteRelativeImportExtensions/cjsErrors.ts] ////

//// [index.ts]
export = {};

//// [index.ts]
import foo = require("./foo.ts"); // Error
import type _foo = require("./foo.ts"); // Ok


//// [index.js]
"use strict";
module.exports = {};
//// [index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const foo = require("./foo.js"); // Error
