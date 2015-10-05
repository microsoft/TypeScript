//// [tests/cases/compiler/exportStarForValues7.ts] ////

//// [file1.ts]

export interface Foo { x }

//// [file2.ts]
export * from "file1"
export var x = 1;

//// [file3.ts]
export * from "file2"
export var x = 1;

//// [file1.js]
define(["require", "exports"], function (require, exports) {
});
//// [file2.js]
define(["require", "exports"], function (require, exports) {
    exports.x = 1;
});
//// [file3.js]
define(["require", "exports", "file2"], function (require, exports, file2_1) {
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    __export(file2_1);
    exports.x = 1;
});
