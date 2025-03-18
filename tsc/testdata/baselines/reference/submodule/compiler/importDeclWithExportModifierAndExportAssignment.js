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
module.exports = x;
