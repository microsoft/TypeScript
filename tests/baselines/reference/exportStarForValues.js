//// [tests/cases/compiler/exportStarForValues.ts] ////

//// [file1.ts]
export interface Foo { x }

//// [file2.ts]
export * from "file1"
var x;

//// [file1.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
});
//// [file2.js]
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
define(["require", "exports", "file1"], function (require, exports, file1_1) {
    "use strict";
    exports.__esModule = true;
    __exportStar(file1_1, exports);
    var x;
});
