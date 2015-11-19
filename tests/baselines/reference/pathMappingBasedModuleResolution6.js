//// [file1.ts]
export var x = 1;

//// [file1.js]
define(["require", "exports"], function (require, exports) {
    exports.x = 1;
});
