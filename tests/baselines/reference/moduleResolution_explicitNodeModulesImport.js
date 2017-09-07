//// [tests/cases/compiler/moduleResolution_explicitNodeModulesImport.ts] ////

//// [index.js]
exports.x = 0;

//// [index.ts]
import { x } from "../node_modules/foo";


//// [index.js]
"use strict";
exports.__esModule = true;
