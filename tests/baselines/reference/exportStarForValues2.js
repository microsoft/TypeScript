//// [tests/cases/compiler/exportStarForValues2.ts] ////

//// [file1.ts]
export interface Foo { x }

//// [file2.ts]
export * from "file1"
var x = 1;

//// [file3.ts]
export * from "file2"
var x = 1;

//// [file1.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
});
//// [file2.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var x = 1;
});
//// [file3.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var x = 1;
});
