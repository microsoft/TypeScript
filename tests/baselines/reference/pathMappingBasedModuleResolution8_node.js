//// [tests/cases/compiler/pathMappingBasedModuleResolution8_node.ts] ////

//// [index.ts]
import {x} from "@speedy/folder1/testing"

//// [index.ts]
export const x = 1 + 2;


//// [index.js]
"use strict";
exports.__esModule = true;
exports.x = 1 + 2;
//// [index.js]
"use strict";
exports.__esModule = true;
