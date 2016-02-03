//// [emitModulesInLooseMode_umd.ts]

export var x = 0;

//// [emitModulesInLooseMode_umd.js]
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    exports.x = 0;
});
