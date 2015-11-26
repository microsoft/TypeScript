//// [defaultExportsGetExportedAmd.ts]
export default class Foo {}


//// [defaultExportsGetExportedAmd.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    class Foo {
    }
    exports.default = Foo;
});
