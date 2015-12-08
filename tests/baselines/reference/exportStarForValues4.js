//// [tests/cases/compiler/exportStarForValues4.ts] ////

//// [file1.ts]

export interface Foo { x }

//// [file2.ts]
export interface A { x }
export * from "file1"
export * from "file3"
var x = 1;

//// [file3.ts]
export interface B { x }
export * from "file2"
var x = 1;


//// [file1.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
});
//// [file3.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    var x = 1;
});
//// [file2.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    var x = 1;
});
