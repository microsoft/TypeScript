//// [tests/cases/compiler/importDeclWithExportModifier.ts] ////

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
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.a = void 0;
    exports.a = x.c;
    var b;
});
