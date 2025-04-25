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
Object.defineProperty(exports, "__esModule", { value: true });
