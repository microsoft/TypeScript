//// [tests/cases/compiler/exportStarForValues.ts] ////

//// [file1.ts]

export interface Foo { x }

//// [file2.ts]
export * from "file1"
var x;

//// [file1.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
});
//// [file2.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    var x;
});
