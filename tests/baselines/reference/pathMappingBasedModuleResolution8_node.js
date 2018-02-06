//// [tests/cases/compiler/pathMappingBasedModuleResolution8_node.ts] ////

//// [index.ts]
import {x} from "@speedy/folder1/testing"
declare function use(a: any): void;
use(x.toExponential());

//// [index.ts]
export const x = 1 + 2;


//// [index.js]
"use strict";
exports.__esModule = true;
exports.x = 1 + 2;
//// [index.js]
"use strict";
exports.__esModule = true;
var testing_1 = require("@speedy/folder1/testing");
use(testing_1.x.toExponential());
