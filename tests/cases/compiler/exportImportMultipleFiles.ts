//@module: amd
// @Filename: exportImportMultipleFiles_math.ts
export function add(a, b) { return a + b; }

// @Filename: exportImportMultipleFiles_library.ts
export import math = require("exportImportMultipleFiles_math");
math.add(3, 4); // OK

// @Filename: exportImportMultipleFiles_userCode.ts
import lib = require('./exportImportMultipleFiles_library');
lib.math.add(3, 4); // Shouldnt be error
