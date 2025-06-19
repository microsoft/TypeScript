//// [tests/cases/conformance/node/allowJs/nodeModulesAllowJsImportAssignment.ts] ////

//// [index.js]
// cjs format file
import fs = require("fs");
fs.readFile;
export import fs2 = require("fs");
//// [index.js]
// esm format file
import fs = require("fs");
fs.readFile;
export import fs2 = require("fs");
//// [file.js]
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
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// esm format file
const fs = require("fs");
fs.readFile;
exports.fs2 = require("fs");
//// [file.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// esm format file
const __require = null;
const _createRequire = null;
const fs = require("fs");
fs.readFile;
exports.fs2 = require("fs");


//// [index.d.ts]
export import fs2 = require("fs");
//// [index.d.ts]
export import fs2 = require("fs");
//// [file.d.ts]
export import fs2 = require("fs");
