//// [emitNonStrictModules_amd.ts]

export var x = 0;

//// [emitNonStrictModules_amd.js]
define(["require", "exports"], function (require, exports) {
    exports.x = 0;
});
