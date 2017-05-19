//// [tests/cases/compiler/exportStarForValues8.ts] ////

//// [file1.ts]
export interface Foo { x }

//// [file2.ts]
export interface A { x }
export * from "file1"
export var x = 1;

//// [file3.ts]
export interface B { x }
export * from "file1"
export var x = 1;

//// [file4.ts]
export interface C { x }
export * from "file2"
export * from "file3"
export var x = 1;

//// [file5.ts]
export * from "file4"
export var x = 1;

//// [file1.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
});
//// [file2.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.x = 1;
});
//// [file3.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.x = 1;
});
//// [file4.js]
define(["require", "exports", "file2", "file3"], function (require, exports, file2_1, file3_1) {
    "use strict";
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    exports.__esModule = true;
    __export(file2_1);
    __export(file3_1);
    exports.x = 1;
});
//// [file5.js]
define(["require", "exports", "file4"], function (require, exports, file4_1) {
    "use strict";
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    exports.__esModule = true;
    __export(file4_1);
    exports.x = 1;
});
