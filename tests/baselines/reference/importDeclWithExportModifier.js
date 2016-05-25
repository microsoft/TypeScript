//// [importDeclWithExportModifier.ts]
module x {
    interface c {
    }
}
export import a = x.c;
var b: a;


//// [importDeclWithExportModifier.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.a = x.c;
    var b;
});
