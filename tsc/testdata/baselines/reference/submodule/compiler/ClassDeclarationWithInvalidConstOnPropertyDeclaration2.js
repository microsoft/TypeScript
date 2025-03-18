//// [tests/cases/compiler/ClassDeclarationWithInvalidConstOnPropertyDeclaration2.ts] ////

//// [ClassDeclarationWithInvalidConstOnPropertyDeclaration2.ts]
class C {
    const
    x = 10;
}

//// [ClassDeclarationWithInvalidConstOnPropertyDeclaration2.js]
class C {
    const;
    x = 10;
}
