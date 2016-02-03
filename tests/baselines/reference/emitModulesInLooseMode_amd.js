//// [emitModulesInLooseMode_amd.ts]

export var x = 0;

//// [emitModulesInLooseMode_amd.js]
define(["require", "exports"], function (require, exports) {
    exports.x = 0;
});
