//// [internalAliasUninitializedModuleInsideLocalModuleWithoutExportAccessError.js]
define(["require", "exports"], function(require, exports) {
    (function (c) {
        c.x;
        c.x.foo();
    })(exports.c || (exports.c = {}));
    var c = exports.c;

    exports.z;
});
