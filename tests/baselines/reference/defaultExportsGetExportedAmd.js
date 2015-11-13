//// [defaultExportsGetExportedAmd.ts]
export default class Foo {}


//// [defaultExportsGetExportedAmd.js]
define(["require", "exports"], function (require, exports) {
    class Foo {
    }
    exports.default = Foo;
});
