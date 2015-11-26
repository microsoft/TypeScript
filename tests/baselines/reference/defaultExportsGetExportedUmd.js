//// [defaultExportsGetExportedUmd.ts]
export default class Foo {}


//// [defaultExportsGetExportedUmd.js]
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    class Foo {
    }
    exports.default = Foo;
});
