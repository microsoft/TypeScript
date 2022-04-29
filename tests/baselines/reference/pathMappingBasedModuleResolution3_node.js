//// [tests/cases/compiler/pathMappingBasedModuleResolution3_node.ts] ////

//// [file1.ts]
// baseUrl set via command line

import {x} from "folder2/file2"
declare function use(a: any): void;
use(x.toExponential());

//// [file2.ts]
import {x as a} from "./file3"  // found with baseurl
import {y as b} from "file4"    // found with fallback
export var x = a + b;

//// [file3.ts]
export var x = 1;

//// [index.d.ts]
export var y: number;

//// [file3.js]
"use strict";
exports.__esModule = true;
exports.x = void 0;
exports.x = 1;
//// [file2.js]
"use strict";
exports.__esModule = true;
exports.x = void 0;
var file3_1 = require("./file3"); // found with baseurl
var file4_1 = require("file4"); // found with fallback
exports.x = file3_1.x + file4_1.y;
//// [file1.js]
"use strict";
// baseUrl set via command line
exports.__esModule = true;
var file2_1 = require("folder2/file2");
use(file2_1.x.toExponential());
