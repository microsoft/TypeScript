//// [tests/cases/conformance/node/allowJs/nodeModulesAllowJsImportHelpersCollisions3.ts] ////

//// [index.js]
// cjs format file
export {default} from "fs";
export {default as foo} from "fs";
export {bar as baz} from "fs";
//// [index.js]
// esm format file
export {default} from "fs";
export {default as foo} from "fs";
export {bar as baz} from "fs";
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
declare module "tslib" {
    export {};
    // intentionally missing all helpers
}

//// [index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.baz = exports.foo = exports.default = void 0;
const tslib_1 = require("tslib");
// cjs format file
const fs_1 = require("fs");
Object.defineProperty(exports, "default", { enumerable: true, get: function () { return tslib_1.__importDefault(fs_1).default; } });
const fs_2 = require("fs");
Object.defineProperty(exports, "foo", { enumerable: true, get: function () { return tslib_1.__importDefault(fs_2).default; } });
const fs_3 = require("fs");
Object.defineProperty(exports, "baz", { enumerable: true, get: function () { return fs_3.bar; } });
//// [index.js]
// esm format file
export { default } from "fs";
export { default as foo } from "fs";
export { bar as baz } from "fs";


//// [index.d.ts]
export { default } from "fs";
export { default as foo } from "fs";
export { bar as baz } from "fs";
//// [index.d.ts]
export { default } from "fs";
export { default as foo } from "fs";
export { bar as baz } from "fs";
