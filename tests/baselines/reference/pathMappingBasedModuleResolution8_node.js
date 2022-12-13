//// [tests/cases/compiler/pathMappingBasedModuleResolution8_node.ts] ////

//// [index.ts]
import {x} from "@speedy/folder1/testing"

//// [index.ts]
export const x = 1 + 2;


//// [index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = 1 + 2;
//// [index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
