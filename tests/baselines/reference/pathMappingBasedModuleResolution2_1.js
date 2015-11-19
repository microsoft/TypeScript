//// [tests/cases/compiler/pathMappingBasedModuleResolution2_1.ts] ////

//// [file1.ts]
import {x} from "folder2/file2"

declare function use(a: any): void;

use(x.toExponential());

//// [file2.ts]
export {x} from "./file3"

//// [file3.ts]
export var x = 1;

//// [file3.js]
exports.x = 1;
//// [file2.js]
var file3_1 = require("./file3");
exports.x = file3_1.x;
//// [file1.js]
var file2_1 = require("folder2/file2");
use(file2_1.x.toExponential());
