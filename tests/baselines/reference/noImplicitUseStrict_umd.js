//// [noImplicitUseStrict_umd.ts]

export var x = 0;

//// [noImplicitUseStrict_umd.js]
(function (dependencies, factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(dependencies, factory);
    }
})(["require", "exports"], function (require, exports) {
    exports.x = 0;
});
