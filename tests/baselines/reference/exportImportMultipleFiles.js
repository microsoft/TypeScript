//// [exportImportMultipleFiles_userCode.ts]
import lib = require('./exportImportMultipleFiles_library');
lib.math.add(3, 4); // Shouldnt be error


//// [exportImportMultipleFiles_math.js]
define(["require", "exports"], function(require, exports) {
    function add(a, b) {
        return a + b;
    }
    exports.add = add;
});
//// [exportImportMultipleFiles_library.js]
define(["require", "exports", "exportImportMultipleFiles_math"], function(require, exports, math) {
    exports.math = math;
    exports.math.add(3, 4); // OK
});
//// [exportImportMultipleFiles_userCode.js]
define(["require", "exports", './exportImportMultipleFiles_library'], function(require, exports, lib) {
    lib.math.add(3, 4); // Shouldnt be error
});
