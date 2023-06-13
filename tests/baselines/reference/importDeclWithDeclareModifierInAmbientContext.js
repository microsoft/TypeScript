//// [tests/cases/compiler/importDeclWithDeclareModifierInAmbientContext.ts] ////

//// [importDeclWithDeclareModifierInAmbientContext.ts]
declare module "m" {
    module x {
        interface c {
        }
    }
    declare export import a = x.c;
    var b: a;
}


//// [importDeclWithDeclareModifierInAmbientContext.js]
