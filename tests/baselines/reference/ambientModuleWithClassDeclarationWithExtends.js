//// [tests/cases/compiler/ambientModuleWithClassDeclarationWithExtends.ts] ////

//// [ambientModuleWithClassDeclarationWithExtends.ts]
declare module foo {
    class A { }
    class B extends A { }
}

//// [ambientModuleWithClassDeclarationWithExtends.js]
