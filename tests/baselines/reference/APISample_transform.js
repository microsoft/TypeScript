//// [tests/cases/compiler/APISample_transform.ts] ////

//// [index.d.ts]
declare module "typescript" {
    export = ts;
}

//// [APISample_transform.ts]
/*
 * Note: This test is a public API sample. The sample sources can be found
 *       at: https://github.com/Microsoft/TypeScript/wiki/Using-the-Compiler-API#a-simple-transform-function
 *       Please log a "breaking change" issue for any API breaking change affecting this issue
 */

declare var console: any;

import * as ts from "typescript";

const source = "let x: string  = 'string'";

let result = ts.transpile(source, { module: ts.ModuleKind.CommonJS });

console.log(JSON.stringify(result));

//// [APISample_transform.js]
"use strict";
/*
 * Note: This test is a public API sample. The sample sources can be found
 *       at: https://github.com/Microsoft/TypeScript/wiki/Using-the-Compiler-API#a-simple-transform-function
 *       Please log a "breaking change" issue for any API breaking change affecting this issue
 */
exports.__esModule = true;
var ts = require("typescript");
var source = "let x: string  = 'string'";
var result = ts.transpile(source, { module: ts.ModuleKind.CommonJS });
console.log(JSON.stringify(result));
