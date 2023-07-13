//// [tests/cases/compiler/importDeclWithExportModifierAndExportAssignmentInAmbientContext.ts] ////

//// [importDeclWithExportModifierAndExportAssignmentInAmbientContext.ts]
declare module "m" {
    module x {
        interface c {
        }
    }
    export import a = x.c;
    export = x;
}

//// [importDeclWithExportModifierAndExportAssignmentInAmbientContext.js]
