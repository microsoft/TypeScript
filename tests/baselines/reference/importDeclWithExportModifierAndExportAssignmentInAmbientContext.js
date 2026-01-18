//// [tests/cases/compiler/importDeclWithExportModifierAndExportAssignmentInAmbientContext.ts] ////

//// [importDeclWithExportModifierAndExportAssignmentInAmbientContext.ts]
declare module "m" {
    namespace x {
        interface c {
        }
    }
    export import a = x.c;
    export = x;
}

//// [importDeclWithExportModifierAndExportAssignmentInAmbientContext.js]
