//// [tests/cases/compiler/isolatedDeclarations.ts] ////

//// [file1.ts]
export var x;
//// [file2.ts]
var y;

//// [all.js]
define("file1", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.x = void 0;
});
var y;
