//// [tests/cases/compiler/es6ImportNamedImportNoNamedExports.ts] ////

//// [es6ImportNamedImportNoNamedExports_0.ts]
var a = 10;
export = a;

//// [es6ImportNamedImportNoNamedExports_1.ts]
import { a } from "./es6ImportNamedImportNoNamedExports_0";
import { a as x } from "./es6ImportNamedImportNoNamedExports_0";

//// [es6ImportNamedImportNoNamedExports_0.js]
"use strict";
var a = 10;
module.exports = a;
//// [es6ImportNamedImportNoNamedExports_1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
