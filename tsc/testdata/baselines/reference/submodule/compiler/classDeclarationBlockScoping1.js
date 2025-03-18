//// [tests/cases/compiler/classDeclarationBlockScoping1.ts] ////

//// [classDeclarationBlockScoping1.ts]
class C {
}

{
    class C {
    }
}

//// [classDeclarationBlockScoping1.js]
class C {
}
{
    class C {
    }
}
