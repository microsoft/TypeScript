//// [exportSameNameFuncVar.ts]
export var a = 10;
export function a() {
}

//// [exportSameNameFuncVar.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.a = void 0;
    exports.a = 10;
    function a() {
    }
    exports.a = a;
});
