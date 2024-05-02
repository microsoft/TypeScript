//// [tests/cases/compiler/exportImportMultipleFiles.ts] ////

//// [exportImportMultipleFiles_math.ts]
export function add(a, b) { return a + b; }

//// [exportImportMultipleFiles_library.ts]
export import math = require("exportImportMultipleFiles_math");
math.add(3, 4); // OK

//// [exportImportMultipleFiles_userCode.ts]
import lib = require('./exportImportMultipleFiles_library');
lib.math.add(3, 4); // Shouldnt be error


//// [exportImportMultipleFiles_math.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.add = add;
    function add(a, b) { return a + b; }
});
//// [exportImportMultipleFiles_library.js]
define(["require", "exports", "exportImportMultipleFiles_math"], function (require, exports, math) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.math = math;
    exports.math.add(3, 4); // OK
});
//// [exportImportMultipleFiles_userCode.js]
define(["require", "exports", "./exportImportMultipleFiles_library"], function (require, exports, lib) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    lib.math.add(3, 4); // Shouldnt be error
});
