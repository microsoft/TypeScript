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
    exports.__esModule = true;
    exports.a = void 0;
    exports.a = x.c;
    var b;
});
