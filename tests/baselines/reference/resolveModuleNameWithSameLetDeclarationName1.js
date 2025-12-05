//// [tests/cases/compiler/resolveModuleNameWithSameLetDeclarationName1.ts] ////

//// [resolveModuleNameWithSameLetDeclarationName1.ts]
declare namespace foo {

    interface Bar {

    }
}

let foo: foo.Bar; 

//// [resolveModuleNameWithSameLetDeclarationName1.js]
var foo;
