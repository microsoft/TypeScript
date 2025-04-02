//// [tests/cases/compiler/exportSameNameFuncVar.ts] ////

//// [exportSameNameFuncVar.ts]
export var a = 10;
export function a() {
}

//// [exportSameNameFuncVar.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.a = void 0;
    exports.a = a;
    exports.a = 10;
    function a() {
    }
});
