//// [tests/cases/compiler/exportImportMultipleFiles.ts] ////

//// [exportImportMultipleFiles_math.ts]
export function add(a, b) { return a + b; }

//// [exportImportMultipleFiles_library.ts]
export import math = require("exportImportMultipleFiles_math");
math.add(3, 4); // OK

//// [exportImportMultipleFiles_userCode.ts]
import lib = require('./exportImportMultipleFiles_library');
lib.math.add(3, 4); // Shouldnt be error


//// [exportImportMultipleFiles_library.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.math = require("exportImportMultipleFiles_math");
exports.math.add(3, 4);
//// [exportImportMultipleFiles_userCode.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lib = require("./exportImportMultipleFiles_library");
lib.math.add(3, 4);
