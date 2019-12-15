//// [tests/cases/compiler/noImplicitExtensionNameNonRelative.ts] ////

//// [my_file.ts]
export default 0

//// [1.ts]
// Should both be okay.
// This check is not applied to non-relative import.
// e.g. Node's ESModule support https://nodejs.org/api/esm.html#esm_package_exports
import num from 'fs/my_file'
import num2 from 'fs/my_file.js'
num + num2


//// [my_file.js]
"use strict";
exports.__esModule = true;
exports["default"] = 0;
//// [1.js]
"use strict";
exports.__esModule = true;
// Should both be okay.
// This check is not applied to non-relative import.
// e.g. Node's ESModule support https://nodejs.org/api/esm.html#esm_package_exports
var my_file_1 = require("fs/my_file");
var my_file_js_1 = require("fs/my_file.js");
my_file_1["default"] + my_file_js_1["default"];
