//// [internalAliasInterfaceInsideLocalModuleWithoutExportAccessError.js]
define(["require", "exports"], function(require, exports) {
    (function (c) {
        c.x;
    })(exports.c || (exports.c = {}));
    var c = exports.c;

    var x;
});
