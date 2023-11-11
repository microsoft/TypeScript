//// [tests/cases/conformance/parser/ecmascript5/EnumDeclarations/parserEnumDeclaration6.ts] ////

//// [parserEnumDeclaration6.ts]
enum E {
    A = 1,
    B,
    C = 1 << 1,
    D,
}

/// [Declarations] ////



//// [/.src/parserEnumDeclaration6.d.ts]
declare enum E {
    A = 1,
    B = 2,
    C = 2,
    D = 3
}
