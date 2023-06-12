//// [tests/cases/compiler/exportEmptyObjectBindingPattern.ts] ////

//// [exportEmptyObjectBindingPattern.ts]
export const {} = {};

//// [exportEmptyObjectBindingPattern.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    var _a;
    Object.defineProperty(exports, "__esModule", { value: true });
    exports._b = _a = {};
});
