//// [exportSameNameFuncVar.js]
define(["require", "exports"], function(require, exports) {
    exports.a = 10;
    function a() {
    }
    exports.a = a;
});
