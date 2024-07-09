//// [tests/cases/compiler/importDeclarationInModuleDeclaration1.ts] ////

//// [importDeclarationInModuleDeclaration1.ts]
module m2 {
    import m3 = require("use_glo_M1_public");
}

//// [importDeclarationInModuleDeclaration1.js]
