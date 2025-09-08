//// [tests/cases/compiler/ambientModuleWithClassDeclarationWithExtends.ts] ////

//// [ambientModuleWithClassDeclarationWithExtends.ts]
declare namespace foo {
    class A { }
    class B extends A { }
}

//// [ambientModuleWithClassDeclarationWithExtends.js]
