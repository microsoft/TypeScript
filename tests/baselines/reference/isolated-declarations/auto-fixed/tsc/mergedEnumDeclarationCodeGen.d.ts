//// [tests/cases/compiler/mergedEnumDeclarationCodeGen.ts] ////

//// [mergedEnumDeclarationCodeGen.ts]
enum E {
    a,
    b = a
}
enum E {
    c = a
}

/// [Declarations] ////



//// [/.src/mergedEnumDeclarationCodeGen.d.ts]
declare enum E {
    a = 0,
    b = 0
}
declare enum E {
    c = 0
}
