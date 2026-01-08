//// [tests/cases/compiler/importDeclWithExportModifierInAmbientContext.ts] ////

//// [importDeclWithExportModifierInAmbientContext.ts]
declare module "m" {
    namespace x {
        interface c {
        }
    }
    export import a = x.c;
    var b: a;
}


//// [importDeclWithExportModifierInAmbientContext.js]
