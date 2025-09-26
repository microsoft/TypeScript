//// [tests/cases/conformance/node/allowJs/nodeModulesAllowJsExportAssignment.ts] ////

//// [index.js]
// cjs format file
const a = {};
export = a;
//// [file.js]
// cjs format file
const a = {};
module.exports = a;
//// [index.js]
// esm format file
const a = {};
export = a;
//// [file.js]
// esm format file
import "fs";
const a = {};
module.exports = a;
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

//// [index.js]
"use strict";
// cjs format file
const a = {};
module.exports = a;
//// [file.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// cjs format file
const a = {};
export = a;
module.exports = a;
//// [index.js]
// esm format file
const a = {};
export {};
//// [file.js]
// esm format file
import "fs";
const a = {};
export = a;
module.exports = a;


//// [index.d.ts]
declare const a: {};
export = a;
//// [file.d.ts]
export = a;
//// [index.d.ts]
declare const a: {};
export = a;
//// [file.d.ts]
import "fs";
export = a;
