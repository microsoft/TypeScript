//// [importDeclWithExportModifierAndExportAssignment.ts]
module x {
    interface c {
    }
}
export import a = x.c;
export = x;

//// [importDeclWithExportModifierAndExportAssignment.js]
"use strict";
