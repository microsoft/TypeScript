//// [tests/cases/compiler/importDeclWithExportModifierAndExportAssignment.ts] ////

//// [importDeclWithExportModifierAndExportAssignment.ts]
namespace x {
    interface c {
    }
}
export import a = x.c;
export = x;

//// [importDeclWithExportModifierAndExportAssignment.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.a = void 0;
exports.a = x.c;
