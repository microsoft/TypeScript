//// [tests/cases/compiler/importDeclWithExportModifierAndExportAssignment.ts] ////

//// [importDeclWithExportModifierAndExportAssignment.ts]
module x {
    interface c {
    }
}
export import a = x.c;
export = x;

//// [importDeclWithExportModifierAndExportAssignment.js]
"use strict";
exports.a = void 0;
exports.a = x.c;
module.exports = x;
