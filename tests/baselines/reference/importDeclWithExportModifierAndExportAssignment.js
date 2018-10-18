//// [importDeclWithExportModifierAndExportAssignment.ts]
module x {
    interface c {
    }
}
export import a = x.c;
export = x;

//// [importDeclWithExportModifierAndExportAssignment.js]
"use strict";
exports.__esModule = true;
exports.a = x.c;
